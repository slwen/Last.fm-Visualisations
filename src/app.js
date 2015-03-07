"use strict";

require("./app.scss");

var React         = require('react');
var NavBar        = require('./components/NavBar');
var Profile       = require('./components/Profile');
var TotalTracks   = require('./components/TotalTracks');
var TotalAlbums   = require('./components/TotalAlbums');
var AverageTracks = require('./components/AverageTracks');
var TotalTime     = require('./components/TotalTime');

var AppWrapper = React.createClass({
  render: function() {
    return (
      <div className="Application">
        <div className="Application__main">
          <NavBar />
          <Profile />
          <TotalTracks />
          <TotalAlbums />
          <AverageTracks />
          <TotalTime />
        </div>
      </div>
    );
  }
});

React.render(<AppWrapper />, document.getElementById('app-hook'));
