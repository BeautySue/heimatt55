import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入 userVant
import UserVant from '../views/userVant'
// 导入 login
import Login from '../views/login'
// 导入 home
import home from '../views/home/index.vue'
// 导入 index
import Index from '../views/home/index/index.vue'
// 导入 my
import My from '../views/home/my'
// 导入 search
import Search from '../views/home/search'
// 导入 searchResult
import SearchResult from '../views/searchResult'
// 导入 detail
import Detail from '../views/detail/index.vue'
// 注册路径
import Info from '../views/info/index.vue'
// 导入 zhi
import Zhi from '../views/zhi/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/userVant',
    component: UserVant
  },
  // 登录路由
  {
    path: '/login',
    component: Login
  },
  // 验证登录的路由
  {
    path: '/checklogin',
    component: Login
  },
  {
    path: '/',
    redirect: '/index'
  },
  // 主页路径
  {
    path: '/home',
    component: home,
    // redirect：不能决定子路由的访问方式，
    redirect: '/index',
    // 添加子路由
    children: [
      { path: '/index', component: Index },
      { path: '/my', component: My },
      { path: '/search', component: Search }
    ]
  },
  {
    path: '/searchResult/:key',
    component: SearchResult
  },
  {
    // 动态路由 & query 传参
    path: '/detail/:artid',
    component: Detail
  },
  {
    path: '/info',
    component: Info
  },
  {
    path: '/zhi',
    component: Zhi
  }
]

const router = new VueRouter({
  routes
})

export default router
