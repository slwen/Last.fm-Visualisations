'use strict';

jest.autoMockOff();

describe('TotalTrack Component', function() {
  var React       = require('react/addons');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var TotalTracks = require('../');
  var Component;

  beforeEach(function() {
    Component = TestUtils.renderIntoDocument(<TotalTracks playCount="10000" />);
  });

  it('Displays a formatted playcount', function() {
    var playcount = findByClass(Component, "TotalTracks__playcount");

    expect(playcount).toBeDefined();
    expect(playcount.getDOMNode().textContent).toBe('10,000');
  });

  it('Displays a label', function() {
    var label = findByClass(Component, "TotalTracks__label");
    expect(label.getDOMNode().textContent).toBe('Tracks Played');
  });
});
