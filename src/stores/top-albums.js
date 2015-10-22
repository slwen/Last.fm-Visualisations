'use strict';

import Reflux from 'reflux';
import Actions from '../actions';
import { getTopAlbums } from '../api/user';

export default Reflux.createStore({
  listenables: [Actions],

  getTopAlbums(params) {
    getTopAlbums(params, res => {
      this.topAlbums = res.topalbums.album;
      this.metadata = res.topalbums['@attr'];
      this.triggerChange();
    });
  },

  triggerChange() {
    this.trigger('change', this.topAlbums, this.metadata);
  }
});
