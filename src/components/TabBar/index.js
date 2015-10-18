"use strict";

require("./style.scss");

import React from 'react';
import TabBarButton from '../TabBarButton';
import iconCompare from './icon--compare.svg';
import iconDashboard from './icon--dashboard.svg';
import iconLeaderboard from './icon--leaderboard.svg';
import iconSettings from './icon--settings.svg';

module.exports = React.createClass({
  displayName: 'TabBar',
  propTypes: {
    selected: React.PropTypes.number,
    menuItems: React.PropTypes.arrayOf(React.PropTypes.object)
  },

  getDefaultProps() {
    return {
      selected: 0,
      menuItems: [
        {
          name: 'Dashboard',
          icon: iconDashboard,
          link: 'dashboard'
        },
        {
          name: 'Leaderboard',
          icon: iconLeaderboard,
          link: 'leaderboard'
        },
        {
          name: 'Compare',
          icon: iconCompare,
          link: 'leaderboard'
        },
        {
          name: 'Settings',
          icon: iconSettings,
          link: 'leaderboard'
        }
      ]
    };
  },

  renderTabBarButtons() {
    return this.props.menuItems.map((item, i) => {
      return (
        <TabBarButton
          key={ "TabBarButton-" + i }
          name={ item.name }
          icon={ item.icon }
          link={ item.link } />
      );
    });
  },

  render() {
    return (
      <div className="TabBar">
        { this.renderTabBarButtons() }
      </div>
    );
  }
});
