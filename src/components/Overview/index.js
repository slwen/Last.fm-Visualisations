"use strict";

require("./style.scss");

var React = require('react');
var TotalTracks   = require('../TotalTracks');
var TotalAlbums   = require('../TotalAlbums');
var AverageTracks = require('../AverageTracks');
var TotalTime     = require('../TotalTime');

module.exports = React.createClass({
  displayName: 'Overview',

  render: function() {
    return (
      <div className="Overview">
        <div className="Overview__head">
          <div className="Overview__title">Overview</div>
          <div className="Overview__subtitle">You Joined 5th May, 2011</div>
        </div>
        <TotalTracks />
        <TotalAlbums />
        <TotalTime />
        <AverageTracks />
      </div>
    );
  }
});
