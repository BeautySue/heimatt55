// 定义一个 vue 的插件对象，用来封装 $login 方法
// 导入 store
import store from '../store/index.js'
import { Toast } from 'vant'
import router from '../router/index'
import Vue from 'vue'
Vue.use(Toast)

// 1.0 定义一个插件对象
const pluginObj = {}
// 2.0 添加 install 方法
pluginObj.install = function (Vue) {
  // 添加一个全局的登录方法
  Vue.prototype.$login = function () {
    // 得到 token
    const token = store.state.userInfo.token
    // 判断
    if (!token) {
      // 提示用户未登录
      Toast('未登录')
      // 跳转到登录页面
      router.push('/checklogin')
      // 返回状态
      return false
    }
    return true
  }
}
// 3.0 将插件对象导出
export default pluginObj
