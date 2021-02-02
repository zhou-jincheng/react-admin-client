import React, { Component } from 'react'
import {
  Card,
  Select,
  Input,
  Icon,
  Button,
  Table
} from 'antd'
import LinkButton from '../../components/link-button'
import {reqProductList} from '../../api'
import {PAGE_SIZE} from '../../utils/constant'

const Option = Select.Option
export default class ProductHome extends Component {
  state = {
    productList: [],
    total: 0,
    loading: false
  }

  getProductList = async (pageNum = 1, pageSize = 3) => {
    this.setState({loading: true})
    const res = await reqProductList(pageNum, pageSize)
    this.setState({loading: false})
    if(res.status === 0) {
      this.setState({
        productList: res.data.list,
        total: res.data.total
      })
    }
  }

    init = () => {
      this.title = (
        <span>
          <Select value="0">
            <Option value="0">按名称搜索</Option>
            <Option value="1">按描述搜索</Option>
          </Select>
          <Input placeholder="关键字" style={{width: 150, margin: '0 15px'}}/>
          <Button type="primary">搜索</Button>
        </span>
      )
      this.extra = (
        <Button type="primary">
          <Icon type="plus" />
          <span>添加商品</span>
        </Button>
      )
      //表格列格式
      this.columns = [
        {
          title: '商品名称',
          dataIndex: 'name',
          width: 180,
        },
        {
          title: '商品描述',
          dataIndex: 'desc',
        },
        {
          title: '价格',
          dataIndex: 'price',
          width: 90,
          render: price => `￥${price}`,
        },
        {
          title: '状态',
          dataIndex: 'status',
          width: 100,
          render: status => (
            status === 1 ? <div><Button type="primary">上架</Button>已下架</div> : <div><Button type="primary">下架</Button>在售</div> 
          ),
        },
        {
          title: '操作',
          width: 100,
          render: product => (
            <div>
              <LinkButton>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </div>
          ),
        },
      ];

    }

  componentWillMount() {
    this.init()
  }

  componentDidMount() {
    this.getProductList(1, PAGE_SIZE)
  }

  render() {
    
    
    const {productList, total, loading} = this.state
    

    return (
      <Card title={this.title} extra={this.extra}>
        <Table 
          columns={this.columns} 
          dataSource={productList}
          bordered
          loading={loading}
          pagination={{
            pageSize: PAGE_SIZE,
            total,
            showQuickJumper: true,
            onChange: this.getProductList,
          }}
        />
      </Card>
    )
  }
}
