"use strict";

require("./style.scss");

var React = require('react');

module.exports = React.createClass({
  displayName: 'LeaderboardItem',
  propTypes: {
    title: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.string,
    playCount: React.PropTypes.string.isRequired,
    imgUrl: React.PropTypes.string.isRequired
  },

  renderSubtitle: function() {
    var subtitle = this.props.subtitle;

    if (subtitle) {
      return (
        <div className="LeaderboardItem__subtitle">
          { subtitle }
        </div>
      );
    }
  },

  render: function() {
    return (
      <div className="LeaderboardItem">
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
