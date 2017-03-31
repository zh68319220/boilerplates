/**
 * 路由  
 */
import React, {Component} from 'react';
import { Router, Route, IndexRoute, hashHistory, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history'
import './scss/base.scss';
import './scss/font.scss';
import './scss/page.scss';

// 组件
import Header from './components/header/header.js';
import Main from './pages/main.js';
import Login from './pages/login.js';
import Detail from './pages/detail.js';

// queryKey 去掉路由后随机 _k 参数
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

class Root extends Component{
	render() {
		return (
      <div className="page">
        <Header/>
        {this.props.children}
      </div>
    )
	}
}

const RouteConfig = (
	<Router history={appHistory}>
		<Route name="Root" path="/" component={Root}>
			<IndexRoute component={Main}/>
    </Route>
    <Route name="login" path="login" component={Root}>
      <IndexRoute component={Login}/>
    </Route>
    <Route name="detail" path="detail/:id" component={Root}>
      <IndexRoute component={Detail}/>
    </Route>
	</Router>
);

export default RouteConfig;