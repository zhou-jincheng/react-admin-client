import React, { Component } from 'react'
import { Result, Button } from 'antd'
import { connect } from 'react-redux'
import { setHeadTitle } from '../../redux/actions'

class NotFind extends Component {
  componentWillMount() {
    this.props.setHeadTitle('404')
  }
  componentWillUnmount() {
    this.props.setHeadTitle('首页')
  }
  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle="抱歉，你访问的页面不存在"
        extra={<Button type="primary" onClick={() => this.props.history.push('/home')}>回到首页</Button>}
      />
    )
  }
}

export default connect(
  state => ({}),
  {setHeadTitle}
)(NotFind)
