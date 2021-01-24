// 持久化存储一些信息
import store from 'store'

const USER_KEY = 'user_key'

// 保存用户信息
export const saveUser = user => store.set(USER_KEY, user)

// 获取用户信息
export const getUser = () => store.get(USER_KEY)

// 从内存中移除用户
export const reomveUser = () => store.remove(USER_KEY)
