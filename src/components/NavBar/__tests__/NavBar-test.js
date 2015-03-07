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

    });
  });

  describe('The NavBar menu button', function() {
    it('Displays a menu button', function() {

    });
  });

  describe('The NavBar settings button', function() {
    it('Displays a settings button', function() {

    });
  });
});
