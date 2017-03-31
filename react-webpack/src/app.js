/**
 * 入口文件
 */
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Root from './routes.js';

ReactDom.render(
  (Root),
	document.getElementById("app")
);