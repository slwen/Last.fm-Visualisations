"use strict";

require("./style.scss");

var _      = require('lodash');
var React  = require('react');
var Stock  = require('paths-js/stock');
var moment = require('moment');
var user   = require('../../api/user');

// DUMMY DATA
var data = [[]];

for(var i = 0; i < 30; i++) {
  data[0].push({
    day: i,
    playcount: getRandomInt(7, 21)
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var stock = Stock({
  data: data,
  xaccessor: function(d) { return d.day; },
  yaccessor: function(d) { return d.playcount; },
  width: 375,
  height: 90,
  closed: true
});

module.exports = React.createClass({
  displayName: 'TracksPlayedGraph',

  getInitialState: function() {
    return {
      loading: true,
      userRecentTracks: []
    }
  },

  componentWillMount: function() {
    this.loadUserRecentTracks(1);
  },

  loadUserRecentTracks: function(page) {
    // TODO
  },

  setUserRecentTracks: function(result) {
    // TODO
  },

  renderLines: function() {
    return _.map(stock.curves, function(d, i) {
      return <path className="TracksPlayedGraph__line" d={ d.line.path.print() } />;
    });
  },

  renderAreas: function() {
    return _.map(stock.curves, function(d, i) {
      return <path className="TracksPlayedGraph__area" d={ d.area.path.print() } />;
    });
  },

  render: function() {
    return (
      <div className="TracksPlayedGraph">
        <svg width="375px" height="90px">
          { this.renderLines() }
          { this.renderAreas() }
        </svg>
      </div>
    );
  }
});
