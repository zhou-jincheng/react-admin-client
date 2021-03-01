import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'
import './index.less'
import memoryUtils from '../../utils/memoryUtils'
import menuList from '../../config/menuConfig'
import {reqGetWhether} from '../../api/index'
import {formatTime} from '../../utils/utils'
import LinkButton from '../../components/link-button'
import {reomveUser} from '../../utils/storageUtils'
const { confirm } = Modal

class Header extends Component {
  state = {
    time: '',
    city: '',
    whether: ''
  }
  
  getTitle = list => {
    let {pathname} = this.props.location
    const path = pathname.match(/\/\w+/)
    if(path) pathname = path[0]
    let title = ''
    list.forEach(menu => {
        if(menu.key === pathname) {
          title = menu.title
        }else if(menu.children){
        const child = menu.children.find(item => item.key === pathname)
        if(child) title = child.title
      }
    })
    return title
  }

  getWhether = () => {
    reqGetWhether('广州').then(res => {
      const {city, weather} = res.lives[0]
      this.setState({city, weather})
    })
  }

  getTime= () => {
    this.timer = setInterval(()=> {
      this.setState({time: formatTime(Date.now())})
    }, 1000)
  }

  logout = () => {
    confirm({
      title: '提示',
      content: '确定退出登录吗？',
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        reomveUser()
        memoryUtils.user = null
        this.props.history.replace('/login')
      },
      onCancel() {},
    })
  }

  componentDidMount() {
    this.getWhether()
    this.getTime()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }


  render() {
    const {time, city, weather} = this.state
    const title = this.getTitle(menuList)
    return (
      <div className="header-wrapper">
        <div className="header-top">欢迎 {memoryUtils.user.username}<LinkButton onClick={this.logout}>退出</LinkButton></div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{time}</span>
            <span className="city">{city}</span>
            <span className="whether">{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
