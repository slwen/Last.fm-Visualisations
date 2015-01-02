"use strict";

require("./style.scss");

var React   = require('react');
var numeral = require('numeral');
var iconSrc = require('./icon.png');
var user    = require('../../api/user');

module.exports = React.createClass({
  displayName: 'TotalTracks',

  getInitialState: function() {
    return {
      loading: true,
      playCount: 0
    }
  },

  componentWillMount: function() {
    this.setState({ loading: true });
    user.getInfo(this.setPlayCount);
  },

  setPlayCount: function(data) {
    this.setState({
      loading: false,
      playCount: data.user.playcount
    });
  },

  render: function() {
    var playCount = numeral(this.state.playCount).format("0,0");

    if (this.state.loading) {
      return (
        <div className="TotalTracks TotalTracks--loading">
          <div className="TotalTracks__spinner spinner"></div>
        </div>
      );
    }

    return (
      <div className="TotalTracks">
        <img src={ iconSrc } className="TotalTracks__icon" height="32" width="32" />
        <div className="TotalTracks__content">
          <div className="TotalTracks__playcount">
            { playCount }
          </div>
          <div className="TotalTracks__label">
            Total Tracks
          </div>
        </div>
      </div>
    );
  }
});
