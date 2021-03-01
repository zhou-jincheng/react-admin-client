import React, { Component } from 'react'
import {Form, Input} from 'antd'
import PropTypes from 'prop-types'

class AddForm extends Component {

  static propTypes = {
    setForm: PropTypes.func
  }

  componentWillMount() {
    this.formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 16
      },
    }
    // 通过属性方法，将form对象暴露出去
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form {...this.formItemLayout} >
        <Form.Item label="角色名称">
          {getFieldDecorator('roleName', {
            rules: [
              {
                required: true,
                message: '请输入角色名称',
              }
            ],
          })(<Input />)}
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(AddForm)
