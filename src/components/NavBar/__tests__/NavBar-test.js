"use strict";

var path = '../';

jest.autoMockOff();

describe('NavBar Component', function() {
  var React       = require('react/addons');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var NavBar      = require(path);
  var Component;

  beforeEach(function() {
    Component = TestUtils.renderIntoDocument(<NavBar />);
  });

  describe('The NavBar title area', function() {
    it('Displays a title for the current app page', function() {
      var title = findByClass(Component, "NavBar__title");
      expect(title).toBeDefined();
    });
  });
});
