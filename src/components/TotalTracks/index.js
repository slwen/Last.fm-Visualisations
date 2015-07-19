"use strict";

require("./style.scss");

var React   = require('react');
var numeral = require('numeral');
var user    = require('../../api/user');
var icon    = require("./icon.svg");

module.exports = React.createClass({
  displayName: 'TotalTracks',

  getInitialState: function() {
    return {
      loading: true,
      playCount: 0
    };
  },

  componentWillMount: function() {
    this.loadPlayCount();
  },

  loadPlayCount: function() {
    user.getInfo(this.setPlayCount);
  },

  setPlayCount: function(data) {
    if (!data) {
      this.setState({ error: true });
      this.loadPlayCount();
    } else {
      this.setState({
        loading: false,
        error: false,
        playCount: data.user.playcount
      });
    }
  },

  renderLoadingState: function() {
    return (
      <div className="TotalTime__content">
        <div className="TotalTracks__spinner spinner"></div>
      </div>
    );
  },

  render: function() {
    var playCount = numeral(this.state.playCount).format("0,0");

    if (this.state.error) {
      return (
        <div className="TotalTracks TotalTracks--loading TotalTracks--error">
          <div className="TotalTracks__error-msg">Error...</div>
        </div>
      );
    }

    if (this.state.loading) {
      return (
        <div className="TotalTracks TotalTracks--loading">
          { this.renderLoadingState() }
        </div>
      );
    }

    return (
      <div className="TotalTracks">
        <div className="TotalTracks__content">
          <div className="TotalTracks__icon">
            <img src={ icon } />
          </div>
          <div className="TotalTracks__playcount">
            { playCount }
          </div>
          <div className="TotalTracks__label">
            Tracks Played
          </div>
        </div>
      </div>
    );
  }
});
