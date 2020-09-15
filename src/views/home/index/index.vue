<template>
  <div class="index">
    <!-- 头部标题 -->
    <van-nav-bar :fixed="true" title="主页" class="i-title" z-index="99" />
    <!-- 频道区域 -->
    <van-tabs v-model="active" sticky :offset-top="46">
      <van-tab v-for="(item, index) in channelList" :title="item.name" :key="index" >
        <!-- 下拉刷新组件 -->
        <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
          <!-- 频道下的文章区域 -->
          <van-list v-model="item.loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="(subitem, subindex) in item.articleList" :key="subindex">
              <template #title>
                <!-- 文章的标题 -->
                <h4>{{ subitem.title }}</h4>
                <!-- 文章的图片：从服务器返回的数据中图片的数量可能有 0，1，3张 -->
                <van-grid v-if="subitem.cover.type !== 0" :border="false" :column-num="3">
                  <van-grid-item v-for="(imgitem, imgindex) in subitem.cover.images" :key="imgindex">
                    <van-image lazy-load :src="imgitem" />
                  </van-grid-item>
                </van-grid>
                <!-- 其它信息 -->
                <div class="box">
                  <div class="left">
                    <span>{{ subitem.aut_name }}</span>
                    <span> {{ subitem.comm_count }} 评论</span>
                    <span>{{ subitem.pubdate | timefilter }}</span>
                  </div>
                  <div class="right" @click="openmore(subitem)">
                    <van-icon name="cross" />
                  </div>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <div class="channelbtn" @click="openchannel">
      <van-icon name="bars" />
    </div>
    <!-- 添加一个频道操作的弹出层: 在 vue 中组件既可以以单标签存在也可以以双标签存在 -->
    <!-- <channel ref="mychannel" :channelList="channelList" :active="active" @update:active="e => active=e" /> -->
    <channel ref="mychannel" :channelList="channelList" :active.sync="active" />
    <!-- aa bb -->
    <!-- 如果一个属性与子组件是双向绑定的关系： -->
    <!-- 传入时使用 :xxx="value" -->
    <!-- 返回时使用事件： update:xxx -->
    <!-- 那么以上写可以简写为 :xxx.sync="value" -->
    <more ref="more" :artId="artId" :autId="autId" @delDislike="delDislike" />
  </div>
</template>

<script>
// 导入操作的频道的方法
import { apiGetChannel } from '../../../api/channel'
// 导入操作 local 的方法
import { localGet } from '../../../utils/mylocal'
// 导入操作 文章 的方法
import { apiGetArticleList } from '../../../api/article'
// 导入组件
import channel from './com/channel'
import more from './com/more'

export default {
  data () {
    return {
      // 当前 list 组件处于加载数据的状态
      // loading: false, // 加载下一页数据的状态
      // 当前 list 的数据源中的数据是否全部加载完毕
      // finished: false, // 数据源是否加载完毕的标识
      // list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      // isLoading: false, // 下拉刷新组件的刷新状态
      channelList: [], // 保存频道数据
      // tabs 中选中的 tab 下标
      active: 0,
      // 要操作的文章的 id
      artId: 0,
      // 定义一个作者 id
      autId: 0
    }
  },
  methods: {
    // 打开更多面板
    openmore (item) {
      this.$refs.more.show = true
      // 记录操作的文章 id
      this.artId = item.art_id
      // 记录文章的作者 id
      this.autId = item.aut_id
    },
    // 删除不感兴趣的数据
    delDislike (id) {
      // 根据 id 去当前选中的频道下的文章列表中删除数据
      // 得到当前选中的频道下的文章列表
      this.channelList[this.active].articleList.forEach((item, index) => {
        if (item.art_id === id) {
          // 将当前元素删除
          this.channelList[this.active].articleList.splice(index, 1)
        }
      })
    },
    // 请求服务器中的文章数据
    async onLoad () {
      // 得到当前选中的频道
      const currentChannel = this.channelList[this.active]
      // 得到当前选中频道的 id
      const id = currentChannel.id
      // 发送请求到服务器
      const res = await apiGetArticleList(id)
      console.log(res.data.data.results)
      // 保存文章数据
      currentChannel.articleList = [...currentChannel.articleList, ...res.data.data.results] // 每次会返回 10 条
      // 将 list 的加载状态设置为 false
      currentChannel.loading = false
      // 判断：判断数据是否已经加载完毕
      if (res.data.data.results.length === 0) {
        // 说明数据已经全部加载完毕
        currentChannel.finished = true
      }
    },
    async onRefresh () {
      // console.log('----------------页面不会出现空白------------------')
      // 就是将先请求服务器新的数据，再更新页面
      // 得到当前选中的频道 id
      const currentChannel = this.channelList[this.active]
      // 先得到服务器新的数据
      const res = await apiGetArticleList(currentChannel.id)
      // 将新的数据赋值给老的数据
      currentChannel.articleList = res.data.data.results
      currentChannel.loading = false
      currentChannel.finished = false
      currentChannel.isLoading = false
      // console.log('----------------页面不会出现空白------------------')
      // console.log('----------------页面会出现空白------------------')
      // // 得到当前有频道
      // const currentChannel = this.channelList[this.active]
      // // 清除当前频道下的所有数据
      // currentChannel.articleList = []
      // currentChannel.loading = false
      // currentChannel.finished = false
      // currentChannel.isLoading = false
      // // 重新加载数据
      // this.onLoad()
      // this.onLoad()
      // console.log('----------------页面会出现空白------------------')
    },
    // 得到频道数据
    async getChannel () {
      // 得到 token
      const token = this.$store.state.userInfo.token
      // 判断是否登录
      if (token) {
        // 直接从服务器中得到频道数据
        const res = await apiGetChannel()
        // 将数据保存起来
        this.channelList = res.data.data.channels
      } else {
        // 从 localstorage 中得到数据
        const localChannel = localGet('channels')
        // 判断 localstorage 中是否存在数据
        if (localChannel) {
          // 将本地保存的频道数据取出赋值给 channelList
          this.channelList = localChannel
        } else {
          // 直接从服务器中得到频道数据
          const res = await apiGetChannel()
          // 将数据保存起来
          this.channelList = res.data.data.channels
        }
      }
      // 得到了频道数据，给每个频道数据添加额外属性
      this.addOtherProp()
      console.log(this.channelList)
    },
    // 给数据源添加额外属性
    addOtherProp () {
      // 遍历数组
      this.channelList.forEach(item => {
        // 添加当前频道的文章列表
        // item.articleList = []
        this.$set(item, 'articleList', [])
        // 添加 list 的加载状态
        // item.loading = false
        this.$set(item, 'loading', false)
        // 添加 list 的完结状态
        // item.finished = false
        this.$set(item, 'finished', false)
        // 添加 refhresh 的下拉属性
        // item.isLoading = false
        this.$set(item, 'isLoading', false)
      })
    },
    // 打开频道操作面板
    openchannel () {
      this.$refs.mychannel.show = true
    },
    updateactive (e) {
      this.active = e
    }
  },
  created () {
    // 请求频道数据
    this.getChannel()
  },
  components: {
    channel,
    more
  }
}
</script>

<style lang="less" scoped>
.index {
  margin-top: 46px;
  margin-bottom: 50px;
  .i-title {
    background-color: #3e9df8;
    /deep/ .van-nav-bar__title {
      color: #fff;
    }
  }
  .channelbtn {
    position: fixed;
    top: 46px;
    right: 0px;
    z-index: 999;
    width: 10%;
    height: 44px;
    background-color: pink;
    text-align: center;
    line-height: 44px;
  }
  /deep/ .van-sticky {
      width: 90%;
  }
  .mycell {
    height: 100px;
  }
  .box {
    display: flex;
    justify-content: space-between;
    .left {
      span {
        margin-right: 10px;
      }
    }
    .right {
      border: 1px solid #ccc;
      width: 30px;
      height: 20px;
      text-align: center;
    }
  }
}
</style>
