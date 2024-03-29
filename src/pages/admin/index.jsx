import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import { connect } from 'react-redux'

import NavLeft from '../../components/nav-left'
import Header from '../../components/header'
import MyFooter from '../../components/footer'
import Home from '../home'
import Category from '../category'
import Product from '../product'
import Role from '../role'
import User from '../user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Order from '../order'
import NotFind from '../404'


const { Footer, Sider, Content } = Layout

class Admin extends Component {
  render() {
    const user = this.props.user
    if(!user || !user._id) {
      return (
        <Redirect to="/login"/>
      )
    }
    return (
      <Layout style={{minHeight: "100%"}}>
        <Sider>
          <NavLeft />
        </Sider>
        <Layout>
          <Header />
          <Content style={{margin: "20px",backgroundColor: "#fff",minHeight: "100px"}}>
            <Switch>
              <Redirect from='/' to='/home' exact/>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Route path='/order' component={Order}/>
              <Route component={NotFind}/>
            </Switch>
          </Content>
          <Footer>
            <MyFooter />
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  {}
)(Admin)
