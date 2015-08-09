"use strict";

var path = '../';

jest.autoMockOff();
jest.mock('../../../api/user');

describe('Leaderboard component', function() {
  var React       = require('react/addons');
  var user        = require('../../../api/user');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var Leaderboard = require(path);
  var Component;

  beforeEach(function() {
    user.getTopTracks.mockClear();
    Component = TestUtils.renderIntoDocument(<Leaderboard />);
  });

  describe('When data is requested', function() {
    it('makes one correct request for the data', function() {
      expect(user.getTopTracks.mock.calls.length).toEqual(1);
    });

    it('runs a callback function', function() {
      expect(user.getTopTracks).toBeCalledWith(Component.setTopTracks);
    });

    it('shows a specified number of results', function() {

    });

    it('shows results for a specified period', function() {

    });
  });

  describe('When no data is returned', function() {
    beforeEach(function() {
      Component.setTopTracks(null);
    });

    it('adds an error class to the container element', function() {
      var element = findByClass(Component, "Leaderboard--error");
      var errorMsg = findByClass(Component, "Leaderboard__error-msg");

      expect(element).toBeDefined();
      expect(errorMsg).toBeDefined();
    });

    it('attempts to re-load itself', function() {
      expect(user.getTopTracks).toBeCalledWith(Component.setPlayCount);
      expect(user.getTopTracks.mock.calls.length > 1).toBeTruthy();
    });
  });

  describe('When the component is loading', function() {
    it('displays a loading icon by default', function() {
      var spinner = findByClass(Component, "Leaderboard__spinner");
      expect(spinner).toBeDefined();
    });
  });

  describe('When data is retreived', function() {
    beforeEach(function() {
      Component.setState({
        loading: false,
        topTracks: [
          {
            artist: "foo",
            album: "bar",
            track: "baz",
            img: "http://test.com/placeholder.jpg",
            rank: 1,
            playcount: 45,
            weight: 0.45
          },
          {
            artist: "test",
            album: "song",
            track: "data",
            img: "http://test.com/derp.jpg",
            rank: 1,
            playcount: 45,
            weight: 0.45
          },
          {
            artist: "test",
            album: "song",
            track: "data",
            img: "http://test.com/derp.jpg",
            rank: 3,
            playcount: 10,
            weight: 0.1
          }
        ]
      });
    });

    it('displays multiple leaderboard items', function() {

    });

    it('displays a track, album and artist name in each result', function() {

    });

    it('orders the results based on rank', function() {

    });

    it('graphs the playcount against total plays using weight field', function() {

    });
  });
});
