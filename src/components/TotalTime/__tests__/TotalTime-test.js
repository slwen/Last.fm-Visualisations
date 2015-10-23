'use strict';

jest.autoMockOff();

describe('TotalTime Component', function() {
  var React = require('react/addons');
  var TotalTime = require('../');
  var TestUtils = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var mockTopTracks = [
    { playcount: 100, duration: 500 },
    { playcount: 50, duration: 600 },
    { playcount: 80, duration: 200 }
  ];
  var Component;

  describe('Calculating total hours of playtime, based on a weighted average track length', function() {
    beforeEach(function() {
      Component = TestUtils.renderIntoDocument(
        <TotalTime playCount={ '100' } topTracks={ mockTopTracks } />
      );
    });

    it('Can calculate a weighted duration for each track', function() {
      expect(Component.calculateWeightedDuration(100, 300, 175)).toEqual(171.42857142857142);
    });

    it('Adds the weighted duration of each track together', function() {
      expect(Component.calculateAverageDuration(Component.props.topTracks)).toEqual(417.3913043478261);
    });

    it('Displays a formatted number of hours', function() {
      var hours = findByClass(Component, "TotalTime__hours");
      expect(hours).toBeDefined();
      expect(hours.getDOMNode().textContent).toBe('12');
    });

    it('Displays a label', function() {
      var label = findByClass(Component, "TotalTime__label");
      expect(label.getDOMNode().textContent).toBe('Hours Spent');
    });
  });
});
