"use strict";

require("./style.scss");

var React           = require('react');
var map             = require('lodash/collection/map');
var user            = require('../../api/user');
var LeaderboardItem = require('../LeaderboardItem');

module.exports = React.createClass({
  displayName: 'Leaderboard',
  propTypes: {
    type: React.PropTypes.oneOf(['tracks', 'albums', 'artists']),
    period: React.PropTypes.oneOf(['7-days', '30-days', 'all-time'])
  },

  getDefaultProps: function() {
    return {
      type: 'tracks',
      period: '30-days'
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
    this.loadItems();
  },

  loadItems: function() {
    var type = this.props.type;
    var params = {
      limit: 10,
      period: this.props.period
    };

    this.setState({ loading: true });

    if (type === 'artists') {
      user.getTopArtists(params, this.setItems);
    }

    if (type === 'albums') {
      user.getTopAlbums(params, this.setItems);
    }

    if (type === 'tracks') {
      user.getTopTracks(params, this.setItems);
    }
  },

  setItems: function(data) {
    if (!data) {
      this.setState({
        error: true,
        loading: false
      });
    } else {
      var type = this.props.type;

      if (type === 'artists') data = data.topartists.artist;
      if (type === 'albums') data = data.topalbums.album;
      if (type === 'tracks') data = data.toptracks.track;

      this.setState({
        loading: false,
        items: data
      });
    }
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
