import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'

const { SubMenu } = Menu

class NavLeft extends Component {

  hasAuth = menu => {
    const userMenus = memoryUtils.user.role.menus || []
    const username = memoryUtils.user.username
    if (username === 'admin' || menu.isPublic || userMenus.includes(menu.key)) {
      return true
    } else if (menu.children) {
      return menu.children.some(item => userMenus.includes(item.key))
    }
    return false
  }

  getNavLeftNodes = list => {
    let {pathname} = this.props.location || ''
    pathname = (pathname.match(/\/[a-z]+/) && pathname.match(/\/[a-z]+/)[0]) || '/'
    return list.map(menu => {
      if(this.hasAuth(menu)) {
        if(!menu.children) {
          // 没有下一级导航
          return (
            <Menu.Item key={menu.key}>
              <Link to={menu.key}>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
              </Link>
            </Menu.Item>
          )
        }else {
          // 有下一级导航时
          if(menu.children.findIndex(item => item.key === pathname) > -1) {
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
    pathname = (pathname.match(/\/[a-z]+/) && pathname.match(/\/[a-z]+/)[0]) || '/'
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

export default withRouter(NavLeft)
