"use strict";

var path = '../';

jest.autoMockOff();

describe('Overview Component', function() {
  var React       = require('react/addons');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var Overview    = require(path);
  var Component;

  beforeEach(function() {
    Component = TestUtils.renderIntoDocument(<Overview />);
  });

  describe('The Overview title area', function() {
    it('Displays a title and subtitle for the overview section', function() {
      var title = findByClass(Component, "Overview__title");
      var subtitle = findByClass(Component, "Overview__subtitle");

      expect(title).toBeDefined();
      expect(subtitle).toBeDefined();
    });
  });

  describe('The Overview tiles', function() {
    it('Contains four tiles, including: total tracks, avg. tracks, total albums, total hours.', function() {

    });
  });
});
