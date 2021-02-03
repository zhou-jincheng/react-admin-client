import React, { Component } from 'react'
import { Card, Button, Icon, Table, Modal } from 'antd'

import LinkButton from '../../components/link-button'
import {reqCategoryList, reqModifyCategory, reqAddCategory} from '../../api'
import AddCategory from './components/AddCategory'
import ModifyCategory from './components/ModifyCategory'

export default class Catogory extends Component {
  
  state = {
    categoryList: [],
    subCategoryList: [],
    parentId: '0',
    /**
     * 状态为1，显示添加分类对话框
     * 状态为2，显示修改分类对话框
     */
    showStatus: 0,
    // 是否显示加载页面
    loading: false
  }

  //获取table的列展示
  getTabelColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
        render: text => <span>{text}</span>,
      },
      {
        title: '操作',
        width: '300px',
        render: (category) => (
          <span>
            <LinkButton onClick={() => this.showModifyDialog(category)}>修改分类</LinkButton>
            {
              this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null
            }
          </span>
        ),
      },
    ];
  }
  //根据parentId获取要展示的分类列表
  getCategoryList = async (parentId) => {
    this.setState({loading: true})
    parentId = parentId || this.state.parentId
    const result = await reqCategoryList(parentId)
    if(parentId === '0') {
      // 一级列表
      this.setState({
        categoryList: result.data,
        loading: false
      })
    }else {
      //二级列表
      this.setState({
        subCategoryList: result.data,
        loading: false
      })
    }
  }
  //展示子分类列表
  showSubCategorys = (category) => {
    this.category = category
    this.setState({
      parentId: category._id
    }, () => {
      this.getCategoryList()
    })
  }

  //回到一级分类列表
  Back = () => {
    this.setState({
      parentId: '0'
    })
  }

  // 更改对话框显示状态
  changeShowstatus = (status) => {
    this.setState({
      showStatus: status
    })
  }

  // 显示添加分类对话框
  showAddDialog = () => {
    this.changeShowstatus(1)
  }

  // 显示修改分类对话框
  showModifyDialog = (category) => {
    //保存要修改分类
    this.category = category
    this.changeShowstatus(2)
  }

  // 点击对话框取消按钮后触发此函数
  handleCancel = () => {
    this.changeShowstatus(0)
  }

  // 添加分类
  addCategory = () => {
    this.form.validateFields(async (err, values) => {
      if(err) return this.form.resetFields()
      const res = await reqAddCategory(values.parentId, values.categoryName)
      if(res.status === 0) {
        this.changeShowstatus(0)
        //添加的是当前分类才去重新获取分类列表
        if(values.parentId === this.state.parentId) {
          this.getCategoryList()
        }else if(values.parentId ==='0') {
          //在二级分类下添加一级分类,获取一级分类列表，但是界面仍停留在二级列表
          this.getCategoryList('0')
        }
        //重置所有组件
        this.form.resetFields()
      }
    })
  }

  // 修改分类
  modifyCategory = () => {
    this.form.validateFields(async(err, values) => {
      if(err) return
      const result = await reqModifyCategory(this.category._id, values.categoryName)
      if(result.status === 0) {
        this.changeShowstatus(0)
        this.getCategoryList()
        //重置所有组件
        this.form.resetFields()
      }
    })
  }


  componentWillMount() {
    this.getTabelColumns()
  }

  componentDidMount() {
    //获取分类列表
    this.getCategoryList()
  }

  render() {
    const {categoryList, loading, parentId, subCategoryList} = this.state

    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.Back}>一级分类列表</LinkButton>
        <Icon type="arrow-right" style={{marginRight: "5px"}}></Icon>
        <span>{this.category.name}</span>
      </span>
    )

    return (
      <Card
      title={title}
      extra={<Button type="primary" onClick={this.showAddDialog}><Icon type="plus" />添加</Button>}
      >
        <Table 
          dataSource={parentId === '0' ? categoryList : subCategoryList}
          columns={this.columns}
          bordered
          rowKey="_id"
          loading={loading}
          pagination={{
            pageSize: 5,
            showQuickJumper: true
          }}
        />
        <Modal
          title="添加分类"
          okText="添加"
          cancelText="取消"
          visible={this.state.showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddCategory
            setForm={form => this.form = form}
            categoryList={categoryList}
            parentId={parentId}
          />
        </Modal>
        <Modal
          title="修改分类"
          okText="添加"
          cancelText="取消"
          visible={this.state.showStatus === 2}
          onOk={this.modifyCategory}
          onCancel={this.handleCancel}
        >
          <ModifyCategory
            setForm={form => this.form = form}
          />
        </Modal>
      </Card>
    )
  }
}
