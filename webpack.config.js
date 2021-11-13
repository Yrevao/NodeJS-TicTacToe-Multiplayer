const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './public/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'pack.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};
