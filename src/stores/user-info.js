'use strict';

import Reflux from 'reflux';
import Actions from '../actions';
import { getInfo } from '../api/user';

export default Reflux.createStore({
  listenables: [Actions],

  getUserInfo() {
    getInfo(res => {
      this.userInfo = res.user;
      this.triggerChange();
    });
  },

  triggerChange() {
    this.trigger('change', this.userInfo);
  }
});
