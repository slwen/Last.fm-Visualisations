"use strict";

var React   = require('react');
var TabBar  = require('../../components/TabBar');
var NavBar  = require('../../components/NavBar');
var Profile = require('../../components/Profile');

module.exports = React.createClass({
  displayName: 'Leaderboard',

  render: function() {
    return (
      <div className="Application">
        <NavBar />
        <div className="Application__main">
          <Profile />
        </div>
        <TabBar />
      </div>
    );
  }
});
