"use strict";

require("./app.scss");

var React       = require('react');
var TabBar      = require('./components/TabBar');
var NavBar      = require('./components/NavBar');
var TotalTracks = require('./components/TotalTracks');

var App = React.createClass({
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

React.render(<App />, document.getElementById('app-hook'));
