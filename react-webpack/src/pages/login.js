import React, {Component} from 'react';
import Login from '../components/login/login.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class LoginPage extends Component {
  render() {
    return(
      <ReactCSSTransitionGroup
        component="div"
        className="page-content"
        transitionName="page-ani"
        transitionAppear={true}
        transitionAppearTimeout={500}>
        <Login/>
      </ReactCSSTransitionGroup>
    );
  }
}

export default LoginPage;