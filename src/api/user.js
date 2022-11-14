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

// 获取用户资料接口
export function getUserInfo(token) {
  return request({
    url: '/sys/profile',
    method: 'POST'

  })
}

// 根据用户ID读取用户的详情
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
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
