<template>
  <div class="index">
    <!-- 头部标题 -->
    <van-nav-bar :fixed="true" title="主页" class="i-title" z-index="99" />
    <!-- 频道区域 -->
    <van-tabs sticky :offset-top="46">
      <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index" >
        <!-- 下拉刷新组件 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- 频道下的文章区域 -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <div class="channelbtn">
      <van-icon name="bars" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 当前 list 组件处于加载数据的状态
      loading: false, // 加载下一页数据的状态
      // 当前 list 的数据源中的数据是否全部加载完毕
      finished: false, // 数据源是否加载完毕的标识
      list: [],
      isLoading: false // 下拉刷新组件的刷新状态
    }
  },
  methods: {
    onLoad () {
      // 加载 20 条数据
      var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      // 将数据添加到 List 中
      this.list = [...this.list, ...arr]
      // 手机将加载状态设置为 false
      this.loading = false
      // 判断数据是否 100 条
      if (this.list.length >= 100) {
        this.finished = true
      }
      console.log(this.list.length)
    },
    onRefresh () {
      console.log('onRefresh')
      setTimeout(() => {
        // 清除数据
        this.list = []
        // 添加新的数据
        this.onLoad()
        // 将加载状态设置为 false
        this.isLoading = false
      }, 1000)
    }
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
}
</style>
