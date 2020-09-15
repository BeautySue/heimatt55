// 封装所有与文章相关的网络请求
// 导入 myhttp
import myhttp from '../utils/myhttp'
// 封装方法：得到文章列表
export function apiGetArticleList (channelid) {
  return myhttp({
    url: '/app/v1_1/articles',
    method: 'GET',
    params: {
      channel_id: channelid,
      timestamp: Date.now(),
      with_top: 0
    }
  })
}

// 封装方法：将文章标记为不喜欢
export function apiDisLike (target) {
  return myhttp({
    url: '/app/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: target
    }
  })
}

// 封装方法：举报文章
export function apiReport ({ artid, type }) {
  return myhttp({
    url: '/app/v1_0/article/reports',
    method: 'POST',
    data: {
      target: artid,
      type: type,
      remark: ''
    }
  })
}

// 封装方法：得到文章详情
export function apiGetDetail (artid) {
  return myhttp({
    url: `/app/v1_0/articles/${artid}`,
    method: 'GET'
  })
}

// 封装方法：对文章点赞
export function apiZan (artid) {
  return myhttp({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: {
      target: artid
    }
  })
}

// 封装方法：对文章取消点赞
export function apiDiszan (artid) {
  return myhttp({
    url: `/app/v1_0/article/likings/${artid}`,
    method: 'DELETE'
  })
}
