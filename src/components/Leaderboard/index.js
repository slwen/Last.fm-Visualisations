"use strict";

require("./style.scss");

var React           = require('react');
var Reflux          = require('reflux');
var TopTracksStore  = require('../../stores/top-tracks');
var TopAlbumsStore  = require('../../stores/top-albums');
var TopArtistsStore = require('../../stores/top-artists');
var Actions         = require('../../actions');
var LeaderboardItem = require('../LeaderboardItem');
var user            = require('../../api/user');
var map             = require('lodash/collection/map');
var isEqual         = require('lodash/lang/isEqual');

module.exports = React.createClass({
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

  getDefaultProps: function() {
    return {
      type: 'tracks',
      period: '1month'
    };
  },

  getInitialState: function() {
    return {
      loading: false,
      error: false,
      items: []
    };
  },

  componentWillMount: function() {
    this.loadItems(this.props);
  },

  componentWillUpdate: function(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      this.loadItems(nextProps);
    }
  },

  loadItems: function(props) {
    var type = props.type;
    var params = {
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

  onChange: function(event, data) {
    this.setState({
      loading: false,
      items: data
    });
  },

  renderEmptyState: function() {
    return (
      <div>
        Emptiness!
      </div>
    );
  },

  renderItems: function() {
    return map(this.state.items, function(item, i) {
      return (
        <LeaderboardItem
          title={ item.name }
          subtitle={ 'blah' }
          playCount={ item.playcount }
          imgUrl={ item.image[1]['#text'] }
          key={ i } />
      );
    });
  },

  render: function() {
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
          { this.renderItems() }
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
