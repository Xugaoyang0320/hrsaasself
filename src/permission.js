import router from './router'
import store from '@/store/index' // 引入store实例和组件中的this.$store是一回事
import nprogress from 'nprogress'

const writrList = ['/login', '/404']
// 不需要导出，因为只需要让代码执行
// 前置守卫
// next是前置守卫必须要执行的钩子函数，next必须执行，不执行的话，页面就死了
// next()放行
// next(false) 跳转终止
// next(地址)跳转到某个地址
router.beforeEach(async(to, from, next) => {
  nprogress.start()// 开启进度条
  if (store.getters.token) {
    // 如果有token
    if (to.path === '/login') {
      // 如果访问的是登录页
      next('/') // 跳转到首页
    } else {
      // 只有在有token放行的情况下，才能获取资料
      // 如果当前vuex中有用户的id，表示已经有资料了，不需要获取，如果没有才需要获取
      // if (!store.state.user.userInfo.userId) {
      // 在getters形成了快捷访问
      if (!store.getters.userId) {
        // 如果没有id表示当前用户资料没有被获取过
        await store.dispatch('user/getUserInfo')
        // 后续要根据用户资料获取数据的话,这边必须改成同步
      }
      next()
    }
  } else {
    // 在没有token的情况下
    if (writrList.indexOf(to.path) > -1) {
      // 表示在白名单
      next()
    } else {
      next('/login')
    }
    nprogress.done() // 解决手动切换地址是，进度条不关闭的问题
  }
})

// 后置守卫
router.afterEach(() => {
  nprogress.done() // 关闭进度条
})

// import store from './store'

// // 提示消息组件
// import { Message } from 'element-ui'
// // 进度条组件
// import NProgress from 'nprogress' // progress bar
// // 进度条组件样式
// import 'nprogress/nprogress.css' // progress bar style
// // 引入获取token的方法
// import { getToken } from '@/utils/auth' // get token from cookie
// // 设置页面标题的方法
// import getPageTitle from '@/utils/get-page-title'
// // 对进度条进行默认配置
// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// // 设置白名单列表  这里定义的路由是不需要访问权限的
// const whiteList = ['/login'] // no redirect whitelist

// // 前置守卫 - 当你页面准备开始跳转之前执行  页面A->页面B
// router.beforeEach(async(to, from, next) => {
//   // 开启进度条效果 start progress bar
//   NProgress.start()

//   // 设置页面标题 set page title
//   document.title = getPageTitle(to.meta.title)

//   // 让获取token的方法执行,然后去用常量去判断,当前这个用户是否处于登陆状态determine whether the user has logged in
//   const hasToken = getToken()

//   if (hasToken) {
//     // token有值的情况下
//     if (to.path === '/login') {
//       // 又判断你要去的路径是登录页吗
//       // if is logged in, redirect to the home page
//       // 如果你处于登录状态了,就不要再进登陆页面,直接重定向到首页
//       next({ path: '/' })
//       // 关闭登录页效果
//       NProgress.done()
//     } else {
//       // 判断处于登录页,,但要去的地方不是登录页
//       const hasGetUserInfo = store.getters.name
//       // 一开始 hasGetUserInfo 为空字符串
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         // 取user子模块里面的那么为空话
//         try {
//           // 用来获取用户信息(给全局状态里面的name和avatar做更新)
//           // get user info
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // 移除token然后去登录页重新登录
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           // 提示一个错误信息
//           Message.error(error || 'Has Error')
//           // 重定向到登陆页面,并且记录时从那跳转到登录页的,后续登录成功之后,应该在恢复之前的操作
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // 如果你要去的地址是在白名单里面直接放行
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // 说明你去的地方是有权限的其他页面,让你重新去登陆
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// // 后置守卫
// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
