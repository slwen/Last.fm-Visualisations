module.exports = {
  entry: "./src/app.js",
  output: {
    path: "./build",
    filename: "bundle.js",
    publicPath: 'http://localhost:8090/assets'
  },
  module: {
    loaders: [
      { test: /\.scss$/, loader: "style!css!sass" },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
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
