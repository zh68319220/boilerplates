import React, {Component} from 'react';
import { Link } from 'react-router';
import './header.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Header extends Component {
  constructor(props) {
    super(props);
    this._items = <div className="header-mask">
                    <ul className="header-menu">
                      <li>
                        <Link to='/'>首页</Link>
                      </li>
                      <li>
                        <Link to='/a'>影片</Link>
                      </li>
                      <li>
                        <Link to='/b'>影院</Link>
                      </li>
                      <li>
                        <Link to='/c'>我的</Link>
                      </li>
                      <li>
                        <Link to='/d'>卖座卡查询</Link>
                      </li>
                    </ul>
                  </div>;
    this.state = {
      items: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }
	handleClick(e) {
    if( e.target.parentNode.className == "header-usr" 
      || e.target.className == "header-pos align-center" ){
      return;
    }
    if( this.state.items == '' ){
      this.setState({items: this._items});
    }else{
      this.setState({items: ''});
    }
	}
	render() {
    const menu = this.state.items;
		return(
			<div className="page-header" onClick={this.handleClick}>
        <div className="header">
          <Link className="header-menu-btn">
            <i className="icon icon-align-justify"></i>
          </Link>
          <Link className="header-title">XXX</Link>
          <Link to="/login" className="header-usr">
            <i className="icon icon-user"></i>
          </Link>
          <Link className="header-pos align-center">cq</Link>
          <ReactCSSTransitionGroup
            className="header-menu-container"
            transitionName="header-menu-ani"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}>
            {menu}
          </ReactCSSTransitionGroup>
        </div>
        <div className="fake-header"></div>
      </div>
		);
	}
}

export default Header;