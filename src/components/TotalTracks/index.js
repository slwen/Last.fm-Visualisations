'use strict';

require("./style.scss");

import React from 'react';
import numeral from 'numeral';

export default React.createClass({
  displayName: 'TotalTracks',
  propTypes: {
    playCount: React.PropTypes.string.isRequired
  },

  getDefaultProps() {
    return { playCount: '0' }
  },

  render() {
    let playCount = numeral(this.props.playCount).format("0,0");

    return (
      <div className="TotalTracks">
        <div className="TotalTracks__content">
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
