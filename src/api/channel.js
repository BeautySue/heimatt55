// 负责处理所有与频道相关的网络请求
// 导入 myhttp
import myhttp from '../utils/myhttp.js'

// 封装方法：得到频道数据
export function apiGetChannel () {
  return myhttp({
    url: '/app/v1_0/user/channels',
    method: 'GET'
  })
}

// 封闭方法：得到所有的频道数据
export function apiGetAllChannel () {
  return myhttp({
    url: '/app/v1_0/channels'
  })
}

// 封装方法：修改用户的频道数据
export function processChannel (channels) { // [{ id: '频道的id', seq: '频道的顺序' }]
  return myhttp({
    url: '/app/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels: channels
    }
  })
}
