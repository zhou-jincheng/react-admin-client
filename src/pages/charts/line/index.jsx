import React, { Component } from 'react'
import {
  Card,
  Button
} from 'antd'
import ReactECharts from 'echarts-for-react'

export default class Line extends Component {
  state = {
    sales: [5, 20, 36, 10, 10, 20],
    store: [10, 5, 30, 25, 10, 30]
  }

  update = () => {
    this.setState(state => ({
      sales: state.sales.map(item => item + 1),
      store: state.store.map(item => item - 1)
    }))
  }

  render() {
    const { sales, store } = this.state
    var option = {
      title: {
          text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
          data:['销量', '库存']
      },
      xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [
        {
            name: '销量',
            type: 'line',
            data: sales
        },
        {
            name: '库存',
            type: 'line',
            data: store
        }
      ]
    };
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.update}>更新</Button>
        </Card>
        <Card title="折线图一">
          <ReactECharts option={option} />
        </Card>
      </div>
    )
  }
}
