// 引入方法
import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { getUserDetailById, getUserInfo, login } from '@/api/user'

const state = {
  // 初始化token为共享状态，先从vuex中获取，缓存里面有就取值，没有就为null
  token: getToken(),
  userInfo: {}// 定义一个空对象

}
const mutations = {
  setToken(state, token) {
    state.token = token
    // 并且同步给缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, result) {
    state.userInfo = result
    // state.userInfo = {...result} //浅拷贝也具有响应式
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {} // 这边要设置为空对象，不能是null。null会报错
  }
}
const actions = {
  async login(context, data) {
    // 调用api接口
    const result = await login(data)
    // console.log(result)
    // if (result.data.success) {
    //   context.commit('setToken', result.data.data)
    // }
    // 不需要判断条件，因为在响应拦截器拦截了，不需要result.data.data在响应拦截器解构过了
    context.commit('setToken', result) // 设置token
    setTimeStamp()  //设置时间戳
  },
  async getUserInfo(context) {
    // 获取用户详情
    const result = await getUserInfo()
    const baseInfo = await getUserDetailById(result.userId)
    context.commit('setUserInfo', { ...baseInfo, ...result }) // 提交到mutations
    return result // 给我们后期做权限的时候留下伏笔所以return
  },
  // 登出操作
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

// import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

// const getDefaultState = () => {
//   return {
//     token: getToken(),
//     name: '',
//     avatar: ''
//   }
// }

// const state = getDefaultState()

// const mutations = {
//   RESET_STATE: (state) => {
//     Object.assign(state, getDefaultState())
//   },
//   SET_TOKEN: (state, token) => {
//     state.token = token
//   },
//   SET_NAME: (state, name) => {
//     state.name = name
//   },
//   SET_AVATAR: (state, avatar) => {
//     state.avatar = avatar
//   }
// }

// const actions = {
//   // user login
//   login({ commit }, userInfo) {
//     const { username, password } = userInfo
//     return new Promise((resolve, reject) => {
//       login({ username: username.trim(), password: password }).then(response => {
//         const { data } = response
//         commit('SET_TOKEN', data.token)
//         setToken(data.token)
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // get user info
//   getInfo({ commit, state }) {
//     // 返回了一个新的promise实例
//     return new Promise((resolve, reject) => {
//       getInfo(state.token).then(response => {
//         const { data } = response

//         if (!data) {
//           return reject('Verification failed, please Login again.')
//         }

//         const { name, avatar } = data

//         commit('SET_NAME', name)
//         commit('SET_AVATAR', avatar)
//         resolve(data)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // user logout
//   logout({ commit, state }) {
//     // 返回了一个新的promise实例
//     return new Promise((resolve, reject) => {
//       logout(state.token).then(() => {
//         removeToken() // must remove  token  first
//         resetRouter()
//         commit('RESET_STATE')
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // remove token
//   resetToken({ commit }) {
//     return new Promise(resolve => {
//       removeToken() // must remove  token  first
//       commit('RESET_STATE')
//       resolve()
//     })
//   }
// }

