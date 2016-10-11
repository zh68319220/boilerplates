var webpack = require('webpack');
var path = require('path');

module.exports = {

  devServer: { //调试服务器配置
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './src',
    port: 8080
  },

  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, './src/js/main')
  ],

  output: {
    publicPath: 'http://0.0.0.0:8080/src/',
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
        loader: 'babel-loader?presets=es2015'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(css)$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(gif|jpg|png)\??.*$/,
        loader: 'url-loader?limit=8192' // inline base64 URLs for <=8k images, direct URLs for the rest
      },
      {
        test: /\.(woff|svg|eot|ttf)$/,
        loader: 'file-loader'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
