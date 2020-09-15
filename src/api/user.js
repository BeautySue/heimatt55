// 管理所有与用户相关的网络请求
// 导入 myhttp.js
import myhttp from '../utils/myhttp.js'

// 封装方法：登录
function apiLogin ({ mobile, code }) {
  return myhttp({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile: mobile,
      code: code
    }
  })
}

// 封装方法：拉黑作者
function apiBlackList (autid) {
  return myhttp({
    url: '/app/v1_0/user/blacklists',
    method: 'POST',
    data: {
      target: autid
    }
  })
}

// 封装方法：关注用户
function apiFollowed (autid) {
  return myhttp({
    url: '/app/v1_0/user/followings',
    method: 'POST',
    data: {
      target: autid
    }
  })
}

// 封装方法：取关用户
function apiUnFollow (autid) {
  return myhttp({
    url: `/app/v1_0/user/followings/${autid}`,
    method: 'DELETE'
  })
}

// 封装方法：得到用户信息
function apiGetUse () {
  return myhttp({
    url: '/app/v1_0/user',
    method: 'GET'
  })
}

// 封装方法：得到用户个人信息
function apiGetUseInfo () {
  return myhttp({
    url: '/app/v1_0/user/profile',
    method: 'GET'
  })
}

// 封装方法：修改用户的个人信息
function apiUpdateUserInfo ({ name, gender, birthday, intro }) {
  return myhttp({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name: name,
      gender: gender,
      birthday: birthday,
      intro: intro
    }
  })
}

// 封装方法：修改用户的头像
function apiUpdateImg (photo) {
  // ajax axios => XMLHttpRequest => 异步对象（默认情况下不能提交文件信息）
  // 如果一定要提交，使用 formDate 来传参
  var fd = new FormData()
  fd.append('photo', photo)
  return myhttp({
    url: '/app/v1_0/user/photo',
    method: 'PATCH',
    data: fd
  })
}

// 导出方法
export {
  apiLogin,
  apiBlackList,
  apiFollowed,
  apiUnFollow,
  apiGetUse,
  apiGetUseInfo,
  apiUpdateUserInfo,
  apiUpdateImg
}
