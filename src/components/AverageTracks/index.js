"use strict";

require("./style.scss");

var React   = require('react');
var numeral = require('numeral');
var moment  = require('moment'); // TODO: Consider react-intl
var user    = require('../../api/user');

module.exports = React.createClass({
  displayName: 'AverageTracks',

  getInitialState: function() {
    return {
      loading: true,
      average: 0
    }
  },

  componentWillMount: function() {
    this.loadUserData();
  },

  loadUserData: function() {
    user.getInfo(this.setUserData);
  },

  setUserData: function(data) {
    if (!data) {
      this.setState({
        error: true,
        loading: false
      });
    } else {
      this.setState({
        loading: false,
        error: false,
        average: this.calculateAverage(data.user)
      });
    }
  },

  calculateAverage: function(user) {
    var today = moment();
    var joined = moment(user.registered["#text"], 'YYYY-MM-DD HH:mm');
    var daysDiff = today.diff(joined, 'days');
    var playCount = user.playcount;

    return numeral(playCount / daysDiff).format("0,0.0");
  },

  renderLoadingState: function() {
    var error = "Couldn't connect to Last.fm, please try reloading."

    return (
      <div className="TotalTime__content">
        <div className="AverageTracks__spinner spinner"></div>
        <div className="AverageTracks__error-msg">
          { error }
        </div>
      </div>
    );
  },

  render: function() {
    if (this.state.error) {
      return (
        <div className="AverageTracks AverageTracks--loading AverageTracks--error">
          { this.renderLoadingState() }
        </div>
      );
    }

    if (this.state.loading) {
      return (
        <div className="AverageTracks AverageTracks--loading">
          { this.renderLoadingState() }
        </div>
      );
    }

    return (
      <div className="AverageTracks">
        <div className="AverageTracks__content">
          <div className="AverageTracks__count">
            { this.state.average }
          </div>
          <div className="AverageTracks__label">
            Avg. Tracks/Day
          </div>
        </div>
      </div>
    );
  }
});
