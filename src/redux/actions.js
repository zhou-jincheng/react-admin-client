/**
 * 包含 n 个 action creator 函数的模块
 * 同步 action: 对象{ type: 'xxx', data: 数据值}
 * 异步 action: 函数 dispatch => {}
 */
import { 
  SET_HEAD_TITLE,
  SET_USER,
  SET_ERROR_MSG,
  LOGOUT
} from './action-types'
import { reqLogin } from '../api'
import { saveUser, reomveUser } from '../utils/storageUtils'

export const setHeadTitle = headTitle => ({type: SET_HEAD_TITLE, data: headTitle})

export const setUser = user => ({type: SET_USER, user})

export const setErrorMsg = msg => ({type: SET_ERROR_MSG, msg})

export const login = (username, password) => {
  return async dispatch => {
    const res = await reqLogin(username, password)
    if (res.status === 0) {
      const user = res.data
      saveUser(user)
      dispatch(setUser(user))
    } else {
      const errorMsg = res.msg
      dispatch(setErrorMsg(errorMsg))
    }
  }
}

export const logout = () => {
  reomveUser()
  return {type: LOGOUT}
}