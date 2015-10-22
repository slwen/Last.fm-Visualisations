'use strict';

require("./style.scss");

import React from 'react';
import numeral from 'numeral';
import moment from 'moment';
import forEach from 'lodash/collection/forEach';
import map from 'lodash/collection/map';

module.exports = React.createClass({
  displayName: 'TotalTime',
  propTypes: {
    playCount: React.PropTypes.string.isRequired,
    topTracks: React.PropTypes.array.isRequired
  },

  getDefaultProps() {
    return {
      playCount: '0',
      topTracks: []
    };
  },

  sumPlaycounts() {
    let sumPlaycount = 0;

    forEach(this.props.topTracks, track => {
      sumPlaycount += parseFloat(track.playcount);
    });

    return sumPlaycount;
  },

  calculateWeightedDuration(playcount, duration, summedPlaycounts) {
    const weight = playcount / summedPlaycounts;
    return weight * duration;
  },

  calculateAverageDuration(topTracks) {
    let weightedDuration;
    let averageDuration = 0;
    let summedPlaycounts = this.sumPlaycounts();

    map(topTracks, track => {
      weightedDuration = this.calculateWeightedDuration(track.playcount, track.duration, summedPlaycounts);
      averageDuration += weightedDuration;
    });

    return averageDuration;
  },

  render() {
    let playCount       = this.props.playCount;
    let topTracks       = this.props.topTracks;
    let averageDuration = this.calculateAverageDuration(topTracks);
    let estimatedTotal  = averageDuration * playCount;
    let formattedTotal  = numeral(moment.duration(estimatedTotal, 'seconds').asHours()).format('0,0');

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
