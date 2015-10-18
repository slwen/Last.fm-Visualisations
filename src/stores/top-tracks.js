'use strict';

import Reflux from 'reflux';
import Actions from '../actions';
import user from '../api/user';

module.exports = Reflux.createStore({
  listenables: [Actions],

  getTopTracks(params) {
    user.getTopTracks(params, res => {
      this.topTracks = res.toptracks.track;
      this.metadata = res.toptracks['@attr'];
      this.triggerChange();
    });
  },

  triggerChange() {
    this.trigger('change', this.topTracks, this.metadata);
  }
});
