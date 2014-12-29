"use strict";

require("./style.scss");
var React = require('react');

module.exports = React.createClass({
  displayName: 'HelloReact',

  render: function() {
    return (
      <div>
        <p className="greeting">
          Hello there reactorz!!!1
        </p>
      </div>
    );
  }
});
