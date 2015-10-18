"use strict";

require("./style.scss");

import React from 'react';
import Reflux from 'reflux';
import TopTracksStore from '../../stores/top-tracks';
import TopAlbumsStore from '../../stores/top-albums';
import TopArtistsStore from '../../stores/top-artists';
import Actions from '../../actions';
import LeaderboardItem from '../LeaderboardItem';
import user from '../../api/user';
import isEqual from 'lodash/lang/isEqual';
import map from 'lodash/collection/map';
import has from 'lodash/object/has';
import { TransitionMotion, spring } from 'react-motion';

export default React.createClass({
  displayName: 'Leaderboard',

  propTypes: {
    type: React.PropTypes.oneOf(['tracks', 'albums', 'artists']),
    period: React.PropTypes.oneOf(['7day', '1month', 'overall'])
  },

  mixins: [
    Reflux.listenTo(TopTracksStore, 'onChange'),
    Reflux.listenTo(TopAlbumsStore, 'onChange'),
    Reflux.listenTo(TopArtistsStore, 'onChange')
  ],

  getDefaultProps() {
    return {
      type: 'tracks',
      period: '1month'
    };
  },

  getInitialState() {
    return {
      loading: false,
      error: false,
      items: []
    };
  },

  componentWillMount() {
    this.loadItems(this.props);
  },

  componentWillUpdate(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      this.loadItems(nextProps);
    }
  },

  loadItems(props) {
    const type = props.type;
    const params = {
      limit: 10,
      period: props.period
    };

    this.setState({ loading: true });

    if (type === 'artists') {
      Actions.getTopArtists(params);
    } else if (type === 'albums') {
      Actions.getTopAlbums(params);
    } else if (type === 'tracks') {
      Actions.getTopTracks(params);
    }
  },

  onChange(event, data) {
    this.setState({
      loading: false,
      items: data
    });
  },

  renderEmptyState() {
    return (
      <div>
        Emptiness!
      </div>
    );
  },

  getDefaultValue() {
    let configs = {};

    Object.keys(this.state.items).forEach(key => {
      configs[key] = {
        opacity: 0,
        y: 150,
        scale: 0.95,
        item: this.state.items[key]
      };
    });

    return configs;
  },

  getEndValue(prevStyles) {
    let configs = {};

    Object.keys(this.state.items).forEach(key => {
      configs[key] = {
        opacity: spring(1),
        y: spring(0, [200, 20]),
        scale: spring(1, [200, 20]),
        item: this.state.items[key]
      };
    });

    return configs;
  },

  willEnter(key) {
    return {
      opacity: spring(0),
      y: spring(100),
      scale: spring(0),
      item: this.state.items[key]
    };
  },

  willLeave(key, style) {
    return {
      opacity: spring(0),
      y: spring(100),
      scale: spring(0),
      item: style.item
    };
  },

  renderItems(interpolatedStyles, key) {
    const { item, y, scale, opacity } = interpolatedStyles[key];
    const style = {
      opacity,
      transform: `translateY(${y}px) scale(${scale})`
    };

    return (
      <LeaderboardItem
        style={ style }
        title={ item.name }
        subtitle={ has(item, 'artist') ? item.artist.name : '' }
        playCount={ item.playcount }
        imgUrl={ item.image[2]['#text'] }
        key={ item.name } />
    );
  },

  render() {
    if (this.state.loading) {
      return (
        <div className="Leaderboard Leaderboard--loading">
          Loading...
        </div>
      );
    }

    if (this.state.items) {
      return (
        <div className="Leaderboard">
          <TransitionMotion
            defaultStyles={ this.getDefaultValue() }
            styles={ this.getEndValue }
            willEnter={ this.willEnter }
            willLeave={ this.willLeave }>
            { interpolatedStyles => {
              return (
                <div>
                  { Object.keys(interpolatedStyles).map(key => {
                    return this.renderItems(interpolatedStyles, key)
                  }) }
                </div>
              );
            } }
          </TransitionMotion>
        </div>
      );
    }

    return (
      <div className="Leaderboard Leaderboard--empty">
        { this.renderEmptyState() }
      </div>
    );
  }
});
