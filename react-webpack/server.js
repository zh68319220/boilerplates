/**
 * Created by yufengzhang210851 on 2016-08-19.
 * webpack dev server
 */
'use strict';
let open = require("open");
let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let config = require('./webpack.config.js');
let addr = require("./address.js");

//启动服务
let server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: false,
  noInfo: false,
  historyApiFallback: true,
  stats: { colors: true }
}).listen(addr.port, addr.addr, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at '+addr.addr+':8080');
  open("http://"+addr.addr+":"+addr.port+"/src/index.html", "chrome");
});