"use strict";

require("./style.scss");

var React   = require('react');
var numeral = require('numeral');
var user    = require('../../api/user');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({
  displayName: 'TotalAlbums',

  getInitialState: function() {
    return {
      loading: true,
      error: false,
      totalAlbums: 0
    }
  },

  componentWillMount: function() {
    this.loadTopAlbums();
  },

  loadTopAlbums: function() {
    user.getTopAlbums({ limit: 1 }, this.setTotalAlbums);
  },

  setTotalAlbums: function(data) {
    if (!data) {
      this.setState({
        error: true,
        loading: false
      });
    } else {
      this.setState({
        loading: false,
        error: false,
        totalAlbums: data.topalbums["@attr"].total
      });
    }
  },

  renderLoadingState: function() {
    var error = "Couldn't connect to Last.fm, please try reloading."

    return (
      <div className="TotalTime__content">
        <div className="TotalAlbums__spinner spinner"></div>
        <div className="TotalAlbums__error-msg">
          { error }
        </div>
      </div>
    );
  },

  render: function() {
    var totalAlbums = numeral(this.state.totalAlbums).format("0,0");

    if (this.state.error) {
      return (
        <div className="TotalAlbums TotalAlbums--loading TotalAlbums--error">
          { this.renderLoadingState() }
        </div>
      );
    }

    if (this.state.loading) {
      return (
        <div className="TotalAlbums TotalAlbums--loading">
          { this.renderLoadingState() }
        </div>
      );
    }

    return (
      <div className="TotalAlbums">
        <div className="TotalAlbums__content">
          <div className="TotalAlbums__total">
            <ReactCSSTransitionGroup transitionName="example">
              <div key="mykeyman">{ totalAlbums }</div>
            </ReactCSSTransitionGroup>
          </div>
          <div className="TotalAlbums__label">
            Albums Played
          </div>
        </div>
      </div>
    );
  }
});
