"use strict";

require("./app.scss");

var React       = require('react');
var TotalTracks = require('./components/TotalTracks');
var TotalAlbums = require('./components/TotalAlbums');

var AppWrapper = React.createClass({
  render: function() {
    return (
      <div className="Application">
        <div className="Application__aside">
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

React.renderComponent(<AppWrapper />, document.getElementById('app-hook'));
