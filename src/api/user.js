"use strict";

var getJSONP = require('./getJSONP');
var credentials = require("./credentials.json");
var endpoint = "http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=slwen&api_key=" + credentials.key + "&format=json";

module.exports = {
  getInfo: function(callback) {
    return getJSONP(endpoint, callback);
  }
};
