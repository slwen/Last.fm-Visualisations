'use strict';

require('./style.scss');

import React from 'react';

export default React.createClass({
  displayName: 'LoadingSpinner',

  render() {
    return (
      <div className="LoadingSpinner">
        <div className="LoadingSpinner__spinner"></div>
        <div className="LoadingSpinner__msg">
          <h4>Crunching the numbers from your Last.fm profile.</h4>
          <p>This should only take a moment.</p>
        </div>
      </div>
    );
  }
});
