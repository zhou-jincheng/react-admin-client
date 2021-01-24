import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {Button} from 'antd'
import memoryUtils from '../../utils/memoryUtils'

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user
    if(!user || !user._id) {
      return (
        <Redirect to="/login"/>
      )
    }
    return (
      <div>
       <Button type="primary">这是antd按钮</Button>
      </div>
    )
  }
}
