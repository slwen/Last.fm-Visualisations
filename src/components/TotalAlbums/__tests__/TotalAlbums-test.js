"use strict";

var path = '../';

jest.autoMockOff();
jest.mock('../../../api/user');

describe('TotalTrack Component', function() {
  var React       = require('react/addons');
  var user        = require('../../../api/user');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var TotalAlbums = require(path);
  var Component;

  beforeEach(function() {
    user.getTopAlbums.mockClear();
    Component = TestUtils.renderIntoDocument(<TotalAlbums />);
  });

  describe('When data is requested', function() {
    it('Makes one correct request for the data', function() {
      expect(user.getTopAlbums.mock.calls.length).toEqual(1);
    });

    it('Accepts a callback function', function() {
      expect(user.getTopAlbums).toBeCalledWith(1, Component.setTotalAlbums);
    });
  });

  describe('When no data is returned', function() {
    beforeEach(function() {
      Component.setTotalAlbums(null);
    });

    it('Adds an error class to the container element', function() {
      var element = findByClass(Component, "TotalAlbums--error");
      var errorMsg = findByClass(Component, "TotalAlbums__error-msg");

      expect(element).toBeDefined();
      expect(errorMsg).toBeDefined();
    });

    it('Attempts to re-load itself', function() {
      expect(user.getTopAlbums).toBeCalledWith(1, Component.setTotalAlbums);
      expect(user.getTopAlbums.mock.calls.length > 1).toBeTruthy();
    });
  });

  describe('When the component is loading', function() {
    it('Displays a loading icon by default', function() {
      var spinner = findByClass(Component, "TotalAlbums__spinner");
      expect(spinner).toBeDefined();
    });
  });

  describe('When data is retreived', function() {
    beforeEach(function() {
      Component.setState({
        loading: false,
        totalAlbums: 10000
      });
    });

    it('Displays a formatted TotalAlbums', function() {
      var TotalAlbums = findByClass(Component, "TotalAlbums__total");
      expect(TotalAlbums).toBeDefined();
      expect(TotalAlbums.getDOMNode().textContent).toBe('10,000');
    });

    it('Displays a label', function() {
      var label = findByClass(Component, "TotalAlbums__label");
      expect(label.getDOMNode().textContent).toBe('Albums Played');
    });
  });
});
