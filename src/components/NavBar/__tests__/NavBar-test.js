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

  describe('The NavBar menu button', function() {
    it('Displays a menu button', function() {
      var menuBtn = findByClass(Component, "NavBar__menu-btn");
      expect(menuBtn).toBeDefined();
    });
  });

  describe('The NavBar settings button', function() {
    it('Displays a settings button', function() {
      var settingsBtn = findByClass(Component, "NavBar__settings-btn");
      expect(settingsBtn).toBeDefined();
    });
  });
});
