import React, { Component } from 'react'
import {
  Card,
  Form,
  Input,
  Icon,
  Cascader,
  message,
  Button
} from 'antd'
import {reqCategoryList, reqAddOrUploadProduct} from '../../api'
import LinkButton from '../../components/link-button'
import PicturesWall from './PicturesWall'
import RichTextEditor from './RichTextEditor'
import memoryUtils from '../../utils/memoryUtils'

const { TextArea } = Input
class ProductAddUpdate extends Component {

  constructor(props) {
    super(props)
    this.picturesWallRef = React.createRef()
    this.detailRef = React.createRef()
    this.state = {
      //图片是否在加载
      loading: false,
      categoryList: [],
    }
  }

  

  // 价格自定义校验
  validatePrice = (rule, value, callback) => {
    if(value > 0) {
      callback()
    } else {
      callback('价格必须大于0')
    }
  }

  
  // 添加或修改商品
  addOrUpdateProduct = () => {
    this.props.form.validateFields(async (errors, values) => {
      if(errors) return
      const {name, desc, price, categoryIds} = values
      const {_id} = this.product
      let pCategoryId = '0'
      let categoryId
      if(categoryIds.length === 1) {// 一级分类
        categoryId = categoryIds[0]
      }else {// 二级分类
        pCategoryId = categoryIds[0]
        categoryId = categoryIds[1]
      }
      const detail = this.detailRef.current.getDetail()
      const imgs = this.picturesWallRef.current.getImgsNames()
      const product = {
        _id,
        categoryId,
        pCategoryId,
        name,
        desc,
        price,
        detail,
        imgs
      }
      const result = await reqAddOrUploadProduct(product)
      if(result.status === 0) {
        message.success(_id ? '修改商品成功' : '添加商品成功')
        this.props.history.replace('/product')
      }else {
        message.error(_id ? '修改商品失败' : '添加商品失败')
      }
    })
  }

  // 动态加载二级分类
  loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    const children = await this.getCategoryList(targetOption.value)
    targetOption.loading = false;
    const categoryList = [...this.state.categoryList]
    const category = categoryList.find(category => category.value === targetOption.value)
    if(children.length > 0) { // 二级列表
      category.children = children
    }else {
      category.isLeaf = true
    }
    this.setState({
      categoryList
    });
  };

  // 获取商品分类列表
  async getCategoryList(parentId) {
    const result = await reqCategoryList(parentId)
    if(result.status !== 0) return message.error('获取商品分类列表失败')
    let categoryList = []
    if(parentId === '0') {
      // 获取一级分类列表
      categoryList = result.data.map(c => {
        return {
          label: c.name,
          value: c._id,
          isLeaf: false
        }
      })
    }else {
      // 获取二级分类列表
      categoryList = result.data.map(c => ({
        label: c.name,
        value: c._id,
        isLeaf: true
      }))
    }
    return categoryList
  }

  
  // 初始化商品分类
  initCategoryList = async () => {
    const { pCategoryId } = this.product
    let categoryList  = await this.getCategoryList('0')
    if(this.isUpdate && pCategoryId !== '0') {
      // 修改商品
      const subCategoryList = await this.getCategoryList(pCategoryId)
      const category = categoryList.find(item => item.value === pCategoryId)
      category.children = subCategoryList
    }
    this.setState({categoryList})
  }

  // 返回上一级
  back = () => {
    this.props.history.goBack()
  }

  // 初始化页面结构相关配置
  init = () => {
    // 卡片标题部分
    this.title = (
      <span>
        <LinkButton onClick={this.back}>
          <Icon type="arrow-left" style={{fontSize: 20, marginRight: 10}}/>
        </LinkButton>
        <span>{this.isUpdate ? '修改商品' : '添加商品'}</span>
      </span>
    )
    // 表单项宽度设置
    this.formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    }
  }

  componentWillMount() {
    const product = memoryUtils.product
    this.isUpdate = !!product._id
    this.product = product || {}
    this.init()
  }

  async componentDidMount() {
    this.initCategoryList()
  }

  componentWillUnmount() {
    memoryUtils.product = {}
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const {categoryList} = this.state
    
    const { name, desc, price, pCategoryId, categoryId, imgs, detail} = this.product
    let categoryIds = []
    if(this.isUpdate) {
      if(pCategoryId === '0') {
        categoryIds.push(categoryId)
      }else {
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
      }
    }
    return (
      <Card title={this.title}>
        <Form {...this.formItemLayout}>
          <Form.Item label="商品名称">
            {getFieldDecorator('name', {
              initialValue: name,
              rules: [
                {
                  required: true,
                  message: '商品名称不能为空！',
                },
              ],
            })(<Input placeholder="请输入商品名称"/>)}
          </Form.Item>
          <Form.Item label="商品描述">
            {getFieldDecorator('desc', {
              initialValue: desc,
              rules: [
                {
                  required: true,
                  message: '商品描述不能为空！',
                },
              ],
            })(<TextArea
                  placeholder="请输入商品描述"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />)}
          </Form.Item>
          <Form.Item label="商品价格">
            {getFieldDecorator('price', {
              initialValue: price,
              rules: [
                {
                  required: true,
                  message: '商品价格不能为空！',
                },
                {
                  validator: this.validatePrice
                }
              ],
            })(<Input 
                type="number" 
                addonAfter="元" 
                placeholder="请输入商品价格"/>)}
          </Form.Item>
          <Form.Item label="商品分类">
            {getFieldDecorator('categoryIds', {
              initialValue: categoryIds,
              rules: [
                {
                  required: true,
                  message: '请先选择商品分类！',
                },
              ],
            })(<Cascader
                  options={categoryList}
                  loadData={this.loadData}
                  onChange={this.handleCategoryChange}
                  changeOnSelect/>)}
          </Form.Item>
          <Form.Item label="商品图片">
            <PicturesWall ref={this.picturesWallRef} imgs={imgs}/>
          </Form.Item>
          <Form.Item label="商品详情" labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}>
            <RichTextEditor ref={this.detailRef} detail={detail}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.addOrUpdateProduct}>提交</Button>
          </Form.Item>
        </Form>
      </Card> 
    )
  }
}

export default Form.create()(ProductAddUpdate)