var webpack = require('webpack');

module.exports = {
  entry: "./src/app.js",
  output: {
    path: "./build",
    filename: "bundle.js",
    publicPath: 'http://localhost:8090/assets'
  },
  module: {
    postLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "jshint-loader"
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version'
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.js$/,
        loader: "jsx-loader?insertPragma=React.DOM&harmony"
      },
      {
        test: /\.json$/, loader: "json"
      }
    ]
  },
  externals: {
    'react': 'React'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/) // Ignore extra languages for moment.js
  ]
};
