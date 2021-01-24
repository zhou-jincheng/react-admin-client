import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import NavLeft from '../../components/nav-left'
import Header from '../../components/header'
import Home from '../home'
import Category from '../category'
import Product from '../product'
import Role from '../role'
import User from '../user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Order from '../order'


const { Footer, Sider, Content } = Layout

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user
    if(!user || !user._id) {
      return (
        <Redirect to="/login"/>
      )
    }
    return (
      <Layout style={{height: "100%"}}>
        <Sider>
          <NavLeft />
        </Sider>
        <Layout>
          <Header />
          <Content style={{backgroundColor: "#fff"}}>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Route path='/order' component={Order}/>
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    )
  }
}
