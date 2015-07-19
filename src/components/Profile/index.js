"use strict";

require("./style.scss");

var React   = require('react');
var moment  = require('moment');
var user    = require('../../api/user');

module.exports = React.createClass({
  displayName: 'Profile',

  getInitialState: function() {
    return {
      loading: true,
      profileData: {}
    };
  },

  componentWillMount: function() {
    this.loadProfileData();
  },

  loadProfileData: function() {
    user.getInfo(this.setProfileData);
  },

  setProfileData: function(data) {
    if (!data) {
      this.setState({ error: true });
      this.loadProfileData();
    } else {
      this.setState({
        loading: false,
        error: false,
        profileData: this.formatProfileData(data.user)
      });
    }
  },

  formatProfileData: function(user) {
    return {
      joinDate: moment(user.registered["#text"], 'YYYY-MM-DD HH:mm').format('MMM Do, YYYY'),
      imageUrl: user.image[3]['#text'],
      name: user.name
    };
  },

  renderLoadingState: function() {
    var error = "We're still trying to load your face, Last.fm doesn't want to hand it over just yet...";

    return (
      <div>
        <div className="Profile__spinner spinner"></div>
        <div className="Profile__error-msg">
          { error }
        </div>
      </div>
    );
  },

  render: function() {
    var user = this.state.profileData;

    if (this.state.error) {
      return (
        <div className="Profile Profile--loading Profile--error">
          { this.renderLoadingState() }
        </div>
      );
    }

    if (this.state.loading) {
      return (
        <div className="Profile Profile--loading">
          { this.renderLoadingState() }
        </div>
      );
    }

    return (
      <div className="Profile">
        <img src={ user.imageUrl } className="Profile__image" height="72" width="72" />
        <div className="Profile__content">
          <div className="Profile__name">
            { user.name }
          </div>
          <div className="Profile__joined">
            Joined { user.joinDate }
          </div>
        </div>
      </div>
    );
  }
});
