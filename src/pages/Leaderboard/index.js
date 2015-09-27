"use strict";

var React       = require('react');
var Leaderboard = require('../../components/Leaderboard');

module.exports = React.createClass({
  displayName: 'LeaderboardPage',

  render: function() {
    return <Leaderboard />;
  }
});
