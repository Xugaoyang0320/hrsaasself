// 引入了操作cookie相关的包
import Cookies from 'js-cookie'

// 唯一的字符串 -》 key
const TokenKey = 'vue_admin_template_token'

// 获取token的方法
export function getToken() {
  return Cookies.get(TokenKey)
}

// 将token朝cookie里面存储
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 将token从cookie里面删除
export function removeToken() {
  return Cookies.remove(TokenKey)
}
