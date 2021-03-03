import React, { Component } from 'react'
import {Form, Input, Tree} from 'antd'
import PropTypes from 'prop-types'

import menuList from '../../config/menuConfig'

const { TreeNode } = Tree

export default class AuthorityForm extends Component {

  static propTypes = {
    role: PropTypes.object
  }

  constructor(props) {
    super(props)
    const {menus} = props.role
    this.state = {
      menus
    }
  }

  // 获取所有权限节点
  getTreeNodes = (list) => {
     return (
      list.reduce((pre, current) => {
        pre.push(
          <TreeNode title={current.title} key={current.key}>
            {current.children ? this.getTreeNodes(current.children) : null}
          </TreeNode>
        )
        return pre
      },[])
    )
  }

  // 获取表格行排列样式
  getFormItemLayout = () => {
    this.formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 16
      },
    }
  }

  // 选中或取消树节点时调用此函数
  handleSelect = (selectedKeys) => this.setState({menus: selectedKeys})

  // 为父类提供获取选中权限的方法
  getMenus = () => this.state.menus

  componentWillMount() {
    this.getFormItemLayout()
    this.treeNodes = this.getTreeNodes(menuList)
  }

  componentWillReceiveProps(nextProps) {
    const {menus} = nextProps.role
    this.setState({menus})
  }

  render() {
    const {role} = this.props
    const {menus} = this.state
    return (
      <div>
        <Form.Item label="角色名称" {...this.formItemLayout}>
          <Input value={role.name} disabled/>
        </Form.Item>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={menus}
          onCheck={this.handleSelect}
        >
          <TreeNode title="平台权限" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </div>
    )
  }
}
