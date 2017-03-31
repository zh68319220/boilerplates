var webpack = require('webpack');
var path = require('path');
var addr = require("./address.js");

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './src',
    port: addr.port
  },

  entry: [
    'webpack-dev-server/client?http://'+addr.addr+':'+addr.port,//资源服务器地址
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, './src/app.js')
  ],

  output: {
    publicPath: 'http://'+addr.addr+':'+addr.port+'/src/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, './src')
  },

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets=es2015!babel-loader?presets=react'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(gif|jpg|png)\??.*$/,
        loader: 'url-loader?limit=8192&name=assets/images/[hash:8].[name].[ext]'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};