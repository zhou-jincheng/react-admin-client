import React, { Component } from 'react'
import { Card, Icon, List } from 'antd'

import LinkButton from '../../components/link-button'
import { IMG_BASE_URL } from '../../utils/constant'
import { reqCategoryById } from '../../api'

const { Item } = List
export default class ProductDetail extends Component {
  state = {
    cname1: '', //一级分类名称
    cname2: ''  //二级分类名称
  }

  componentWillMount() {
    this.title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left" style={{fontSize: 20, marginRight: 10}}/>
        </LinkButton>
        <span>商品详情</span>
      </span>
    )
  }

  async componentDidMount() {
    const {categoryId, pCategoryId} = this.props.location.state.product
    if(pCategoryId === '0') {
      const result = await reqCategoryById(categoryId)
      const cname1 = result.data.name
      this.setState({cname1})
    }else {
      const results = await Promise.all([reqCategoryById(pCategoryId), reqCategoryById(categoryId)])
      const cname1 = results[0].data.name
      const cname2 = results[1].data.name
      this.setState({cname1, cname2})
    }
  }

  render() {
    console.log(this.props);
    const {
      desc,
      imgs,
      name,
      price,
      detail
    } = this.props.location.state.product
    const {cname1, cname2} = this.state
    return (
      <Card title={this.title} className="product-detail">
        <List>
          <Item>
            <span className="left">商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="left">商品价格:</span>
            <span>{price}元</span>
          </Item>
          <Item>
            <span className="left">所属分类:</span>
            <span>{cname1}{cname2 ? ' --> ' + cname2: ''}</span>
          </Item>
          <Item>
            <span className="left">商品图片:</span>
            <span>
              {imgs.map(imgName => <img key={imgName} src={IMG_BASE_URL + imgName} alt="商品图片"/>)}
            </span>
          </Item>
          <Item>
            <span className="left">商品详情:</span>
            <div dangerouslySetInnerHTML={{__html: detail}} />
          </Item>
        </List>
      </Card>
    )
  }
}
