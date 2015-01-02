"use strict";

var path = '../';

jest.dontMock(path);

describe('TotalTrack Component', function() {
  var React       = require('react/addons');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var TotalTracks = require(path);
  var Component;

  beforeEach(function() {
    Component = TestUtils.renderIntoDocument(<TotalTracks />);
  });

  describe('When data is requested', function() {
    it('Requests from the correct API endpoint', function() {
      // Check correct endpoint is used
    });

    it('Makes just one request for the data', function() {
      // Check correct endpoint is used
    });
  });

  describe('When the component is loading', function() {
    // Manually set state to loading...

    it('Displays a loading icon', function() {
      // Check DOM for loading icon
    });
  });

  describe('When data is retreived', function() {
    // Set up a dummy response

    it('Displays an icon', function() {
      var icon = findByClass(Component, "TotalTracks__icon");

      expect(icon).toBeDefined();
      expect(icon.getDOMNode().tagName).toBe("IMG");
    });

    it('Displays a total amount of tracks', function() {
      // Check DOM for correct amount of tracks displayed
    });

    it('Formats the total tracks', function() {
      // Set up some more test data for multiple scenarios

      // Expect large numbers to be comma separated
    });

    it('Displays a label', function() {
      // Check DOM for label
    });
  });
});
