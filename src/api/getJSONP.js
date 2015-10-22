'use strict';

import jsonp from 'jsonp';

export default function getJSONP(url, callback) {
  return jsonp(url, {}, (error, data) => {
    callback(error ? null : data);
  });
}
