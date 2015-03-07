"use strict";

require("./style.scss");

var _       = require('lodash');
var React   = require('react');
var numeral = require('numeral');
var moment  = require('moment');
var user    = require('../../api/user');

module.exports = React.createClass({
  displayName: 'TotalTime',

  getInitialState: function() {
    return {
      loading: true,
      error: false,
      userInfo: null,
      userTopTracks: null
    }
  },

  componentWillMount: function() {
    this.loadUserTopTracks();
  },

  loadUserTopTracks: function() {
    user.getTopTracks(100, this.setUserTopTracks);
  },

  setUserTopTracks: function(data) {
    if (!data) {
      this.setState({ error: true });
      this.loadUserTopTracks();
    } else {
      this.setState({
        loading: true,
        error: false,
        userTopTracks: data.toptracks.track
      });

      // Loads here to make sure we get an accurate loading state.
      this.loadUserInfo();
    }
  },

  loadUserInfo: function() {
    user.getInfo(this.setUserInfo);
  },

  setUserInfo: function(data) {
    if (!data) {
      this.setState({ error: true });
      this.loadUserInfo();
    } else {
      this.setState({
        loading: false,
        error: false,
        userInfo: data.user
      });
    }
  },

  sumPlaycounts: function() {
    var sumPlaycount = 0;

    _.forEach(this.state.userTopTracks, function(track) {
      sumPlaycount += parseFloat(track.playcount);
    });

    return sumPlaycount;
  },

  calculateWeightedDuration: function(playcount, duration, summedPlaycounts) {
    var weight = playcount / summedPlaycounts;
    return weight * duration;
  },

  calculateAverageDuration: function(topTracks) {
    var weightedDuration;
    var averageDuration = 0;
    var summedPlaycounts = this.sumPlaycounts();

    _.map(topTracks, function(track) {
      weightedDuration = this.calculateWeightedDuration(track.playcount, track.duration, summedPlaycounts);
      averageDuration += weightedDuration;
    }, this);

    return averageDuration;
  },

  renderLoadingState: function() {
    var error = "Apologies, loading your Last.fm data is taking a while, but we'll keep trying..."

    return (
      <div>
        <div className="TotalTime__spinner spinner"></div>
        <div className="TotalTime__error-msg">
          { error }
        </div>
      </div>
    );
  },

  render: function() {
    var userInfo  = this.state.userInfo;
    var topTracks = this.state.userTopTracks;

    if (userInfo && topTracks) {
      var averageDuration = this.calculateAverageDuration(topTracks);
      var estimatedTotal  = averageDuration * userInfo.playcount;
      var formattedTotal  = numeral(moment.duration(estimatedTotal, 'seconds').asHours()).format('0,0');
    }

    if (this.state.error) {
      return (
        <div className="TotalTime TotalTime--loading TotalTime--error">
          { this.renderLoadingState() }
        </div>
      );
    }

    if (this.state.loading) {
      return (
        <div className="TotalTime TotalTime--loading">
          { this.renderLoadingState() }
        </div>
      );
    }

    return (
      <div className="TotalTime">
        <div className="TotalTime__content">
          <div className="TotalTime__hours">
            { formattedTotal }
          </div>
          <div className="TotalTime__label">
            Hours Spent
          </div>
        </div>
      </div>
    );
  }
});
