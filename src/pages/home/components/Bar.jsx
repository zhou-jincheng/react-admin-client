import React, { Component } from 'react'
import { Chart, Axis, Geom, Tooltip } from 'bizgoblin'

export default class Bar extends Component {

  onShowTooltip = (ev) => {
    const items = ev.items;
    items[0].name = null;
    items[0].name = items[0].title;
    items[0].value = `¥ ${items[0].value}`;
  }

  render() {
    const pixelRatio = window.devicePixelRatio * 2;

    const data = [
      {
        year: '1951 年',
        sales: 38,
      }, {
        year: '1952 年',
        sales: 52,
      }, {
        year: '1956 年',
        sales: 61,
      }, {
        year: '1957 年',
        sales: 145,
      }, {
        year: '1958 年',
        sales: 48,
      }, {
        year: '1959 年',
        sales: 38,
      }, {
        year: '1960 年',
        sales: 38,
      }, {
        year: '1962 年',
        sales: 38,
      },
    ]

    const defs = [{
      dataKey: 'year',
    }, {
      dataKey: 'sales',
      tickCount: 5,
    }]
    return (
      <div style={{width: 580}}>
        <Chart height={280} data={data} defs={defs} animate={{ type: 'scaley' }} pixelRatio={pixelRatio} >
          <Axis dataKey="year" label={{ fontSize: 8 }} />
          <Axis dataKey="sales" />
          <Tooltip showItemMarker={false} onShow={this.onShowTooltip} />
          <Geom geom="interval" position="year*sales" />
        </Chart>
      </div>
    )
  }
}
