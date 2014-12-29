module.exports = {
  entry: "./src/app.js",
  output: {
    path: __dirname,
    filename: "bundle.js",
    publicPath: 'http://localhost:8090/assets'
  },
  module: {
    loaders: [
      { test: /\.scss$/, loader: "style!css!sass" },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.js$/, loader: "jsx-loader?insertPragma=React.DOM&harmony" }
    ]
  },
  externals: {
    'react': 'React'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
