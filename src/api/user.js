import request from '@/utils/request'

// 登录接口
export function login(data) {
//   request返回一个Promise对象，return出去就可以
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

export function getInfo(token) {}

export function logout() {}

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
