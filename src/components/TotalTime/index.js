/*
 * TODO: Sort out this janky way of getting/storing the summed up
 *       playcounts. Not happy with how "sum" has to be passed down
 *       multiple functions.
 *
 * TODO: Assess need for numeral.js or moment.js for this component.
 *
 */

"use strict";

require("./style.scss");

var _       = require('lodash');
var React   = require('react');
var numeral = require('numeral');
var moment  = require('moment');
var iconSrc = require('./icon.png');
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
      var samplePlaycount = this.sumPlaycounts(data.toptracks.track);

      this.setState({
        loading: false,
        error: false,
        userTopTracks: this.processTopTracks(data.toptracks.track, samplePlaycount)
      });
    }

    var averageDuration = this.state.userTopTracks;
    var estimatedTime = Math.round(averageDuration * this.state.userInfo.playcount);

    var displayTime = numeral(estimatedTime).format('00:00:00');

    console.log(displayTime);
  },

  sumPlaycounts: function(topTracks) {
    var sumPlaycount = 0;

    _.forEach(topTracks, function(track) {
      sumPlaycount += parseFloat(track.playcount);
    });

    return sumPlaycount;
  },

  processTopTracks: function(topTracks, sum) {
    var weightedDuration;
    var average = 0;

    _.map(topTracks, function(track) {
      weightedDuration = this.calculateWeight(track.playcount, sum, track.duration);
      average += weightedDuration;
    }, this);

    return average;
  },

  calculateWeight: function(playcount, sum, duration) {
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
    var userInfo = this.state.userInfo;

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
            { userInfo }
          </div>
          <div className="TotalTime__label">
            Total Tracks
          </div>
        </div>
      </div>
    );
  }
});
