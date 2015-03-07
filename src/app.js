"use strict";

require("./app.scss");

var React    = require('react');
var NavBar   = require('./components/NavBar');
var Overview = require('./components/Overview');

var AppWrapper = React.createClass({
  render: function() {
    return (
      <div className="Application">
        <div className="Application__main">
          <NavBar />
          <Overview />
        </div>
      </div>
    );
  }
});

React.render(<AppWrapper />, document.getElementById('app-hook'));
