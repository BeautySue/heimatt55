import Vue from 'vue'
import Vuex from 'vuex'
// 导入操作 local 的方法
import { localGet } from '../utils/mylocal'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // this.$store.state.userInfo = xxx // 跟闯红灯的性质是一样的
    // 打开页面时，判断 localostroage 中是否存在数据，如果有，取出来赋值给 userInfo
    // userInfo: JSON.parse(window.localStorage.getItem('userInfo')) || {}
    userInfo: localGet() || {}
  },
  mutations: {
    // 定义一个方法用来给 state 中的 userInfo 赋值
    setUserInfo (state, obj) { // state 就是上面 state 对象
      // 给 state 中的 userInfo 赋值
      state.userInfo = obj
    }
  }
})
