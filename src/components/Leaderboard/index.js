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
      items: []
    };
  },

  componentWillMount: function() {
    this.loadItems();
  },

  loadItems: function() {
    var params = {
      type: this.props.type,
      period: this.props.period
    };

    // TODO: Check `type` prop and make the correct API call

    // user.getTopAlbums(1, this.setItems);
    // user.getTopTracks(1, this.setItems);
    user.getTopArtists(params, this.setItems);
  },

  setItems: function(data) {
    this.setState({
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
          artist={ 'foo' }
          playCount={ 2 }
          imgUrl={ 'bar' }
          track={ 'baz' }
          album={ 'banana' }
          key={ i } />
      );
    });
  },

  render: function() {
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
