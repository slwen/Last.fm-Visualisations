"use strict";

var React = require('react');
var Hello = require('./components/Hello');
require("./app.scss");

React.renderComponent(<Hello />, document.getElementById('content'));
