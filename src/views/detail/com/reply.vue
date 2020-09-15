<template>
  <div class="reply">
      <van-popup v-model="show" position="bottom" :style="{ height: '70%' }">
          <!-- 当前评论 -->
          <van-cell title="当前评论"></van-cell>
          <comment :isReply="true" :item="currentComment" />
          <!-- 评论的回复 -->
          <van-cell title="评论的回复"></van-cell>
          <van-list @load="onLoad" v-model="loading" :finished="finished" finished-text="没有更多了">
            <comment v-for="(item, index) in replyList" :key="index" :item="item" :isReply="true" />
          </van-list>
          <!-- write 组件 -->
          <write :isReply="true" @passcomment="passcomment" :comid="currentComment.com_id" />
      </van-popup>
  </div>
</template>

<script>
// 导入 comment 组件
import comment from './comment'
import write from './write'
// 导入操作评论的方法
import { apiGetReply } from '../../../api/comment'
// 导入 bus
import bus from '../../../utils/bus'
export default {
  data () {
    return {
      show: false,
      // 当前评论数据
      currentComment: {},
      loading: false,
      finished: false,
      // 定义分页的标识
      offset: null,
      // 定义页容量
      limit: 10,
      // 得到完结标识
      endid: null,
      // 回复列表
      replyList: []
    }
  },
  components: {
    comment,
    write
  },
  methods: {
    async onLoad () {
      // 得到当前评论的回复内容
      const res = await apiGetReply({
        commid: this.currentComment.com_id.toString(),
        offset: this.offset,
        limit: 10
      })
      this.replyList = [...this.replyList, ...res.data.data.results]
      this.offset = res.data.data.last_id
      this.endid = res.data.data.end_id
      // list 组件的加载状态
      this.loading = false
      // 判断数据是否加载完毕
      if (this.offset === this.endid) {
        this.finished = true
      }
    },
    // 添加评论的回复
    passcomment (item) {
      // 将评论的回复添加 replyList
      this.replyList.unshift(item)
      // 将当前评论的数量 加 1
      this.currentComment.reply_count += 1
    }
  },
  created () {
    // 监听 bus 的事件
    bus.$on('passval', value => {
      this.currentComment = value
      // 清除其它数据
      this.loading = false
      this.finished = false
      this.offset = null
      this.endid = null
      this.replyList = []
    })
  }
}
</script>

<style>

</style>
