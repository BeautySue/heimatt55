// 封装所有与搜索相关的接口
import myhttp from '../utils/myhttp'

// 封装方法：得到联想的内容
export function apiGetThink (key) {
  return myhttp({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
      q: key
    }
  })
}

// 封装方法： 得到搜索结果
export function apiGetResult ({ page, perpage, key }) {
  return myhttp({
    url: '/app/v1_0/search',
    method: 'GET',
    params: {
      page: page,
      per_page: perpage,
      q: key
    }
  })
}
