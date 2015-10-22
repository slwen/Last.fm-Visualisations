'use strict';

require('./style.scss');

import React from 'react';
import numeral from 'numeral';
import moment from 'moment';

export default React.createClass({
  displayName: 'AverageTracks',
  propTypes: {
    userInfo: React.PropTypes.object.isRequired
  },

  getDefaultProps() {
    return {
      userInfo: {}
    };
  },

  calculateAverage(user) {
    const today     = moment();
    const joined    = moment.unix(user.registered["#text"]);
    const daysDiff  = today.diff(joined, 'days');
    const playCount = user.playcount;

    return numeral(playCount / daysDiff).format("0,0.0");
  },

  render() {
    return (
      <div className="AverageTracks">
        <div className="AverageTracks__content">
          <div className="AverageTracks__count">
            { this.calculateAverage(this.props.userInfo) }
          </div>
          <div className="AverageTracks__label">
            Average number of tracks you listen to per day
          </div>
        </div>
      </div>
    );
  }
});
