'use strict';

require('./style.scss');

import React from 'react';
import Leaderboard from '../../components/Leaderboard';

module.exports = React.createClass({
  displayName: 'LeaderboardPage',

  getInitialState() {
    return {
      type: 'tracks',
      period: '1month'
    };
  },

  handleTypeChange(e) {
    this.setState({ type: e.target.value });
  },

  handlePeriodChange(e) {
    this.setState({ period: e.target.value });
  },

  render() {
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
