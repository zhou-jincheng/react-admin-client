import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import ProductHome from './ProductHome'
import ProductAddUpdate from './ProductAddUpdate'
import ProductDetail from './ProductDetail'

export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product" component={ProductHome} exact/>
        <Route path="/product/detail" component={ProductDetail} />
        <Route path="/product/addupdate" component={ProductAddUpdate} />
      </Switch>
    )
  }
}
