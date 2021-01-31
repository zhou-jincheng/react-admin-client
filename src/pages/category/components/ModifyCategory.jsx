import React, { Component } from 'react'
import { Form, Input } from 'antd'
import propTypes from 'prop-types'

class ModifyCategory extends Component {
  static propTypes = {
    setForm: propTypes.func.isRequired,
  }
  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form>
      <Form.Item>
          {getFieldDecorator('categoryName', {
            rules: [{ required: true, message: '分类名称不能为空！' }],
          })(
            <Input
              placeholder="请输入分类名称"
            />,
          )}
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(ModifyCategory)