var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    new FriendlyErrorsPlugin()
  ]
})

var pages = merge(
  utils.getMultiEntry('./src/views/**/**/*.html')
)

for (var pathname in pages) {
  var template = pages[pathname]
  var pathname2 = template.split('views/').length > 1 ? template.split('views/')[1] : template
  var conf = {
    filename: pathname2,
    template: template, // 模板路径
    chunks: ['views/' + pathname.split('/index')[0], 'vendors', 'manifest'], // 每个html引用的js模块
    inject: true              // js插入位置
  }
  module.exports.plugins.push(new HtmlWebpackPlugin(conf))
}
