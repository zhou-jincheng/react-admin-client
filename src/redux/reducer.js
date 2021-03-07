/**
 * 根据老的 state 和指定的 action 生成并返回新的 state 的函数
 */
import { combineReducers } from 'redux'

import {SET_HEAD_TITLE} from './action-types'

/**
 * 用于管理头部显示的模块名称
 */
const initHeadTitle = '首页'
function headTitle(state=initHeadTitle, action) {
  switch(action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}
/**
 * 用于管理登陆的用户对象信息
 */
const initUser = {}
function user(state=initUser, action) {
  switch(action.type) {
    default:
      return state
  }
}

export default combineReducers({
  headTitle,
  user
})