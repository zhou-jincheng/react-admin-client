import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  message,
  Modal
} from 'antd'
import {reqRoleList} from '../../api'
import {PAGE_SIZE} from '../../utils/constant'

import AddForm from './AddForm'
import {reqAddRole} from '../../api'

export default class Role extends Component {

  state = {
    roleList: [],
    // 被选中的角色
    role: {},
    // 表格数据是否在加载中
    loading: false,
    // 控制添加角色对话框的显示和隐藏
    modalVisible: false
  }

  //页面初始化
  init = () => {
    this.getTableColumns()
  }

  // 获取表格列columns定义
  getTableColumns = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
      },
    ]
  }

  // 获取角色列表
  getRoleList = async () => {
    this.setState({loading: true})
    const result = await reqRoleList()
    this.setState({loading: false})
    if(result.status === 0) {
      this.setState({roleList: result.data})
    }else {
      message.error('获取角色列表失败')
    }
  }

  
  // 选中角色的回调函数
  handleSelect = (record) => {
    this.setState({role: record})
  }

  addRole = () => {
    this.form.validateFields( async (errors, value) => {
      if(errors) return
      const result = await reqAddRole(value.roleName)
      if(result.status === 0) {
        message.success('添加角色成功')
        this.getRoleList()
      }else {
        message.error('添加角色失败')
      }
      this.setState({
        modalVisible: false,
      });
    }) 
  }


  componentWillMount() {
    this.init()
  }

  componentDidMount() {
    this.getRoleList()
  }

  render() {
    const {roleList, role, loading, modalVisible} = this.state

    const title = (
      <span>
        <Button 
          type="primary" 
          style={{marginRight: 15}} 
          onClick={() => this.setState({modalVisible: true})}>创建角色</Button>
        <Button type="primary" disabled={!role._id}>设置角色权限</Button>
      </span>
    )
    return (
      <Card title={title}>
        <Table 
          columns={this.columns} 
          dataSource={roleList} 
          rowKey="_id"
          bordered
          loading={loading}
          pagination={{
            pageSize: PAGE_SIZE
          }}
          rowSelection={{
            type: 'radio',
            onSelect: this.handleSelect
          }}
        />
        <Modal
          title="添加角色"
          visible={modalVisible}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({modalVisible: false})
            this.form.resetFields()
          }}
          okText="确定"
          cancelText="取消"
        >
          <AddForm setForm={(form) => this.form = form}/>
        </Modal>
      </Card>
    )
  }
}
