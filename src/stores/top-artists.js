'use strict';

import Reflux from 'reflux';
import Actions from '../actions';
import { getTopArtists } from '../api/user';

export default Reflux.createStore({
  listenables: [Actions],

  getTopArtists(params) {
    getTopArtists(params, res => {
      this.topArtists = res.topartists.artist;
      this.metadata = res.topartists['@attr'];
      this.triggerChange();
    });
  },

  triggerChange() {
    this.trigger('change', this.topArtists, this.metadata);
  }
});
