'use strict';

var Reflux  = require('reflux');
var Actions = require('../actions');
var user    = require('../api/user');

module.exports = Reflux.createStore({
  listenables: [Actions],

  getTopAlbums: function(params) {
    user.getTopAlbums(params, function(res) {
      this.topAlbums = res.topalbums.album;
      this.metadata = res.topalbums['@attr'];
      this.triggerChange();
    }.bind(this));
  },

  triggerChange: function() {
    this.trigger('change', this.topAlbums, this.metadata);
  }
});
