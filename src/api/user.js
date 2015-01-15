"use strict";

var getJSONP    = require('./getJSONP');
var credentials = require("./credentials.json");
var endpoint    = "http://ws.audioscrobbler.com/2.0/?format=json&user=slwen&api_key=" + credentials.key;

module.exports = {
  getInfo: function(callback) {
    endpoint += "&method=user.getinfo";
    return getJSONP(endpoint, callback);
  },

  getTopAlbums: function(limit, callback) {
    endpoint += "&method=user.gettopalbums&limit=" + limit;
    return getJSONP(endpoint, callback);
  },

  getTopTracks: function(limit, callback) {
    endpoint += "&method=user.gettoptracks&limit=" + limit;
    return getJSONP(endpoint, callback);
  }
};
