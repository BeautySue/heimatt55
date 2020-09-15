// 导入 vue
import Vue from 'vue'
// 导入 App
import App from './App.vue'
// 导入路由
import router from './router'
// 导入 vuex
import store from './store'
// 导入 Vant
import Vant, { Lazyload, Toast } from 'vant'
import 'vant/lib/index.css'
// 导入字体
import './style/index.css'
// 导入 filter
import './filters/timef.js'
// 导入插件
import plugin from './utils/myplugin'
// 自动适配的插件
import 'amfe-flexible/index.js'

// 使用 vant
Vue.use(Vant)
Vue.use(Lazyload)
Vue.use(Toast)
Vue.use(plugin)
Vue.config.productionTip = false

// 封装一个全局方法用来进行登录验证
// Vue.prototype.$login = function () {
//   // 得到 token
//   const token = store.state.userInfo.token
//   if (!token) {
//     // 提示用户未登录
//     Toast('未登录')
//     // 跳转到登录页面
//     router.push('/login')
//     // 返回状态
//     return false // 说明未登录
//   }
//   return true // 说明已登录
// }

// 创建了 vue 实例
new Vue({
  router, // 挂载了路由
  store, // 挂载了 vuex
  render: h => h(App) // 挂载 App.vue
}).$mount('#app') // 挂载到页面上的 id 名为 app 的容器中
