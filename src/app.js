"use strict";

require("./app.scss");

var React       = require('react');
var Profile     = require('./components/Profile');
var TotalTracks = require('./components/TotalTracks');
var TotalAlbums = require('./components/TotalAlbums');

var AppWrapper = React.createClass({
  render: function() {
    return (
      <div className="Application">
        <div className="Application__aside">
          <Profile />
          <TotalTracks />
          <TotalAlbums />
        </div>
        <div className="Application__main">
          Hey bro, main content goes here
        </div>
      </div>
    );
  }
});

React.render(<AppWrapper />, document.getElementById('app-hook'));
