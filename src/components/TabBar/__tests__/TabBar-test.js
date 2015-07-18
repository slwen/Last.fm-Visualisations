"use strict";

var path = '../';

jest.autoMockOff();

describe('TabBar Component', function() {
  var React       = require('react/addons');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
  var TabBar      = require(path);
  var Component;

  var mockData = [
    { name: "Tab1", icon: "foo", link: "test.com" },
    { name: "Tab2", icon: "bar", link: "somewhere.net" }
  ];

  beforeEach(function() {
    Component = TestUtils.renderIntoDocument(<TabBar menuItems={ mockData } />);
  });

  it('Renders a tab bar container element', function() {
    var container = findByClass(Component, "TabBar");
    expect(container).toBeDefined();
  });

  it('Renders tab bar menu items', function() {
    var tabs = scryByClass(Component, "TabBarButton");
    expect(tabs.length).toBe(2);
  });
});
