import React, { Component } from 'react'
import { Form, Input, Select } from 'antd'
import propTypes from 'prop-types'

class AddCategory extends Component {
  static propTypes = {
    setForm: propTypes.func.isRequired,
    categoryList: propTypes.array,
    parentId: propTypes.string
  }

  static defaultProps = {
    categoryList: [],
    parentId: '0'
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const { Option } = Select
    const {categoryList, parentId} = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('parentId', {
            rules: [{ required: true, message: '请选择分类等级' }],
            initialValue: parentId
          })(
            <Select>
              <Option value="0">一级分类</Option>
              {categoryList.map(category => {
                return <Option value={category._id} key={category._id}>{category.name}</Option>
              })}
            </Select>
          )}
        </Form.Item>
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

export default Form.create()(AddCategory)
