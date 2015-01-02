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

    it('Displays an icon', function() {
      var icon = findByClass(Component, "TotalAlbums__icon");

      expect(icon).toBeDefined();
      expect(icon.getDOMNode().tagName).toBe("IMG");
    });

    it('Displays a formatted TotalAlbums', function() {
      var TotalAlbums = findByClass(Component, "TotalAlbums__total");

      expect(TotalAlbums).toBeDefined();
      expect(TotalAlbums.getDOMNode().textContent).toBe('10,000');
    });

    it('Displays a label', function() {
      var label = findByClass(Component, "TotalAlbums__label");

      expect(label.getDOMNode().textContent).toBe('Total Albums');
    });
  });
});
