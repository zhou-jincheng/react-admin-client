import React, { Component } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import PropTypes from 'prop-types'
import {message} from 'antd'
import {reqUploadImage} from '../../api'

class EditorConvertToHTML extends Component {
  static propTypes = {
    detail: PropTypes.string
  }
  constructor(props) {
    super(props)
    let editorState = EditorState.createEmpty()
    const detail = props.detail
    if(detail) { // 修改商品时，回显商品详细信息
      const contentBlock = htmlToDraft(detail)
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        editorState = EditorState.createWithContent(contentState)
      }
    }
    this.state = {
      editorState
    }
  }

  // 上传图片回调函数
  uploadImageCallBack = (file) => {
    return new Promise(
      async resolve => {
        let formData = new FormData()
        formData.append('image', file)
        const result = await reqUploadImage(formData)
        if(result.status === 0) {
          resolve({
            data: {
                link: result.data.url
            }
          })
        }else {
          message.error('图片上传失败!')
        }
      }
    )
  }

  // 向外暴露出html文本内容
  getDetail = () => {
    const { editorState } = this.state
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  render() {
    const { editorState } = this.state
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{border: '1px solid black', padding: '0 10px', minHeight: 200}}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: {
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,   // 是否显示排列按钮 相当于text-align
              uploadCallback: this.uploadImageCallBack,
              previewImage: true,
              inputAccept: 'image/*',
              alt: {present: false, mandatory: false,previewImage: true}
            },
          }}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    )
  }
}

export default EditorConvertToHTML