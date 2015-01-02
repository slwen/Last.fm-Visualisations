"use strict";

var React = require('react');
var TotalTracks = require('./components/TotalTracks');
require("./app.scss");

React.renderComponent(<TotalTracks />, document.getElementById('content'));
