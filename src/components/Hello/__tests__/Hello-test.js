"use strict";

var path = '../';

jest.dontMock(path);

describe('The greeting', function() {
  var React       = require('react/addons');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;

  var Hello       = require(path);
  var Component   = TestUtils.renderIntoDocument(<Hello />);
  var element     = findByClass(Component, "greeting");

  it('Displays a greeting on the page', function() {
    expect(element).toBeDefined();
  });
});
