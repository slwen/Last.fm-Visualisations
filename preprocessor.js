var babelJest = require("babel-jest");

module.exports = {
  process: function(src, filename) {
    if (filename.match(/.svg$/) || filename.match(/.scss$/)) {
      return '';
    } else {
      return babelJest.process(src, filename);
    }
  }
};
