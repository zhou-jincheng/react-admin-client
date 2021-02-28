import React, {Component} from 'react'
import { Upload, Icon, Modal, message } from 'antd'
import {reqDeleteImage} from '../../api'
import PropTypes from 'prop-types'
import {IMG_BASE_URL} from '../../utils/constant'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends Component {

  static propTypes = {
    imgs: PropTypes.array
  }

  constructor(props) {
    super(props)
    let fileList = []
    const imgs = props.imgs
    // 如果传入imgs，需生成一个对应的fileList
    if(imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: -index,      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
        name: img,  // 文件名
        status: 'done', // 状态有：uploading done error removed
        url: IMG_BASE_URL + img
      }))
    }
    // 初始化状态
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList
    }
  }
  

  getImgsNames = () => {
    return this.state.fileList.map(file => file.name)
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = async ({ file, fileList }) => {
    if(file.status === 'done') {// 添加图片
      const {status, data} = file.response
      // 图片上传成功
      if(status === 0) {
        message.success('图片上传成功')
        const {name, url} = data
        file.name = name
        file.url = url
      }else {
        message.error('图片上传失败')
        file.status = 'error'
      }
      fileList[fileList.length - 1] = file
    }else if(file.status === 'removed') {// 删除图片
      const result = await reqDeleteImage(file.name)
      if(result.status === 0) {
        message.success('删除图片成功')
      }else {
        message.error('删除图片失败')
      }
    }
    this.setState({ fileList })
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          name="image"
          action="/manage/img/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="productImg" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall