import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu

export default class NavLeft extends Component {

  getNavLeftNodes = list => {
    return list.map(menu => {
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
    })
  }

  render() {
    return (
      <div className="nav-left-wrapper">
        <Link to="/" className="nav-left-header">
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
          {this.getNavLeftNodes(menuList)}
        </Menu>
      </div>
    )
  }
}
