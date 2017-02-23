'use strict';

var path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'main.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
}
