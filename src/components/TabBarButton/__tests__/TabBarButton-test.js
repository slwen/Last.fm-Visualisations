"use strict";

var path = '../';

jest.autoMockOff();

describe('TabBarButton Component', function() {
  var React        = require('react/addons');
  var TestUtils    = React.addons.TestUtils;
  var findByClass  = TestUtils.findRenderedDOMComponentWithClass;
  var scryByTag    = TestUtils.scryRenderedDOMComponentsWithTag;
  var mockRouter   = require('../../../../test/helpers/mockRouter');
  var TabBarButton = require(path);
  var Subject;
  var Component;


  beforeEach(function() {
    Subject = mockRouter(TabBarButton, { name: "foo", icon: "bar", link: "baz" });
    Component = TestUtils.renderIntoDocument(<Subject />);
  });

  describe('The elements that make up a TabBarButton', function() {
    it('has a container element', function() {
      var container = findByClass(Component, "TabBarButton");
      expect(container).toBeDefined();
      expect(container.getDOMNode().tagName).toBe('A');
      expect(container.getDOMNode().getAttribute('href')).toBeDefined();
    });

    it('displays an icon', function() {
      var iconContainer = findByClass(Component, "TabBarButton__icon");
      var iconImage = scryByTag(Component, "img");
      expect(iconContainer).toBeDefined();
      expect(iconImage.length).toBe(1);
      expect(iconImage[0].getDOMNode().getAttribute('src')).toEqual('bar');
    });

    it('displays a label', function() {
      var label = findByClass(Component, "TabBarButton__label");
      expect(label).toBeDefined();
      expect(label.getDOMNode().textContent).toBe('foo');
    });
  });
});
