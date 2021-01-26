// 该项目的所有请求方法
import ajax from './ajax'

export const reqLogin = (username, password) => ajax('/login', {username, password}, 'post')

// 获取天气预报
export const reqGetWhether = city => ajax('https://restapi.amap.com/v3/weather/weatherInfo',
  {
    key: '4d41dd2ca7e2df8cb5cb7eb210d865b7',
    city,
    extensions: 'base'
  }
)
