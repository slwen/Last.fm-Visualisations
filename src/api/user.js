'use strict';

import getJSONP from './getJSONP';
import credentials from './credentials.json';
import map from 'lodash/collection/map';

const baseUrl = `http://ws.audioscrobbler.com/2.0/?format=json&user=slwen&api_key=${credentials.key}`;
const routes = {
  getInfo: `${baseUrl}&method=user.getinfo`,
  getTopAlbums: `${baseUrl}&method=user.gettopalbums`,
  getTopTracks: `${baseUrl}&method=user.gettoptracks`,
  getTopArtists: `${baseUrl}&method=user.gettopartists`,
  getRecentTracks: `${baseUrl}&method=user.getrecenttracks`
};

function formatUrl(params) {
  return map(params, function(value, key) {
    return `&${key}=${value}`;
  }).join('');
};

export function getInfo(callback) {
  const route = routes.getInfo;
  return getJSONP(routes.getInfo, callback);
}

export function getTopArtists(params, callback) {
  const route = routes.getTopArtists + formatUrl(params);
  return getJSONP(route, callback);
}

export function getTopAlbums(params, callback) {
  const route = routes.getTopAlbums + formatUrl(params);
  return getJSONP(route, callback);
}

export function getTopTracks(params, callback) {
  const route = routes.getTopTracks + formatUrl(params);
  return getJSONP(route, callback);
}

export function getRecentTracks(params, callback) {
  const route = routes.getRecentTracks + formatUrl(params);
  return getJSONP(route, callback);
}
