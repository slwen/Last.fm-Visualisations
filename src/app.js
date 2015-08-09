"use strict";

require("./app.scss");

var React        = require('react');
var Router       = require('react-router');
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Route        = Router.Route;

var Leaderboard = require('./pages/Leaderboard');
var Dashboard   = require('./pages/Dashboard');

var App = React.createClass({
  render: function() {
    return <RouteHandler />;
  }
});

var routes = (
  <Route handler={ App }>
    <DefaultRoute handler={ Dashboard }/>
    <Route name="dashboard" path="dashboard" handler={ Dashboard } />
    <Route name="leaderboard" path="leaderboard" handler={ Leaderboard } />
  </Route>
);

Router.run(routes, Router.HashLocation, function(Root) {
  React.render(<Root/>, document.body);
});
