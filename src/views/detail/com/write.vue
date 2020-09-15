<template>
    <div class="write">
        <van-search shape="round" @search="onSearch" class="mysearch" background="red" left-icon="" v-model="value" show-action placeholder="写评论">
            <template #action>
                <van-button @click="onSearch" class="mybtn" type="primary">发送</van-button>
            </template>
        </van-search>
    </div>
</template>

<script>
// 导入操作评论的方法
import { apiAddComment, apiAddReply } from '../../../api/comment'
export default {
  // isReply: 判断是否是回复操作
  // comid: 评论的 id
  props: ['isReply', 'comid'],
  data () {
    return {
      value: ''
    }
  },
  methods: {
    // 添加评论
    async onSearch () {
      // 判断：是否是回复操作
      if (this.isReply) {
        // 是回复操作：添加评论的回复
        console.log('添加评论的回复')
        // 将用户输入的内容提交到服务器
        const res = await apiAddReply({
          comid: this.comid.toString(),
          content: this.value,
          artid: this.$route.params.artid
        })
        const mycom = res.data.data.new_obj
        // 将数据提交到父组件
        this.$emit('passcomment', mycom)
        // 清除内容
        this.value = ''
      } else {
        console.log('添加文章的评论')
        // 将评论的内容提交到服务器
        const res = await apiAddComment({
          artid: this.$route.params.artid,
          content: this.value
        })
        // 接收返回回的评论数据
        const mycom = res.data.data.new_obj
        // 使用子传父
        this.$emit('passcomment', mycom)
        // 清除输入框中的内容
        this.value = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.write {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    .mybtn {
        height: 34px;
        box-sizing: border-box;
    }
}
</style>
