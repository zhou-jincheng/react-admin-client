import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux'

import './index.less'
import logo from '../../assets/images/logo.png'
import { login } from '../../redux/actions'
import { Redirect } from 'react-router-dom';

class Login extends Component {
  // 请求登陆
  handleSubmit = (event) => {
    event.preventDefault()
    const form = this.props.form
    form.validateFields(async (err, values) => {
      if(err) return
      const {username, password} = values
      this.props.login(username, password)
      
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const user = this.props.user
    if (user && user._id) {
      return <Redirect to="/home" />
    }
    return (
      <div className="login-wrapper">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login-content">
          <div className={ user.msg ? "error-msg show": "error-msg" } >{user.msg}</div>
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {
                getFieldDecorator('username',{
                  rules: [
                    { required: true, message: '用户名不能为空！' },
                    { min: 4, message: '用户名长度必须大于3位' },
                    { max: 12, message: '用户名长度必须小于13位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名由英文、数字或下划线组成' },
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              },
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [
                    { required: true, message: '密码不能为空！' },
                    { min: 4, message: '密码长度必须大于3位' },
                    { max: 12, message: '密码长度必须小于13位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '密码由英文、数字或下划线组成' },
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              },
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {login}
)(Form.create()(Login))