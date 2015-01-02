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
      totalAlbums: 0
    }
  },

  componentWillMount: function() {
    this.setState({ loading: true });
    user.getTopAlbums(1, this.setTotalAlbums);
  },

  setTotalAlbums: function(data) {
    this.setState({
      loading: false,
      totalAlbums: data.topalbums["@attr"].total
    });
  },

  render: function() {
    var totalAlbums = numeral(this.state.totalAlbums).format("0,0");

    if (this.state.loading) {
      return (
        <div className="TotalAlbums TotalAlbums--loading">
          <div className="TotalAlbums__spinner spinner"></div>
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
