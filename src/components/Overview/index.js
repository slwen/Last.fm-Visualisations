"use strict";

require("./style.scss");

var React             = require('react');
var TracksPlayedGraph = require('../TracksPlayedGraph');
var TotalTracks       = require('../TotalTracks');
var TotalAlbums       = require('../TotalAlbums');
var AverageTracks     = require('../AverageTracks');
var TotalTime         = require('../TotalTime');

module.exports = React.createClass({
  displayName: 'Overview',

  render: function() {
    return (
      <div className="Overview">
        <div className="Overview__head">
          <div className="Overview__title">Tracks Played</div>
          <div className="Overview__subtitle">Last 30 Days</div>
        </div>
        <TracksPlayedGraph />
        <TotalTracks />
        <TotalAlbums />
        <TotalTime />
        <AverageTracks />
      </div>
    );
  }
});
