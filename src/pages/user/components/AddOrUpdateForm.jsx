import React, { PureComponent } from 'react'
import { Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'

const { Option } = Select
class AddOrUpdateForm extends PureComponent {
  static propTypes = {
    setForm: PropTypes.func,
    roleList: PropTypes.array
  }

  initItemLayout = () => {
    this.formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 18
      }
    }
  }

  // 对手机号码格式进行校验
  validatePhone = (rule, value, callback) => {
    if (value && Number.isNaN(value*1)) {
      callback('请输入格式正确的手机号码')
    } else {
      callback()
    }
  }

  componentWillMount() {
    this.initItemLayout()
    const { setForm, form } = this.props
    if(setForm) setForm(form)
  }

  render() {
    const { roleList=[], user={} } = this.props
    const { getFieldDecorator } =  this.props.form
    return (
      <Form {...this.formItemLayout}>
        <Form.Item label="用户名">
          {getFieldDecorator('username', {
            initialValue: user.username,
            rules: [
              {
                required: true,
                message: '用户名不能为空',
              }
            ]
          })(<Input placeholder="请输入用户名" />)}
        </Form.Item>
        {
          user.password
          ? null
          : (
              <Form.Item label="密码">
                {getFieldDecorator('password', {
                  initialValue: user.password,
                  rules: [
                    {
                      required: true,
                      message: '密码不能为空',
                    }
                  ]
                })(<Input.Password placeholder="请输入密码" />)}
              </Form.Item>
            )
        }
        <Form.Item label="手机号">
          {getFieldDecorator('phone', {
            initialValue: user.phone,
            rules: [
              {
                validator: this.validatePhone
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="邮箱">
          {getFieldDecorator('email', {
            initialValue: user.email,
          })(<Input />)}
        </Form.Item>
        <Form.Item label="角色">
          {getFieldDecorator('role_id', {
            initialValue: user.role_id,
          })(
            <Select>
              {
                roleList.map(role => <Option value={role._id} key={role._id}>{role.name}</Option>)
              }
            </Select>
          )}
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(AddOrUpdateForm)
