"use strict";

require("./style.scss");

var React       = require('react');
var Leaderboard = require('../../components/Leaderboard');

module.exports = React.createClass({
  displayName: 'LeaderboardPage',

  getInitialState: function() {
    return {
      type: 'tracks',
      period: '1month'
    };
  },

  handleTypeChange: function(e) {
    this.setState({ type: e.target.value });
  },

  handlePeriodChange: function(e) {
    this.setState({ period: e.target.value });
  },

  render: function() {
    return (
      <div className="LeaderboardPage">
        <div className="LeaderboardPage__controls">
          <div className="LeaderboardPage__select">
            <select onChange={ this.handleTypeChange }>
              <option value="tracks">Top Tracks</option>
              <option value="albums">Top Albums</option>
              <option value="artists">Top Artists</option>
            </select>
          </div>

          <div className="LeaderboardPage__select">
            <select onChange={ this.handlePeriodChange }>
              <option value="7day">Last 7 Days</option>
              <option value="1month">Last Month</option>
              <option value="overall">All Time</option>
            </select>
          </div>
        </div>
        <Leaderboard type={ this.state.type } period={ this.state.period } />
      </div>
    );
  }
});
