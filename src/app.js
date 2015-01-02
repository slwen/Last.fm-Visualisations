"use strict";

require("./app.scss");

var React       = require('react');
var TotalTracks = require('./components/TotalTracks');
var TotalAlbums = require('./components/TotalAlbums');

React.renderComponent(<TotalTracks />, document.getElementById('total-tracks-hook'));
React.renderComponent(<TotalAlbums />, document.getElementById('total-albums-hook'));
