"use strict";

var _           = require('lodash');
var getJSONP    = require('./getJSONP');
var credentials = require("./credentials.json");
var baseUrl     = "http://ws.audioscrobbler.com/2.0/?format=json&user=slwen&api_key=" + credentials.key;

var routes = {
  getInfo: baseUrl + "&method=user.getinfo",
  getTopAlbums: baseUrl + "&method=user.gettopalbums",
  getTopTracks: baseUrl + "&method=user.gettoptracks",
  getTopArtists: baseUrl + "&method=user.gettopartists",
  getRecentTracks: baseUrl + "&method=user.getrecenttracks"
};

var formatUrl = function(params) {
  return _.map(params, function(value, key) {
    return '&' + key + '=' + value;
  }).join('');
};

exports.getInfo = function(callback) {
  var route = routes.getInfo;
  return getJSONP(routes.getInfo, callback);
};

exports.getTopArtists = function(params, callback) {
  var route = routes.getTopArtists + formatUrl(params);
  return getJSONP(route, callback);
};

exports.getTopAlbums = function(params, callback) {
  var route = routes.getTopAlbums + formatUrl(params);
  return getJSONP(route, callback);
};

exports.getTopTracks = function(params, callback) {
  var route = routes.getTopTracks + formatUrl(params);
  return getJSONP(route, callback);
};

exports.getRecentTracks = function(params, callback) {
  var route = routes.getRecentTracks + formatUrl(params);
  return getJSONP(route, callback);
};
