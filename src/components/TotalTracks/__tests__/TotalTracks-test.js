"use strict";

var path = '../';

jest.autoMockOff();
jest.mock('../../../api/user');

describe('TotalTrack Component', function() {
  var React       = require('react/addons');
  var user        = require('../../../api/user');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var TotalTracks = require(path);
  var Component;

  beforeEach(function() {
    user.getInfo.mockClear();
    Component = TestUtils.renderIntoDocument(<TotalTracks />);
  });

  describe('When data is requested', function() {
    it('Makes one correct request for the data', function() {
      expect(user.getInfo.mock.calls.length).toEqual(1);
    });

    it('Accepts a callback function', function() {
      expect(user.getInfo).toBeCalledWith(Component.setPlayCount);
    });
  });

  describe('When no data is returned', function() {
    beforeEach(function() {
      Component.setPlayCount(null);
    });

    it('Adds an error class to the container element', function() {
      var element = findByClass(Component, "TotalTracks--error");
      var errorMsg = findByClass(Component, "TotalTracks__error-msg");

      expect(element).toBeDefined();
      expect(errorMsg).toBeDefined();
    });

    it('Attempts to re-load itself', function() {
      expect(user.getInfo).toBeCalledWith(Component.setPlayCount);
      expect(user.getInfo.mock.calls.length > 1).toBeTruthy();
    });
  });

  describe('When the component is loading', function() {
    it('Displays a loading icon by default', function() {
      var spinner = findByClass(Component, "TotalTracks__spinner");

      expect(spinner).toBeDefined();
    });
  });

  describe('When data is retreived', function() {
    beforeEach(function() {
      Component.setState({
        loading: false,
        playCount: 10000
      });
    });

    it('Displays a formatted playcount', function() {
      var playcount = findByClass(Component, "TotalTracks__playcount");

      expect(playcount).toBeDefined();
      expect(playcount.getDOMNode().textContent).toBe('10,000');
    });

    it('Displays a label', function() {
      var label = findByClass(Component, "TotalTracks__label");

      expect(label.getDOMNode().textContent).toBe('Total Tracks');
    });
  });
});
