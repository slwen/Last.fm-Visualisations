'use strict';

var Reflux  = require('reflux');
var Actions = require('../actions');
var user    = require('../api/user');

module.exports = Reflux.createStore({
  listenables: [Actions],

  getTopArtists: function(params) {
    user.getTopArtists(params, function(res) {
      this.topArtists = res.topartists.artist;
      this.metadata = res.topartists['@attr'];
      this.triggerChange();
    }.bind(this));
  },

  triggerChange: function() {
    this.trigger('change', this.topArtists, this.metadata);
  }
});
