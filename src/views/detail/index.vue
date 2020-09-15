<template>
    <div class="detail">
        <!-- 头部标题 -->
        <van-nav-bar left-arrow @click-left="$router.back()" :fixed="true" title="文章详情" class="i-title" z-index="99" />
        <!-- 文章标题 -->
        <h1>{{ detail.title }}</h1>
        <!-- 作者信息 -->
        <van-cell>
            <template #title>
                <div class="author">
                    <div class="img">
                        <img :src="detail.aut_photo" alt="">
                    </div>
                    <div class="msg">
                        <div>{{ detail.aut_name }}</div>
                        <div>{{ detail.pubdate | timefilter }}</div>
                    </div>
                    <div class="btn">
                        <van-button @click="follow(detail.aut_id)" type="info" v-if="detail.is_followed === false">
                            <van-icon name="plus" />关注
                        </van-button>
                        <van-button @click="unfollow(detail.aut_id)" type="info" v-else>
                            已关注
                        </van-button>
                    </div>
                </div>
            </template>
        </van-cell>
        <!-- 文章内容 -->
        <van-cell>
            <template #title>
                <div v-html="detail.content"></div>
            </template>
        </van-cell>
        <!-- 点赞 & 不喜欢 -->
        <div class="mybtns">
            <van-button @click="diszan" v-if="detail.attitude === 1" type="danger" plain  round>
                <van-icon name="like" />点赞
            </van-button>
            <van-button @click="zan" v-else type="default" plain round>
                <van-icon name="like" />点赞
            </van-button>
            <van-button v-if="detail.attitude === 0" type="danger" plain  round>
                <van-icon name="delete" />不喜欢
            </van-button>
            <van-button v-else type="default" plain round>
                <van-icon name="delete" />不喜欢
            </van-button>
        </div>
        <!-- 评论区域 -->
        <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多了" >
            <comment :isReply="false" :item="item" v-for="(item, index) in commentList" :key="index" />
        </van-list>
        <!-- 书写评论区域 -->
        <write :isReply="false" @passcomment="passcomment" />
        <!-- 使用回复面板 -->
        <reply ref="reply" />
    </div>
</template>

<script>
// 导入评论组件
import comment from './com/comment.vue'
import write from './com/write.vue'
// 导入回复面板
import reply from './com/reply'
// 导入操作文章的方法
import { apiGetDetail, apiZan, apiDiszan } from '../../api/article'
// 导入操作用户的方法
import { apiFollowed, apiUnFollow } from '../../api/user'
// 导入操作评论的方法
import { apiGetComment } from '../../api/comment'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      // 文章 id
      artid: this.$route.params.artid,
      // 文章详情
      detail: {},
      // 偏移量
      offset: null,
      // 页容量
      limit: 10,
      // 评论的结果
      commentList: [],
      // 评论的总条数
      totalCount: 0,
      // 结束的标识
      endid: null
    }
  },
  created () {
    // 得到文章详情
    this.getDetail()
  },
  methods: {
    // 接收评论
    passcomment (comment) {
      this.commentList.unshift(comment)
    },
    async onLoad () {
      // 调用接口得到当前文章对应的评论数据
      const res = await apiGetComment({
        artid: this.artid,
        offset: this.offset,
        limit: this.limit
      })
      // 保存数据
      this.commentList = [...this.commentList, ...res.data.data.results]
      this.offset = res.data.data.last_id
      this.endid = res.data.data.end_id
      this.totalCount = res.data.data.total_count
      // 将 loading 设置为 false
      this.loading = false
      // 判断数据是否加载完毕
      if (this.offset === this.endid) {
        this.finished = true
      }
    },
    // 得到文章详情
    async getDetail () {
      // 根据文章id得到文章详情
      const res = await apiGetDetail(this.artid)
      // 保存文章详情
      this.detail = res.data.data
    },
    // 关注作者
    async follow (autid) {
      await apiFollowed(autid)
      // 手动将关注的状态设置为 true
      this.detail.is_followed = true
    },
    // 取关作者
    async unfollow (autid) {
      await apiUnFollow(autid)
      // 手动将关注状态设置为 false
      this.detail.is_followed = false
    },
    // 点赞
    async zan () {
      // 请求服务器：对文章点赞
      await apiZan(this.detail.art_id)
      // 手动将态度改为 1
      this.detail.attitude = 1
    },
    // 取消点赞
    async diszan () {
      await apiDiszan(this.detail.art_id)
      // 手动将态度改为 -1
      this.detail.attitude = -1
    }
  },
  components: {
    comment,
    write,
    reply
  }
}
</script>

<style lang="less" scoped>
.detail {
    margin-top: 46px;
    margin-bottom: 54px;
    .i-title {
        background-color: #3e9df8;
        /deep/ .van-nav-bar__title {
            color: #fff;
        }
        /deep/.van-icon {
            color: #fff;
        }
    }
    h1 {
        text-align: center;
        padding: 20px 0px;
    }
    .author {
        display: flex;
        .img {
            img {
                width: 50px;
                height: 50px;
                padding-right: 10px;
            }
        }
        .msg {
            flex: 1;
        }
    }
    .mybtns {
        display: flex;
        justify-content: space-around;
        padding: 20px 0;
    }
}
</style>
