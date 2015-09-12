"use strict";

var React       = require('react');
var TabBar      = require('../../components/TabBar');
var NavBar      = require('../../components/NavBar');
var Leaderboard = require('../../components/Leaderboard');

module.exports = React.createClass({
  displayName: 'LeaderboardPage',

  render: function() {
    return (
      <div className="Application">
        <NavBar />
        <div className="Application__main">
          <Leaderboard />
        </div>
        <TabBar />
      </div>
    );
  }
});
