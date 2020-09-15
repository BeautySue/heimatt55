<template>
  <div class="my">
    <!-- 头部信息 -->
    <div class="head">
      <div class="user">
        <div class="userinfo">
          <img @click="$router.push('/info')" :src="userInfo.photo" alt="">
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="read">
          <div>今日阅读</div>
          <div>0分钟</div>
        </div>
      </div>
      <div class="msg">
        <div class="item">
          <div>{{ userInfo.art_count }}</div>
          <div>动态</div>
        </div>
        <div class="item">
          <div>{{ userInfo.follow_count }}</div>
          <div>关注</div>
        </div>
        <div class="item">
          <div>{{ userInfo.fans_count }}</div>
          <div>粉丝</div>
        </div>
      </div>
    </div>
    <!-- 收藏区域 -->
    <van-grid :column-num="3">
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="clock-o" text="历史" />
      <van-grid-item icon="orders-o" text="作品" />
    </van-grid>
    <!-- 消息区域 -->
    <van-cell-group>
      <van-cell is-link title="消息通知" />
      <van-cell is-link title="用户反馈" />
      <van-cell @click="$router.push('zhi')" is-link title="小智同学" />
    </van-cell-group>
  </div>
</template>

<script>
// 导入方法
import { apiGetUse } from '../../../api/user'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  async created () {
    // 得到用户信息
    const res = await apiGetUse()
    this.userInfo = res.data.data
  }
}
</script>

<style lang="less" scoped>
.my {
  .head {
    height: 200px;
    width: 100%;
    background-color: #3e9df8;
    overflow: hidden;
    color: #fff;
    .user {
      margin-top: 50px;
      margin-left: 30px;
      position: relative;
      .userinfo {
        display: flex;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      .read {
        position: absolute;
        top: 50%;
        right: 0px;
        transform: translateY(-50%);
        background-color: rgba(0, 0, 0, .4);
        font-size: 12px;
        text-align: center;
        padding: 3px 6px 3px 10px;
        border-radius: 20px 0 0 20px;
      }
    }
    .msg {
      margin-top: 30px;
      display: flex;
      .item {
        flex: 1;
        text-align: center;
      }
    }
  }
}
</style>
