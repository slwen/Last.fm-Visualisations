'use strict';

require("./style.scss");

import React from 'react';
import numeral from 'numeral';

export default React.createClass({
  displayName: 'TotalAlbums',
  propTypes: {
    albumsCount: React.PropTypes.string.isRequired,
    topAlbums: React.PropTypes.array.isRequired
  },

  renderFavs() {
    return this.props.topAlbums.map(album => {
      return (
        <div className="TotalAlbums__fav" key={ album.mbid }>
          { album.name }
        </div>
      );
    });
  },

  render() {
    let totalAlbums = numeral(this.props.albumsCount).format("0,0");

    return (
      <div className="TotalAlbums">
        <div className="TotalAlbums__content">
          <div className="TotalAlbums__total">
            { totalAlbums }
          </div>
          <div className="TotalAlbums__label">
            Albums Played With Favourites:
            <div className="TotalAlbums__favs">
              { this.renderFavs() }
            </div>
          </div>
        </div>
      </div>
    );
  }
});
