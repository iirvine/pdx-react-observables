var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval',
  entry: './src/main.jsx',

  output: {
    path: 'dist',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']  
  },

  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader?stage=0&optional=runtime', exclude: /node_modules/},
      {test: /\.jsx$/, loader: 'babel-loader?stage=0&optional=runtime'},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
      {test: /\.png$/, loader: 'url-loader'}
    ]
  }
};