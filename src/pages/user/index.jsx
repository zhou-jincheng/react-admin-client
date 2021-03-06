import React, { Component } from 'react'
import { Card, Button, Table, message, Modal } from 'antd'
import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from '../../utils/constant'
import { formatTime } from '../../utils/utils'
import { reqUserList, reqAddUser, reqUpdateUser, reqDeleteUserById } from '../../api'
import AddOrUpdateForm from './components/AddOrUpdateForm'

const { confirm } = Modal
export default class User extends Component {

  state = {
    userList: [],
    roleList: [],
    showModal: false, // 控制添加/修改用户对话框的显示和隐藏
  }

  init = () => {
    this.initTitle()
    this.initColumns()
  }

  initTitle = () => {
    this.title = (
      <Button type="primary" onClick={this.addClick}>创建用户</Button>
    )
  }

  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formatTime
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: this.getRoleNameById
      },
      {
        title: '操作',
        render: user => (
          <span>
            <LinkButton onClick={() => this.updateClick(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </span>
        )
      },
    ]
  }

  getUserList = async () => {
    const result = await reqUserList()
    if (result.status === 0) {
      const userList = result.data.users
      const roleList = result.data.roles
      this.setState({
        userList,
        roleList
      })
    } else {
      message.error('获取用户列表失败')
    }
  }

  // 根据角色Id返回角色名称
  getRoleNameById = (role_id) => {
    const role = this.state.roleList.find(role => role._id === role_id)
    return (role && role.name) || ''
  }

  addOrUpdateUser = () => {
    this.form.validateFields((errors, value) => {
      if(errors) return
      if (!this.isUpdate) {
        this.addUser(value)
      } else {
        this.updateUser(value)
      }
    })
  }

  addUser = async user => {
    const result = await reqAddUser(user)
    if (result.status === 0) {
      message.success('添加用户成功')
      this.setState(state => ({
        userList: [...state.userList, result.data],
        showModal: false
      }))
      this.form.resetFields()
    } else {
      message.error('添加用户失败')
    }
  }

  addClick = () => {
    this.isUpdate = false
    this.setState({showModal: true})
  }

  updateClick = user => {
    this.isUpdate = true
    this.user = user // 保存要修改的用户信息
    this.setState({showModal: true})
  }

  cancelClick = () => {
    this.setState({showModal: false},() => {
      this.user = {}
    })
    this.form.resetFields()
  }

  updateUser = async user => {
    user = {
      ...user,
      _id: this.user._id
    }
    const result = await reqUpdateUser(user)
    if (result.status === 0) {
      message.success('修改用户成功')
      let userList = [...this.state.userList]
      const index = userList.findIndex(user => user._id === result.data._id)
      userList.splice(index, 1, result.data)
      this.setState({
        userList,
        showModal: false
      }, () => {
        this.user = {}
      })
      this.form.resetFields()
    } else {
      message.error('修改用户失败')
    }
  }

  deleteUser = user => {
    confirm({
      title: `确认删除${user.username}吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const result = await reqDeleteUserById(user._id)
        if(result.status === 0) {
          let userList = [...this.state.userList]
          const index = userList.findIndex(item => user._id === item._id)
          userList.splice(index, 1)
          this.setState({userList})
          message.success('删除成功')
        } else {
          message.error('删除失败')
        }
      },
      onCancel() {
        message.info('取消成功')
      }
    })
  }

  componentWillMount() {
    this.init()
  }

  componentDidMount() {
    this.getUserList()
  }

  render() {
    const { userList, showModal, roleList } = this.state
    return (
      <>
        <Card title={this.title}>
          <Table 
            dataSource={userList} 
            columns={this.columns} 
            bordered
            pagination={{
              pageSize: PAGE_SIZE
            }}
            rowKey="_id"
          />
        </Card>
        <Modal
        title={this.isUpdate ? "修改用户" : "添加用户"}
        visible={showModal}
        onOk={this.addOrUpdateUser}
        onCancel={this.cancelClick}
        okText="确认"
        cancelText="取消"
        >
          <AddOrUpdateForm 
            roleList={roleList} 
            setForm={form => this.form = form}
            user={this.user}
          />
        </Modal>
      </>
    )
  }
}
