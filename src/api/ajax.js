import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data={}, method='get') {
  const BASE_URL = ''
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