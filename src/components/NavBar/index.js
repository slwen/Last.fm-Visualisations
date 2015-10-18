'use strict';

require("./style.scss");

import React from 'react';

module.exports = React.createClass({
  displayName: 'NavBar',

  render() {
    return (
      <div className="NavBar">
        <div className="NavBar__title">Dashboard</div>
      </div>
    );
  }
});
