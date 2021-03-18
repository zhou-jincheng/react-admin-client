import React, { Component } from 'react'
import { Card, Statistic, Icon, TimePicker, Timeline, Row, Col } from 'antd'

import './index.less'
import Line from './components/Line'
import Bar from './components/Bar'

export default class Home extends Component {
  state = {
    isVisited: true
  }

  handleChange = (boolean) => {
    this.setState({isVisited: boolean})
  }

  render() {
    const { isVisited } = this.state
    let bottomTitle = (
      <span style={{fontSize: 24}}>
        <span 
          style={{marginRight: 20}} 
          className={isVisited ? 'isActived' : ''}
          onClick={() => this.handleChange(true)}>访问量</span>
        <span className={isVisited ? '' : 'isActived'} onClick={() =>this.handleChange(false)}>销售量</span>
      </span>
    )
    return (
      <div className="home-wrapper">
        <Row>
          <Col span={6}>
            <Card 
              title="商品总量"
              extra={<Icon type="question-circle" />}
              headStyle={{color: "#999"}}
              style={{width: 250, marginRight: 30}}>
              <div style={{fontWeight: 700, fontSize: 16}}><span style={{fontSize: 26}}>1,128,163</span>个</div>
              <Statistic
                value='周同比 15% '
                valueStyle={{ fontSize: 16, color: "#666" }}
                suffix={<Icon type="arrow-down" style={{color: "red"}} />}
              />
              <Statistic
                value='日同比 10% '
                valueStyle={{ fontSize: 16, color: "#666" }}
                suffix={<Icon type="arrow-up" style={{color: "green"}} />}
              />
            </Card>
          </Col>
          <Col span={18}>
            <Line />
          </Col>
        </Row>
        <Row style={{marginTop: 50}}>
          <Card title={bottomTitle} extra={<TimePicker />}>
            <Col span={15}>
              <Card title={isVisited ? '访问量' : '销售额'} extra={<Icon type="reload"/>} style={{height: 380}}>
                  <Bar />
                </Card>
            </Col>
            <Col span={7} offset={2}>
              <Card title="任务" extra={<Icon type="reload"/>}  style={{height: 380}}>
                <Timeline>
                  <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                  <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                  <Timeline.Item color="red">
                    <p>联调接口</p>
                    <p>功能验收</p>
                  </Timeline.Item>
                  <Timeline.Item>
                    <p>登录功能设计</p>
                    <p>权限验证</p>
                    <p>页面排版</p>
                  </Timeline.Item>
                </Timeline>
              </Card>
            </Col>
          </Card>
        </Row>
        
      </div>
    )
  }
}
