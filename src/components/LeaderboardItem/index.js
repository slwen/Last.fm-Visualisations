'use strict';

require("./style.scss");

import React from 'react';

export default React.createClass({
  displayName: 'LeaderboardItem',
  propTypes: {
    title: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.string,
    playCount: React.PropTypes.string.isRequired,
    imgUrl: React.PropTypes.string.isRequired,
    style: React.PropTypes.object.isRequired
  },

  renderSubtitle() {
    const { subtitle } = this.props;

    if (subtitle) {
      return (
        <div className="LeaderboardItem__subtitle">
          { subtitle }
        </div>
      );
    }
  },

  render() {
    return (
      <div className="LeaderboardItem" style={ this.props.style }>
        <img src={ this.props.imgUrl } alt={ this.props.title } />
        <div className="LeaderboardItem__body">
          <div className="LeaderboardItem__title">
            { this.props.title }
            { this.renderSubtitle() }
          </div>
          <div className="LeaderboardItem__playcount">
            { this.props.playCount }
          </div>
        </div>
      </div>
    );
  }
});
