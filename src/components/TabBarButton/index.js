"use strict";

require("./style.scss");

var React = require('react');

module.exports = React.createClass({
  displayName: 'TabBarButton',
  propTypes: {
    name: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired
  },

  render: function() {
    return (
      <div className="TabBarButton">
        <div className="TabBarButton__icon">
          <img src={ this.props.icon } />
        </div>
        <div className="TabBarButton__label">
          { this.props.name }
        </div>
      </div>
    );
  }
});
