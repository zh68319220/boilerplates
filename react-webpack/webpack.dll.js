const webpack = require('webpack');
const path = require('path');

const vendors = [
	"react",
	"react-dom",
  'react-router'
];

module.exports = {
  output: {
    path: 'build/assets/js',
    filename: '[name].[hash].js',
    library: '[name]',
  },
  entry: {
    "vendor": vendors,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]',
      context: __dirname,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
          warnings: false,
      },
      output: {
        comments: false,  // remove all comments
      }
    })
  ]
};