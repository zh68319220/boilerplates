'use strict';
let open = require("open");
let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let config = require('./webpack.config.js');

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
  console.log('Listening at 0.0.0.0:8080');
  open("http://0.0.0.0:8080/src/index.html", "chrome");
});
