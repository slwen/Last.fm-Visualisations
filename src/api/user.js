"use strict";

var getJSONP    = require('./getJSONP');
var credentials = require("./credentials.json");
var baseUrl     = "http://ws.audioscrobbler.com/2.0/?format=json&user=slwen&api_key=" + credentials.key

module.exports = {
  getInfo: function(callback) {
    var endpoint = baseUrl + "&method=user.getinfo";
    return getJSONP(endpoint, callback);
  },

  getTopAlbums: function(limit, callback) {
    var endpoint = baseUrl + "&method=user.gettopalbums&limit=" + limit;
    return getJSONP(endpoint, callback);
  }
};
