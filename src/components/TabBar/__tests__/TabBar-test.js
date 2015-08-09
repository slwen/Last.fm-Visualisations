"use strict";

var path = '../';

jest.autoMockOff();

describe('TabBar component', function() {
  var React       = require('react/addons');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
  var mockRouter  = require('../../../../test/helpers/mockRouter');
  var TabBar      = require(path);
  var Subject;
  var Component;

  var mockData = [
    { name: "Tab1", icon: "foo", link: "test.com" },
    { name: "Tab2", icon: "bar", link: "somewhere.net" }
  ];

  beforeEach(function() {
    Subject = mockRouter(TabBar, { menuItems: mockData });
    Component = TestUtils.renderIntoDocument(<Subject />);
  });

  it('renders a tab bar container element', function() {
    var container = findByClass(Component, "TabBar");
    expect(container).toBeDefined();
  });

  it('renders tab bar menu items', function() {
    var tabs = scryByClass(Component, "TabBarButton");
    expect(tabs.length).toBe(2);
  });
});
