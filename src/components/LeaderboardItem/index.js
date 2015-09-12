"use strict";

require("./style.scss");

var React = require('react');

module.exports = React.createClass({
  displayName: 'LeaderboardItem',
  propTypes: {
    artist: React.PropTypes.string.isRequired,
    playCount: React.PropTypes.number.isRequired,
    imgUrl: React.PropTypes.string.isRequired,
    track: React.PropTypes.string,
    album: React.PropTypes.string,
  },

  render: function() {
    return (
      <div>
        { this.props.artist }
        { this.props.playCount }
      </div>
    );
  }
});
