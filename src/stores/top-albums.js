'use strict';

import Reflux from 'reflux';
import Actions from '../actions';
import user from '../api/user';

module.exports = Reflux.createStore({
  listenables: [Actions],

  getTopAlbums(params) {
    user.getTopAlbums(params, res => {
      this.topAlbums = res.topalbums.album;
      this.metadata = res.topalbums['@attr'];
      this.triggerChange();
    });
  },

  triggerChange() {
    this.trigger('change', this.topAlbums, this.metadata);
  }
});
