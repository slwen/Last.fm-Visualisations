"use strict";

var path = '../';

jest.autoMockOff();

describe('TabBarButton Component', function() {
  var React        = require('react/addons');
  var TestUtils    = React.addons.TestUtils;
  var findByClass  = TestUtils.findRenderedDOMComponentWithClass;
  var scryByTag    = TestUtils.scryRenderedDOMComponentsWithTag;
  var TabBarButton = require(path);
  var Component;

  beforeEach(function() {
    Component = TestUtils.renderIntoDocument(<TabBarButton name="foo" icon="bar" link="baz" />);
  });

  describe('The elements that make up a TabBarButton', function() {
    it('Has a container element', function() {
      var container = findByClass(Component, "TabBarButton");
      expect(container).toBeDefined();
    });

    it('Displays an icon', function() {
      var iconContainer = findByClass(Component, "TabBarButton__icon");
      var iconImage = scryByTag(Component, "img");
      expect(iconContainer).toBeDefined();
      expect(iconImage.length).toBe(1);
      expect(iconImage[0].getDOMNode().getAttribute('src')).toEqual('bar');
    });

    it('Displays a label', function() {
      var label = findByClass(Component, "TabBarButton__label");
      expect(label).toBeDefined();
      expect(label.getDOMNode().textContent).toBe('foo');
    });
  });
});
