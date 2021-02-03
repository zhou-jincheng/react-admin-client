import axios from 'axios'
import {message} from 'antd'

// 仅适用于 BASE_URL 为 http://localhost:5000
export default function ajax(url, data={}, method='get') {
  const BASE_URL = 'http://localhost:5000'
  return new Promise(reslove => {
    let promise = null
    if(method.toLocaleLowerCase() === 'get') {
        promise = axios.get(BASE_URL + url, {params:data})
      }
    if(method.toLocaleLowerCase() === 'post') {
        promise = axios.post(BASE_URL + url, data)
    }
    promise.then(
      res => reslove(res.data),
      err => message.error('请求出错！' + err.message)
    )
  })
}

// 使用于全路径使用
export const request = (url, data={}, method='get') => {
  return new Promise(reslove => {
    let promise = null
    if(method.toLocaleLowerCase() === 'get') {
        promise = axios.get(url, {params:data})
      }
    if(method.toLocaleLowerCase() === 'post') {
        promise = axios.post(url, data)
    }
    promise.then(
      res => reslove(res.data),
      err => message.error('请求出错！' + err.message)
    )
  })
}