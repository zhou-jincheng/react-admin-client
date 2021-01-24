import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import App from './App'
import memoryUtils from './utils/memoryUtils'
import {getUser} from './utils/storageUtils'

// 获取用户信息
const user = getUser()
memoryUtils.user = user

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)