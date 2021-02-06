import React, { Component } from 'react'
import {
  Card,
  Form,
  Input,
  Icon,
  Upload,
  Cascader,
  message
} from 'antd'
import {reqCategoryList} from '../../api'
import LinkButton from '../../components/link-button'

const { TextArea } = Input
class ProductAddUpdate extends Component {
  state = {
    //图片是否在加载
    loading: false,
    categoryList: []
  }

  // 表单提交处理事件
  handleSubmit = () => {
    console.log('表单提交');
  }

  // 动态加载二级分类
  loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    const res = await reqCategoryList(targetOption._id)
    if(res.status === 0) {
      targetOption.loading = false;
      targetOption.children = res.data
      const {categoryList} = this.state
      const index = categoryList.findIndex(category => category._id === targetOption._id)
      categoryList.splice(index, 1, targetOption)
      this.setState({
        categoryList
      });
    }
  };

  uploadImages = (files) => {
    console.log(files)
  }

  componentWillMount() {
    this.title = (
      <span>
        <LinkButton>
          <Icon type="arrow-left"/>
        </LinkButton>
        <span>添加商品</span>
      </span>
    )

    this.formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    }

    // Cascader 自定义字段名
    this.fieldNames={ label: 'name', value: '_id' }
  }

  componentDidMount() {
    reqCategoryList('0').then(res => {
      if(res.status === 0) {
        let categoryList = res.data || []
        categoryList.forEach(category => category.isLeaf = false)
        this.setState({categoryList})
      }else {
        message.error('获取分类列表失败！')
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const {categoryList} = this.state
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Card title={this.title}>
        <Form {...this.formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="商品名称">
            {getFieldDecorator('name', {
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
              rules: [
                {
                  required: true,
                  message: '商品价格不能为空！',
                },
              ],
            })(<Input 
                type="number" 
                addonAfter="元" 
                placeholder="请输入商品价格"/>)}
          </Form.Item>
          <Form.Item label="商品分类">
            {getFieldDecorator('categoryId', {
              rules: [
                {
                  required: true,
                  message: '请先选择商品分类！',
                },
              ],
            })(<Cascader
                  fieldNames={this.fieldNames}
                  options={categoryList}
                  loadData={this.loadData}
                  onChange={this.handleCategoryChange}
                  changeOnSelect/>)}
          </Form.Item>
          <Form.Item label="商品图片">
            <Upload
              name="imgs"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              multiple
              customRequest={this.uploadImages}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item label="商品详情">
            {getFieldDecorator('detail')(<Input placeholder="请输入商品价格"/>)}
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)