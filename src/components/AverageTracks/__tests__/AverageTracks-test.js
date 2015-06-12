"use strict";

var path = '../';

jest.autoMockOff();
jest.mock('../../../api/user');

describe('AverageTracks Component', function() {
  var React         = require('react/addons');
  var user          = require('../../../api/user');
  var TestUtils     = React.addons.TestUtils;
  var findByClass   = TestUtils.findRenderedDOMComponentWithClass;
  var AverageTracks = require(path);
  var Component;

  beforeEach(function() {
    user.getInfo.mockClear();
    Component = TestUtils.renderIntoDocument(<AverageTracks />);
  });

  describe('When data is requested', function() {
    it('Makes one correct request for the data', function() {
      expect(user.getInfo.mock.calls.length).toEqual(1);
    });

    it('Accepts a callback function', function() {
      expect(user.getInfo).toBeCalledWith(Component.setUserData);
    });
  });

  describe('When no data is returned', function() {
    beforeEach(function() {
      Component.setUserData(null);
    });

    it('Adds an error class to the container element', function() {
      var element = findByClass(Component, "AverageTracks--error");
      var errorMsg = findByClass(Component, "AverageTracks__error-msg");

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
      var spinner = findByClass(Component, "AverageTracks__spinner");
      expect(spinner).toBeDefined();
    });
  });

  describe('When data is retreived', function() {
    beforeEach(function() {
      Component.setState({
        loading: false,
        average: 10.5
      });
    });

    it('Displays a formatted daily average count', function() {
      var count = findByClass(Component, "AverageTracks__count");

      expect(count).toBeDefined();
      expect(count.getDOMNode().textContent).toBe('10.5');
    });

    it('Displays a label', function() {
      var label = findByClass(Component, "AverageTracks__label");
      expect(label.getDOMNode().textContent).toBe('Avg. Tracks/Day');
    });
  });
});
