// 使用自定义过滤器，来处理时间：
//      将绝对时间转为相对时间

// 1.0 下载 dayjs
// 2.0 导入 dayjs
import dayjs from 'dayjs'
// 3.0 导入相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 4.0 导入语言包
import 'dayjs/locale/zh-cn'
// 5.0 导入 vue
import Vue from 'vue'

// 扩展插件 & 语言包
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

// 6.0 定义一个时间的过滤器
Vue.filter('timefilter', function (value) {
  // value 使用过滤器的参数
  return dayjs().from(value)
})
