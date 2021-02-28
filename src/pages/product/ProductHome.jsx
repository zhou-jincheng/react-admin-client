import React, { Component } from 'react'
import {
  Card,
  Select,
  Input,
  Icon,
  Button,
  Table,
  message
} from 'antd'
import LinkButton from '../../components/link-button'
import {reqProductList, reqProductsByKeywords, reqUpdateProductStatus} from '../../api'
import {PAGE_SIZE} from '../../utils/constant'

const Option = Select.Option
export default class ProductHome extends Component {
  state = {
    productList: [],
    total: 0,
    loading: false,
    // 0 为根据商品名称搜索, 1 为根据商品描述搜索
    searchType: 0,
    keywords: '',
    currentPage: 1
  }

  getProductList = async (pageNum = 1) => {
    let {keywords, searchType} = this.state
    searchType = searchType === 0 ? 'productName' : 'productDesc'
    this.setState({loading: true, currentPage: pageNum})
    const res = keywords 
                ? await reqProductsByKeywords(pageNum, PAGE_SIZE, searchType, keywords)
                : await reqProductList(pageNum, PAGE_SIZE)
    this.setState({loading: false})
    if(res.status === 0) {
      this.setState({
        productList: res.data.list,
        total: res.data.total
      })
    }
  }

  // 更新商品状态
  updateProductStatus = async (productId, status) => {
    const {currentPage} = this.state
    this.setState({loading: true})
    const res = await reqUpdateProductStatus(productId, status)
    this.setState({loading: false})
    if(res.status === 0) {
      this.getProductList(currentPage)
      message.success('更新商品状态成功')
    }
  }

  init = () => {
    this.title = (
      <span>
        <Select defaultValue={this.state.searchType} onChange={(value) => this.setState({searchType: value})}>
          <Option value={0}>按名称搜索</Option>
          <Option value={1}>按描述搜索</Option>
        </Select>
        <Input 
          placeholder="关键字" 
          style={{width: 150, margin: '0 15px'}}
          onChange={(e) => this.setState({keywords: e.target.value})}
        />
        <Button type="primary" onClick={() => this.getProductList(1)}>搜索</Button>
      </span>
    )
    this.extra = (
      <Button type="primary" onClick={() => this.props.history.push('/product/addupdate')}>
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
        width: 100,
        render: product => {
          const btnText = product.status === 2 ? '上架' : '下架'
          const statusText = product.status === 2 ? '已下架' : '在售'
          const status = product.status === 2 ? 1 : 2
          return <div><Button type="primary" onClick={() => this.updateProductStatus(product._id, status)}>{btnText}</Button>{statusText}</div>
        },
      },
      {
        title: '操作',
        width: 100,
        render: product => (
          <div>
            <LinkButton onClick={() => this.props.history.push('/product/detail', {product})}>详情</LinkButton>
            <LinkButton onClick={() => this.props.history.push('/product/addupdate', product)}>修改</LinkButton>
          </div>
        ),
      },
    ];

  }

  // 展示商品详细信息
  showProductDetail = (product) => {
    this.props.history.push('/product/detail', { product })
  }

  componentWillMount() {
    this.init()
  }

  componentDidMount() {
    this.getProductList(1)
  }

  render() {
    
    
    const {productList, total, loading, currentPage} = this.state
    

    return (
      <Card title={this.title} extra={this.extra}>
        <Table 
          columns={this.columns} 
          dataSource={productList}
          bordered
          rowKey="_id"
          loading={loading}
          pagination={{
            current: currentPage,
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
