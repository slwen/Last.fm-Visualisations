"use strict";

require("./style.scss");

var _       = require('lodash');
var React   = require('react');
var moment  = require('moment');
var iconSrc = require('./icon.png');
var user    = require('../../api/user');

/*
 * TODO: Sort out loading state issue; Make sure
 *       each API call is complete before switching
 *       to a loaded state.
 */

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
    this.loadUserInfo();
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

  loadUserTopTracks: function() {
    user.getTopTracks(100, this.setUserTopTracks);
  },

  setUserTopTracks: function(data) {
    if (!data) {
      this.setState({ error: true });
      this.loadUserTopTracks();
    } else {
      this.setState({
        loading: false,
        error: false,
        userTopTracks: data.toptracks.track
      });
    }
  },

  calculateAverageDuration: function(topTracks) {
    var weightedDuration;
    var averageDuration = 0;
    var sum = this.sumPlaycounts();

    _.map(topTracks, function(track) {
      weightedDuration = this.calculateWeightedDuration(track.playcount, track.duration, sum);
      averageDuration += weightedDuration;
    }, this);

    return averageDuration;
  },

  sumPlaycounts: function() {
    var sumPlaycount = 0;

    _.forEach(this.state.userTopTracks, function(track) {
      sumPlaycount += parseFloat(track.playcount);
    });

    return sumPlaycount;
  },

  calculateWeightedDuration: function(playcount, duration, sum) {
    var weight = playcount / sum;
    return weight * duration;
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
      var formattedTotal  = Math.round(moment.duration(estimatedTotal, 'seconds').asDays());
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
        <img src={ iconSrc } className="TotalTime__icon" height="32" width="32" />
        <div className="TotalTime__content">
          <div className="TotalTime__playcount">
            { formattedTotal }
          </div>
          <div className="TotalTime__label">
            Estimated Total Days
          </div>
        </div>
      </div>
    );
  }
});
