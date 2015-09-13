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

  render: function() {
    return (
      <div className="LeaderboardItem">
        <img src={ this.props.imgUrl } alt={ this.props.title } />
        <div className="LeaderboardItem__body">
          <div className="LeaderboardItem__title">
            { this.props.title }
          </div>
          <div className="LeaderboardItem__playcount">
            { this.props.playCount }
          </div>
        </div>
      </div>
    );
  }
});
