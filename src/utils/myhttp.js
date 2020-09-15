// 导入 aixos
import axios from 'axios'
// 导入 store
import store from '../store/index.js'
// 导入 jsonbigint
import jsonbig from 'json-bigint'
import { localSet } from './mylocal.js'
// 创建一个 axios 对象
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn', // 设置基地址
  // 转换响应回来的数据
  transformResponse: [function (data) {
    try {
      // data 就是响应回来的 json 格式的字符串
      return jsonbig.parse(data)
    } catch (err) {
      return data
    }
  }]
})
// 再创建一个对象：专门用来处理 token
const instanceToken = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 设置拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前判断是否存在 token,如果有，携带在请求头中，如果没有不用理会
  // 1.0 得到 token
  const token = store.state.userInfo.token
  // 2.0 判断
  if (token) config.headers.Authorization = `Bearer ${token}` // 将 token 携带在请求头中
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  return response
}, async function (error) { // config request response
  // 得到当衣请求的错误信息
  console.log('-------------------------------------')
  // 判断请求的状态是否是 401
  if (error.response.status === 401) {
    // 得到 refresh_token
    const refreshToken = store.state.userInfo.refresh_token
    // 将 refresh_token 提交到服务器
    const res = await instanceToken({
      url: '/app/v1_0/authorizations',
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    })
    // 保存更新之后的 token
    const token = res.data.data.token
    // 生成一个新的对象
    var objToken = {
      token: token,
      refresh_token: refreshToken
    }
    // 保存 vuex
    store.commit('setUserInfo', objToken)
    // 保存 localstorage 中
    localSet(objToken)
    // 继续完成之前报错的请求
    return await instance(error.config) // 将请求发送到了服务器
  }
  console.log('-------------------------------------')
  return Promise.reject(error)
})

// 暴露给外界
export default instance
