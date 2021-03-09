import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  message,
  Modal
} from 'antd'
import { connect } from 'react-redux'

import {reqRoleList, reqAddRole, reqUpdateRole} from '../../api'
import {PAGE_SIZE} from '../../utils/constant'
import {formatTime} from '../../utils/utils'
import {reomveUser} from '../../utils/storageUtils'
import {logout} from '../../redux/actions'


import AddForm from './AddForm'
import AuthorityForm from './AuthorityForm'

class Role extends Component {

  constructor(props) {
    super(props)
    this.authorityRef = React.createRef()
    this.state = {
      roleList: [],
      // 被选中的角色
      role: {},
      // 表格数据是否在加载中
      loading: false,
      // 控制添加角色对话框的显示和隐藏
      modalVisible: false,
      // 控制设置权限对话框显示和隐藏
      authorityModalVisible: false
    }
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
        render: formatTime
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formatTime
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
        const role = result.data
        this.setState((state) => ({
          roleList: [...state.roleList, role]
        }))
        this.form.resetFields()
      }else {
        message.error('添加角色失败')
      }
      this.setState({
        modalVisible: false,
      });
    }) 
  }

  // 设置角色权限
  setAuthority = async () => {
    const menus = this.authorityRef.current.getMenus()
    const { role } = this.state
    const { user } = this.props
    role.menus = menus
    role.auth_time = Date.now()
    role.auth_name = user.username
    const result = await reqUpdateRole(role)
    if (result.status === 0) {
      if (role._id === user.role._id) {
        this.props.logout()
        reomveUser()
        this.props.history.replace('/login')
        return message.success('当前角色权限已更改，请重新登陆')
      } else {
        this.setState({authorityModalVisible: false})
        return message.success('设置角色权限成功')
      }
    }
    return message.error('设置角色权限失败')
  }


  componentWillMount() {
    this.init()
  }

  componentDidMount() {
    this.getRoleList()
  }

  render() {
    const {roleList, role, loading, modalVisible, authorityModalVisible} = this.state
    const title = (
      <span>
        <Button 
          type="primary" 
          style={{marginRight: 15}} 
          onClick={() => this.setState({modalVisible: true})}>创建角色</Button>
        <Button 
          type="primary" 
          disabled={!role._id}
          onClick={() => this.setState({authorityModalVisible: true})}>设置角色权限</Button>
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
          <AddForm setForm={(form) => this.form = form} roles={roleList}/>
        </Modal>
        <Modal
          title="设置角色权限"
          visible={authorityModalVisible}
          onOk={this.setAuthority}
          onCancel={() => {
            this.setState({authorityModalVisible: false})
          }}
          okText="确定"
          cancelText="取消"
        >
          <AuthorityForm role={role} ref={this.authorityRef}/>
        </Modal>
      </Card>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  { logout }
)(Role)
