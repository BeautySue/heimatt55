<template>
    <div class="result">
        <!-- 头部导航 -->
        <van-nav-bar left-arrow @click-left="onClickLeft" :fixed="true" title="搜索结果" class="i-title" z-index="99" />
        {{ key }}
        <!-- 文章列表 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell @click="toDetail(item)" v-for="(item, index) in searchList" :key="index">
                <template #title>
                    <!-- 文章的标题 -->
                    <h4>{{ item.title }}</h4>
                    <!-- 文章的图片：从服务器返回的数据中图片的数量可能有 0，1，3张 -->
                    <van-grid v-if="item.cover.type !== 0" :border="false" :column-num="3">
                        <van-grid-item v-for="(imgitem, imgindex) in item.cover.images" :key="imgindex">
                            <van-image lazy-load :src="imgitem" />
                        </van-grid-item>
                    </van-grid>
                    <!-- 其它信息 -->
                    <div class="box">
                        <div class="left">
                            <span>{{ item.aut_name }}</span>
                            <span> {{ item.comm_count }} 评论</span>
                            <span>{{ item.pubdate }}</span>
                        </div>
                    </div>
                    <!-- 操作按钮 -->
                    <van-grid direction="horizontal" :column-num="3">
                        <van-grid-item @click="commit" icon="comment-o" :text="item.comm_count.toString()" />
                        <van-grid-item icon="like-o" text="点赞" />
                        <van-grid-item icon="exchange" text="分享" />
                    </van-grid>
                </template>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
// 导入操作搜索的方法
import { apiGetResult } from '@/api/search'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      // 得到搜索的关键字
      key: this.$route.params.key,
      // 定义当前页数
      page: 1,
      // 定义页容量
      perpage: 10,
      // 定义一个变量来保存搜索结果
      searchList: [],
      // 保存总条数
      total: 0
    }
  },
  methods: {
    async onLoad () {
      const res = await apiGetResult({
        page: this.page,
        perpage: this.perpage,
        key: this.key
      })
      // 保存搜索结果
      this.searchList = [...this.searchList, ...res.data.data.results]
      this.total = res.data.data.total_count
      // 将 list 的加载状态设置为 false
      this.loading = false
      // 将当前页 +1
      this.page++
      // 判断 list 的数据源是否加载完毕
      if (this.total === this.searchList.length) {
        this.finished = true
      }
    },
    onClickLeft () {
      // 路由的回退：this.$router.back()
      this.$router.back()
    },
    // 点击留言按钮时触发
    commit () {
      //   // 进行登录判断: 如果登录，就继续向下执行;如果未登录，就提示用户未登录，跳转到登录页面
      //   // 得到 token
      //   const token = this.$store.state.userInfo.token
      //   if (!token) {
      //     // 提示用户未登录
      //     this.$toast('对不起，您还没有登录')
      //     this.$router.push('/login')
      //     return
      //   }
      //   console.log('留言')
      if (!this.$login()) {
        return // 结束后续代码的执行
      }
      console.log('留言')
    },
    // 跳转到详情页面
    toDetail (item) {
      this.$router.push(`/detail/${item.art_id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.result {
    margin-top: 46px;
    .i-title {
        background-color: #3e9df8;
        /deep/ .van-nav-bar__title {
            color: #fff;
        }
        /deep/.van-icon {
            color: #fff;
        }
    }
}
</style>
