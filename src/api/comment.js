// 封装所有评论相关的网络请求
import myhttp from '../utils/myhttp'

// 封装方法：得到文章的评论
export function apiGetComment ({ artid, offset, limit }) {
  return myhttp({
    url: '/app/v1_0/comments',
    method: 'GET',
    params: {
      type: 'a',
      source: artid,
      offset: offset, // 第一页不用传(如果传入的参数是 null, axios 会自动将这个参数干掉)
      limit: limit
    }
  })
}

// 封装方法：添加文章的评论
export function apiAddComment ({ artid, content }) {
  return myhttp({
    url: '/app/v1_0/comments',
    method: 'POST',
    data: {
      target: artid,
      content: content
    }
  })
}

// 封装方法：得到评论的回复内容
export function apiGetReply ({ commid, offset, limit }) {
  return myhttp({
    url: '/app/v1_0/comments',
    method: 'GET',
    params: {
      type: 'c',
      source: commid,
      offset: offset,
      limit: limit
    }
  })
}

// 封装方法：添加评论的回复
export function apiAddReply ({ comid, content, artid }) {
  return myhttp({
    url: '/app/v1_0/comments',
    method: 'POST',
    data: {
      target: comid,
      content: content,
      art_id: artid
    }
  })
}
