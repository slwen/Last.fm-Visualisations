'use strict';

var Reflux  = require('reflux');
var Actions = require('../actions');
var user    = require('../api/user');

module.exports = Reflux.createStore({
  listenables: [Actions],

  getTopTracks: function(params) {
    user.getTopTracks(params, function(res) {
      this.topTracks = res.toptracks.track;
      this.metadata = res.toptracks['@attr'];
      this.triggerChange();
    }.bind(this));
  },

  triggerChange: function() {
    this.trigger('change', this.topTracks, this.metadata);
  }
});
