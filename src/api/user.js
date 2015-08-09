"use strict";

var getJSONP    = require('./getJSONP');
var credentials = require("./credentials.json");
var baseUrl     = "http://ws.audioscrobbler.com/2.0/?format=json&user=slwen&api_key=" + credentials.key;

var routes = {
  getInfo: baseUrl + "&method=user.getinfo",
  getTopAlbums: baseUrl + "&method=user.gettopalbums",
  getTopTracks: baseUrl + "&method=user.gettoptracks",
  getRecentTracks: baseUrl + "&method=user.getrecenttracks"
};

exports.getInfo = function(callback) {
  var route = routes.getInfo;
  return getJSONP(route, callback);
};

exports.getTopAlbums = function(limit, callback) {
  var route = routes.getTopAlbums + "&limit=" + limit;
  return getJSONP(route, callback);
};

exports.getTopTracks = function(limit, period, callback) {
  var route = routes.getTopTracks + "&limit=" + limit + "&period=" + period;
  return getJSONP(route, callback);
};

exports.getRecentTracks = function(limit, startDate, endDate, page, callback) {
  var route = routes.getRecentTracks + "&limit=" + limit + "&from=" + startDate + "&to=" + endDate + "&page=" + page;
  return getJSONP(route, callback);
};
