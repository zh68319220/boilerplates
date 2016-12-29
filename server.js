'use strict';
let open = require("open");
let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let config = require('./webpack.config.js');
let ip = '10.2.24.49';
let port = 3000;

//启动服务
let server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: false,
  noInfo: false,
  historyApiFallback: true,
  stats: { colors: true }
}).listen(port, ip, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at http://'+ip+':'+port);
  open("http://"+ip+":"+port+"/src/index.html", "chrome");
});
