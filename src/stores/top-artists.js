'use strict';

import Reflux from 'reflux';
import Actions from '../actions';
import user from '../api/user';

export default Reflux.createStore({
  listenables: [Actions],

  getTopArtists(params) {
    user.getTopArtists(params, res => {
      this.topArtists = res.topartists.artist;
      this.metadata = res.topartists['@attr'];
      this.triggerChange();
    });
  },

  triggerChange() {
    this.trigger('change', this.topArtists, this.metadata);
  }
});
