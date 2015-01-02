"use strict";

require("./style.scss");

var React   = require('react');
var numeral = require('numeral');
var iconSrc = require('./icon.png');
var user    = require('../../api/user');

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
    user.getTopAlbums(1, this.setTotalAlbums);
  },

  setTotalAlbums: function(data) {
    if (!data) {
      this.setState({ error: true });
      this.loadTopAlbums();
    } else {
      this.setState({
        loading: false,
        error: false,
        totalAlbums: data.topalbums["@attr"].total
      });
    }
  },

  renderLoadingState: function() {
    var error = "Apologies, loading your Last.fm data is taking a while, but we'll keep trying..."

    return (
      <div>
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
        <img src={ iconSrc } className="TotalAlbums__icon" height="32" width="32" />
        <div className="TotalAlbums__content">
          <div className="TotalAlbums__total">
            { totalAlbums }
          </div>
          <div className="TotalAlbums__label">
            Total Albums
          </div>
        </div>
      </div>
    );
  }
});
