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

  beforeEach(function() {
    user.getInfo.mockClear();
    Component = TestUtils.renderIntoDocument(<TotalTime />);
  });

  describe('Collecting the users total playcount', function() {
    it('Makes one correct request for user info', function() {

    });

    it('Accepts a callback function', function() {

    });
  });

  describe('Collecting the users top 100 tracks', function() {
    it('Makes one correct request for user top tracks', function() {

    });

    it('Accepts a callback function', function() {

    });
  });

  describe('When no data is returned', function() {
    beforeEach(function() {
      Component.setPlayCount(null);
    });

    it('Adds an error class to the container element', function() {
      var element = findByClass(Component, "TotalTime--error");
      var errorMsg = findByClass(Component, "TotalTime__error-msg");

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
      var spinner = findByClass(Component, "TotalTime__spinner");

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

    it('Displays an icon', function() {
      var icon = findByClass(Component, "TotalTime__icon");

      expect(icon).toBeDefined();
      expect(icon.getDOMNode().tagName).toBe("IMG");
    });

    it('Displays a formatted playcount', function() {
      var playcount = findByClass(Component, "TotalTime__count");

      expect(playcount).toBeDefined();
      expect(playcount.getDOMNode().textContent).toBe('10,000');
    });

    it('Displays a label', function() {
      var label = findByClass(Component, "TotalTime__label");

      expect(label.getDOMNode().textContent).toBe('Total Tracks');
    });
  });
});
