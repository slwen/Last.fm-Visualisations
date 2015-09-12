"use strict";

var React       = require('react');
var TabBar      = require('../../components/TabBar');
var NavBar      = require('../../components/NavBar');
var TotalTracks = require('../../components/TotalTracks');

module.exports = React.createClass({
  displayName: 'DashboardPage',

  render: function() {
    return (
      <div className="Application">
        <NavBar />
        <div className="Application__main">
          <TotalTracks />
        </div>
        <TabBar />
      </div>
    );
  }
});
