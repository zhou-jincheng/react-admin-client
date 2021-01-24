// 该项目的所有请求方法
import ajax from './ajax'

export const reqLogin = (username, password) => ajax('/login', {username, password}, 'post')