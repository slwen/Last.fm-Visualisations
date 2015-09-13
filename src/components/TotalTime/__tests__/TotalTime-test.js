"use strict";

var path = '../';

jest.autoMockOff();
jest.mock('../../../api/user');

describe('TotalTime Component', function() {
  var React       = require('react/addons');
  var user        = require('../../../api/user');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var TotalTime   = require(path);
  var Component;

  var topTracksResponse = [
    { playcount: 100, duration: 300 },
    { playcount: 50, duration: 100 },
    { playcount: 25, duration: 600 }
  ];

  var userInfoResponse = { playcount: 100000 };

  describe('Collecting the correct data from the last.fm API', function() {
    beforeEach(function() {
      user.getInfo.mockClear();
      user.getTopTracks.mockClear();
      Component = TestUtils.renderIntoDocument(<TotalTime />);
    });

    it('Makes one correct request for user top tracks', function() {
      expect(user.getTopTracks.mock.calls.length).toEqual(1);
    });

    it('Accepts a callback function after loading top tracks', function() {
      expect(user.getTopTracks).toBeCalledWith(100, "overall", Component.setUserTopTracks);
    });

    it('Makes one correct request for user info', function() {
      Component.loadUserInfo();
      expect(user.getInfo.mock.calls.length).toEqual(1);
    });

    it('Accepts a callback function after loading user info', function() {
      Component.loadUserInfo();
      expect(user.getInfo).toBeCalledWith(Component.setUserInfo);
    });
  });

  describe('Calculating total hours of playtime, based on a weighted average track length', function() {
    beforeEach(function() {
      Component = TestUtils.renderIntoDocument(<TotalTime />);
      Component.setState({ userTopTracks: topTracksResponse });
    });

    it('Sums together the playcount for each of the users top tracks', function() {
      expect(Component.sumPlaycounts()).toEqual(175);
    });

    it('Can calculate a weighted duration for each track', function() {
      expect(Component.calculateWeightedDuration(100, 300, 175)).toEqual(171.42857142857142);
    });

    it('Adds the weighted duration of each track together', function() {
      expect(Component.calculateAverageDuration(Component.state.userTopTracks)).toEqual(285.7142857142857);
    });
  });

  describe('When no data is returned', function() {
    beforeEach(function() {
      Component.setUserTopTracks(null);
    });

    it('Adds an error class to the container element', function() {
      var element = findByClass(Component, "TotalTime--error");
      var errorMsg = findByClass(Component, "TotalTime__error-msg");

      expect(element).toBeDefined();
      expect(errorMsg).toBeDefined();
    });
  });

  describe('When the component is loading', function() {
    it('Displays a loading icon by default', function() {
      var spinner = findByClass(Component, "TotalTime__spinner");

      expect(spinner).toBeDefined();
    });
  });

  describe('When data is retreived', function() {
    beforeEach(function() {
      Component = TestUtils.renderIntoDocument(<TotalTime />);

      Component.setState({
        loading: false,
        userInfo: userInfoResponse,
        userTopTracks: topTracksResponse
      });
    });

    it('Displays a formatted number of hours', function() {
      var playcount = findByClass(Component, "TotalTime__hours");

      expect(playcount).toBeDefined();
      expect(playcount.getDOMNode().textContent).toBe('7,937');
    });

    it('Displays a label', function() {
      var label = findByClass(Component, "TotalTime__label");

      expect(label.getDOMNode().textContent).toBe('Hours Spent');
    });
  });
});
