<template>
  <div class="more">
      <van-popup class="mypop" v-model="show">
          <van-cell-group v-if="isReport === false">
            <van-cell icon="bill-o" @click="dislike" title="不感兴趣" />
            <van-cell class="bor" @click="isReport=true" icon="warn-o" title="反馈垃圾内容" is-link/>
            <van-cell icon="delete" @click="blackList" title="拉黑作者" />
          </van-cell-group>
          <van-cell-group v-else>
            <van-cell @click="isReport=false" icon="arrow-left"></van-cell>
            <van-cell @click="report(item.type)" v-for="(item, index) in reportType" :key="index" :title="item.name"></van-cell>
          </van-cell-group>
          {{ artId }} &nbsp;&nbsp;&nbsp;&nbsp; {{ autId }}
      </van-popup>
  </div>
</template>

<script>
// 导入操作文章的方法
import { apiDisLike, apiReport } from '@/api/article'
// 导入操作用户的方法
import { apiBlackList } from '@/api/user.js'
export default {
  // artId: 要操作的文章 id
  // autId: 作者 id
  props: ['artId', 'autId'],
  data () {
    return {
      show: false,
      // 举报的类型
      reportType: [
        { type: 0, name: '其他问题' },
        { type: 1, name: '标题夸张' },
        { type: 2, name: '低俗色情' },
        { type: 3, name: '错别字多' },
        { type: 4, name: '旧闻重复' },
        { type: 5, name: '广告软文' },
        { type: 6, name: '内容不实' },
        { type: 7, name: '涉嫌违法犯罪' },
        { type: 8, name: '侵权' }
      ],
      // 是否举报
      isReport: false
    }
  },
  methods: {
    // 不感兴趣
    async dislike () {
      // 将 artId 对应的数据从文章列表中删除（由于这些数据在父组件： index.vue 中）
      // 我们需要在子组（more）中调用父组件中的方法来进行删除
      this.$emit('delDislike', this.artId)
      // 将文章信息提交到服务器标记不喜欢
      const res = await apiDisLike(this.artId)
      console.log(res)
    },
    // 举报文章
    async report (type) {
      // 得到文章 id: this.artId
      // 举报的类型 type
      await apiReport({
        artid: this.artId,
        type: type
      })
      // 关闭面板
      this.show = false
      // 设置回非举报状态
      this.isReport = false
      // 提示用户举报信息
      this.$toast.success('您的反馈，我们已经接收，我们会在三个工作日内给您答案，请而心等待')
    },
    async blackList () {
      try {
        // 拉黑作者
        await apiBlackList(this.autId)
        // 关闭面板
        this.show = false
        this.$toast.success('拉黑成功')
      } catch (error) {
        this.$toast.fail(error.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.more {
    .mypop {
        width: 90%;
        border-radius: 5px;
        .bor {
            border-top: 1px solid #c4c4c4;
            border-bottom: 1px solid #c4c4c4;
        }
    }
}
</style>
