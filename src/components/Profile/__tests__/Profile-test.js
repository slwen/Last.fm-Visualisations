"use strict";

var path = '../';

jest.autoMockOff();
jest.mock('../../../api/user');

describe('Profile Component', function() {
  var React       = require('react/addons');
  var user        = require('../../../api/user');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var Profile     = require(path);
  var Component;

  beforeEach(function() {
    user.getInfo.mockClear();
    Component = TestUtils.renderIntoDocument(<Profile />);
  });

  describe('When data is requested', function() {
    it('Makes one correct request for the data', function() {
      expect(user.getInfo.mock.calls.length).toEqual(1);
    });

    it('Accepts a callback function', function() {
      expect(user.getInfo).toBeCalledWith(Component.setProfileData);
    });
  });

  describe('When no data is returned', function() {
    beforeEach(function() {
      Component.setProfileData(null);
    });

    it('Adds an error class to the container element', function() {
      var element = findByClass(Component, "Profile--error");
      var errorMsg = findByClass(Component, "Profile__error-msg");

      expect(element).toBeDefined();
      expect(errorMsg).toBeDefined();
    });

    it('Attempts to re-load itself', function() {
      expect(user.getInfo).toBeCalledWith(Component.setProfileData);
      expect(user.getInfo.mock.calls.length > 1).toBeTruthy();
    });
  });

  describe('When the component is loading', function() {
    it('Displays a loading icon by default', function() {
      var spinner = findByClass(Component, "Profile__spinner");

      expect(spinner).toBeDefined();
    });
  });

  describe('When data is retreived', function() {
    var response = {
      name: "Michael Jackson",
      registered: { '#text': '2011-05-14 16:17' },
      image: [
        'http://placehold.it/10x10',
        'http://placehold.it/15x15',
        'http://placehold.it/20x20',
        'http://placehold.it/30x30',
        'http://placehold.it/40x40'
      ]
    };

    beforeEach(function() {
      Component.setState({
        loading: false,
        profileData: Component.formatProfileData(response)
      });
    });

    it('Displays an profile image', function() {
      var profileImg = findByClass(Component, "Profile__image");

      expect(profileImg).toBeDefined();
      expect(profileImg.getDOMNode().tagName).toBe("IMG");
    });

    it('Displays a formatted join date', function() {
      var joinDate = findByClass(Component, "Profile__joined");

      expect(joinDate).toBeDefined();
      expect(joinDate.getDOMNode().textContent).toBe("Joined May 14th, 2011");
    });

    it('Displays a profile name', function() {
      var label = findByClass(Component, "Profile__name");

      expect(label.getDOMNode().textContent).toBe("Michael Jackson");
    });
  });
});
