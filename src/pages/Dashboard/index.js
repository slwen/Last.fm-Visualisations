'use strict';

require('./style.scss');

import React from 'react';
import Reflux from 'reflux';
import Actions from '../../actions';
import UserInfoStore from '../../stores/user-info';
import TopTracksStore from '../../stores/top-tracks';
import TopAlbumsStore from '../../stores/top-albums';
import TotalTracks from '../../components/TotalTracks';
import TotalAlbums from '../../components/TotalAlbums';
import TotalTime from '../../components/TotalTime';
import AverageTracks from '../../components/AverageTracks';
import LoadingSpinner from '../../components/LoadingSpinner';

export default React.createClass({
  displayName: 'DashboardPage',
  mixins: [
    Reflux.listenTo(TopAlbumsStore, 'topAlbumsChange'),
    Reflux.listenTo(TopTracksStore, 'topTracksChange'),
    Reflux.listenTo(UserInfoStore, 'userInfoChange')
  ],

  getInitialState() {
    return {
      topAlbums: null,
      topTracks: null,
      userInfo: null
    };
  },

  componentWillMount() {
    Actions.getUserInfo();
    Actions.getTopAlbums({ limit: 3 });
    Actions.getTopTracks({ limit: 100 });
  },

  topAlbumsChange(event, data, metadata) {
    this.setState({
      albumsCount: metadata.total,
      topAlbums: data
    });
  },

  topTracksChange(event, data, metadata) {
    this.setState({
      tracksCount: metadata,
      topTracks: data
    });
  },

  userInfoChange(event, data) {
    this.setState({ userInfo: data });
  },

  render() {
    let userInfo    = this.state.userInfo;
    let albumsCount = this.state.albumsCount;
    let topAlbums   = this.state.topAlbums;
    let tracksCount = this.state.tracksCount;
    let topTracks   = this.state.topTracks;

    if (userInfo && albumsCount && tracksCount) {
      return (
        <div className="DashboardPage">
          <TotalTracks playCount={ userInfo.playcount } />
          <TotalAlbums albumsCount={ albumsCount } topAlbums={ topAlbums } />
          <TotalTime playCount={ userInfo.playcount } topTracks={ topTracks } />
          <AverageTracks userInfo={ userInfo } />
        </div>
      );
    }

    return <LoadingSpinner />;
  }
});
