<template>
  <div class="search">
      <!-- 头部标题 -->
      <van-search @input="think" v-model="value" background="#3296fa" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
      <!-- 联想区域 -->
      <van-cell-group v-if="thinkList.length != 0">
        <van-cell title="联想区域" />
        <van-cell @click="onSearch(item.oldItem)" v-for="(item, index) in thinkList" :key="index" icon="search">
            <template #title>
                <div v-html="item.newItem"></div>
            </template>
        </van-cell>
      </van-cell-group>
      <!-- 历史区域 -->
      <van-cell-group v-else>
        <van-cell title="搜索历史">
            <template #default><van-icon @click="delAll" name="delete" /></template>
        </van-cell>
        <van-cell @click="onSearch(item)" v-for="(item, index) in historyList" :key="index" icon="search" :title="item">
            <template #default><van-icon @click.stop="delhistory(index)" name="cross" /></template>
        </van-cell>
      </van-cell-group>
  </div>
</template>

<script>
// 导入搜索相关的方法
import { apiGetThink } from '@/api/search'
// 导入操作 local 的方法
import { localSet, localGet, localDel } from '@/utils/mylocal.js'
export default {
  data () {
    return {
      value: '',
      // 联想的数据源
      thinkList: [],
      // 定义一个防抖的定时器
      timer: null,
      // 存储搜索历史
      historyList: localGet('history') || []
    }
  },
  methods: {
    // 点击键盘上的完成按钮时触发
    // val 输入框中的内容
    onSearch (val) {
      // 1.0 得到输入框中的关键字 val
      // 2.0 跳转到搜索结果
      // 在 vue 中页面之间的传参（组件之间的传参）
      this.$router.push(`/searchResult/${val}`) // 动态路由传参
      // 保存搜索数据
      this.historyList.unshift(val)
      // 数组的去重
      this.historyList = [...new Set(this.historyList)]
      // 保存到本地
      localSet(this.historyList, 'history')
    },
    // 点击取消按钮时触发：会清空输入框
    onCancel () {
      console.log('onCancel')
    },
    // 在输入框中输入内容时触发
    think (val) {
      // 判断
      if (val.trim().length === 0) {
        // 内容为空: 停止向后执行 & 清空数组
        this.thinkList = []
        return
      }
      // 进行防抖操作
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        // 将 val 提交到服务器，得到相关的联想内容
        const res = await apiGetThink(val)
        // 保存数据
        this.thinkList = res.data.data.options
        // 遍历 thinkList， 将每个元素的中的 abc 替换为 <span style="color: red"></span>
        this.thinkList = this.thinkList.map(item => {
          return {
            newItem: item.replace(val, `<span style="color: red">${val}</span>`),
            oldItem: item
          }
        })
      }, 300)
    },
    // 删除选中的历史数据
    delhistory (index) {
      this.historyList.splice(index, 1)
      // 将操作之后的结果保存到本地
      localSet(this.historyList, 'history')
    },
    // 删除全部
    delAll () {
      // 打开一个弹窗
      this.$dialog.confirm({
        title: '提示',
        message: '是否清空历史记录'
      })
        .then(() => {
          // 将 historyList 清空
          this.historyList = []
          // 将本地数据也清空
          localDel('history')
        })
        .catch(() => {
          // on cancel
          console.log('取消')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.search {
    .van-search__action {
        color: #fff;
    }
    .van-search__action:active {
        background-color: #3296fa;
        color: red;
    }
}

</style>
