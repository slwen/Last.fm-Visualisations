"use strict";

require("./style.scss");
var iconSrc = require('./icon.png');
var React = require('react');

module.exports = React.createClass({
  displayName: 'TotalTracks',

  render: function() {
    return (
      <div className="TotalTracks">
        <img src={ iconSrc } className="TotalTracks__icon" height="32" width="32" />
        <div className="TotalTracks__content">
          <div className="TotalTracks__value">
            381,092
          </div>
          <div className="TotalTracks__label">
            Total Tracks
          </div>
        </div>
      </div>
    );
  }
});
