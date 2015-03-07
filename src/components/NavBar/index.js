"use strict";

require("./style.scss");

var React = require('react');

module.exports = React.createClass({
  displayName: 'NavBar',

  render: function() {
    return (
      <div className="NavBar">
        <div className="NavBar__menu-btn"></div>
        <div className="NavBar__title">Dashboard</div>
        <div className="NavBar__settings-btn"></div>
      </div>
    );
  }
});
