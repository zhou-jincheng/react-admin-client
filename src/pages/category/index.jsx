import React, { Component } from 'react'
import { Card, Button, Icon, Table } from 'antd'

import LinkButton from '../../components/link-button'
import {reqCategoryList} from '../../api'

export default class Catogory extends Component {
  
  state = {
    categoryList: [],
    parentId: 0,
  }

  //获取table的列展示
  getTabelColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '操作',
        width: '300px',
        render: (category) => (
          <span>
            <LinkButton>修改分类</LinkButton>
            {
              this.state.parentId === 0 ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null
            }
          </span>
        ),
      },
    ];
  }
  //根据parentId获取要展示的分类列表
  getCategoryList = async () => {
    const result = await reqCategoryList(this.state.parentId)
    this.setState({
      categoryList: result.data
    })
  }
  //展示子分类列表
  showSubCategorys = (category) => {
    this.setState({
      parentId: category._id
    }, () => {
      this.getCategoryList()
      this.title = (
        <span>
          <LinkButton onClick={this.Back}>一级分类列表</LinkButton>
          <Icon type="arrow-right" style={{marginRight: "5px"}}></Icon>
          <span>{category.name}</span>
        </span>
      )
    })
  }

  //回到一级分类列表
  Back = () => {
    this.setState({
      parentId: 0
    }, () => {
      this.getCategoryList()
      this.title = '一级分类列表'
    })
  }

  componentWillMount() {
    this.title = "一级分类列表"
    this.getTabelColumns()
  }

  componentDidMount() {
    //获取分类列表
    this.getCategoryList()
  }

  render() {
    const {categoryList} = this.state
    
    return (
      <Card
      title={this.title}
      extra={<Button type="primary"><Icon type="plus" />添加</Button>}
      >
        <Table 
          dataSource={categoryList}
          columns={this.columns}
          bordered
          pagination={{
            pageSize: 5,
            showQuickJumper: true
          }}
        />;
      </Card>
    )
  }
}
