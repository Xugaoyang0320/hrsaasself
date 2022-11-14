import Vue from 'vue'

// 类似于引入reset.css文件
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// 引入ElementUI组件库
import ElementUI from 'element-ui'
// 引入Element UI组件库必备的样式文件
import 'element-ui/lib/theme-chalk/index.css'
// 引入国际化文字种类（哪国的语言）
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// 引入工程必备文件
import '@/styles/index.scss' // global css

// 引入根组件
import App from './App'
// 引入
import store from './store'
import router from './router'

// 引入指令
import * as directives from '@/directives'
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
// 设置element
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
