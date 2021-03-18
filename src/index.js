import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import memoryUtils from './utils/memoryUtils'
import {getUser} from './utils/storageUtils'
import store from './redux/store'

// 获取用户信息
const user = getUser()
memoryUtils.user = user

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)