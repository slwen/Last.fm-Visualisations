"use strict";

require("./style.scss");

var _               = require('lodash');
var React           = require('react');
var TabBarButton    = require('../TabBarButton');
var iconCompare     = require("./icon--compare.svg");
var iconDashboard   = require("./icon--dashboard.svg");
var iconLeaderboard = require("./icon--leaderboard.svg");
var iconSettings    = require("./icon--settings.svg");

module.exports = React.createClass({
  displayName: 'TabBar',
  propTypes: {
    selected: React.PropTypes.number,
    menuItems: React.PropTypes.arrayOf(React.PropTypes.object)
  },

  getDefaultProps: function() {
    return {
      selected: 0,
      menuItems: [
        {
          name: "Dashboard",
          icon: iconDashboard,
          link: "dashboard"
        },
        {
          name: "Leaderboard",
          icon: iconLeaderboard,
          link: "leaderboard"
        },
        {
          name: "Compare",
          icon: iconCompare,
          link: "leaderboard"
        },
        {
          name: "Settings",
          icon: iconSettings,
          link: "leaderboard"
        }
      ]
    };
  },

  renderTabBarButtons: function() {
    return this.props.menuItems.map(function(item, i) {
      return (
        <TabBarButton
          key={ "TabBarButton-" + i }
          name={ item.name }
          icon={ item.icon }
          link={ item.link } />
      );
    }, this);
  },

  render: function() {
    return (
      <div className="TabBar">
        { this.renderTabBarButtons() }
      </div>
    );
  }
});
