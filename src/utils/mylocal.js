// 封装操作 local 的方法
// 存储方法
export function localSet (value, key = 'userInfo') {
  window.localStorage.setItem(key, JSON.stringify(value))
}

// 获取的方法
export function localGet (key = 'userInfo') {
  return JSON.parse(window.localStorage.getItem(key))
}

// 删除方法
export function localDel (key = 'userInfo') {
  window.localStorage.removeItem(key)
}
