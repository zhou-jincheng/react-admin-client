import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import {connect} from 'react-redux'

import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import { setHeadTitle } from '../../redux/actions'


const { SubMenu } = Menu

class NavLeft extends Component {

  hasAuth = menu => {
    const { user } = this.props
    const userMenus = user.role.menus || []
    const username = user.username
    if (username === 'admin' || menu.isPublic || userMenus.includes(menu.key)) {
      return true
    } else if (menu.children) {
      return menu.children.some(item => userMenus.includes(item.key))
    }
    return false
  }

  getNavLeftNodes = list => {
    let {pathname} = this.props.location || ''
    return list.map(menu => {
      if(this.hasAuth(menu)) {
        if(!menu.children) {
          // 没有下一级导航
          if(menu.key === pathname || menu.key.indexOf(pathname) === 0) {
            this.props.setHeadTitle(menu.title)
          }
          return (
            <Menu.Item key={menu.key} onClick={() => this.props.setHeadTitle(menu.title)}>
              <Link to={menu.key}>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
              </Link>
            </Menu.Item>
          )
        }else {
          // 有下一级导航时
          if(menu.children.some(item => item.key.indexOf(pathname) === 0)) {
            this.openKey = menu.key
          }
          return (
            <SubMenu
              key={menu.key}
              title={
                <span>
                  <Icon type={menu.icon} />
                  <span>{menu.title}</span>
                </span>
              }
            >
              {this.getNavLeftNodes(menu.children)}
            </SubMenu>
          )
        }
      } else {
        return null
      }
    })
  }

  componentWillMount() {
    this.menuNodes = this.getNavLeftNodes(menuList)
  }

  render() {
    let {pathname} = this.props.location || ''
    return (
      <div className="nav-left-wrapper">
        <Link to="/" className="nav-left-header">
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          selectedKeys={[pathname]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {this.menuNodes}
        </Menu>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {
    setHeadTitle
  }
)(withRouter(NavLeft))
