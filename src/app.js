"use strict";

require("./app.scss");

import React from 'react';
import Router from 'react-router';
import TabBar from './components/TabBar';
import NavBar from './components/NavBar';
import Leaderboard from './pages/Leaderboard';
import Dashboard from './pages/Dashboard';

const Route        = Router.Route;
const DefaultRoute = Router.DefaultRoute;
const RouteHandler = Router.RouteHandler;

const App = React.createClass({
  displayName: 'App',

  render() {
    return (
      <div className="Application">
        <NavBar />
        <div className="Application__main">
          <RouteHandler />
        </div>
        <TabBar />
      </div>
    );
  }
});

const routes = (
  <Route handler={ App }>
    <DefaultRoute handler={ Dashboard }/>
    <Route name="dashboard" path="dashboard" handler={ Dashboard } />
    <Route name="leaderboard" path="leaderboard" handler={ Leaderboard } />
  </Route>
);

Router.run(routes, Router.HashLocation, function(Root) {
  React.render(<Root/>, document.body);
});
