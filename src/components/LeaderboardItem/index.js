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
      <div>
        <img src={ this.props.imgUrl } alt={ this.props.title } />
        { this.props.title }
        { this.props.playCount }
      </div>
    );
  }
});
