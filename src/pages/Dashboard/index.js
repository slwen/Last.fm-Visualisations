"use strict";

var React       = require('react');
var TotalTracks = require('../../components/TotalTracks');

module.exports = React.createClass({
  displayName: 'DashboardPage',

  render: function() {
    return <TotalTracks />;
  }
});
