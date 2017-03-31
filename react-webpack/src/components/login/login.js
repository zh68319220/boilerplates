import React, {Component} from 'react';
import './login.scss';

class Login extends Component {
	handleSubmit(e) {
		e.preventDefault();
		
	}
  render() {
    return(
      <div>
        <div className="content">
          <form className="form-control" onSubmit={this.handleSubmit} className="loginform">
          <div className="form-group">
          <input
            name="username"
            type="text"
            className="login-input form-control"
            placeholder="输入手机号/邮箱"
          />
          <span className="login-border"></span>
          </div>
          <div className="form-group">
          <input
            name="password"
            type="password"
            className="login-input form-control"
            placeholder="输入密码/验证码"
          />
          <span className="login-border"></span>
          </div>
          <input type="submit" value="登录" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;