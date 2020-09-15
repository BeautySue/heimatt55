<template>
    <div class="zhi">
        <!-- 头部标题 -->
        <van-nav-bar left-arrow @click-left="$router.back()" :fixed="true" title="小智同学" class="i-title" z-index="99" />
        <!-- 聊天内容 -->
        <div class="box" ref="box">
            <div class="item" v-for="(item, index) in charArr" :key="index">
                <img :class="{userimg: item.isRoboto === false}" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2580028855,3121465141&fm=26&gp=0.jpg" alt="">
                <div :class="{usercontent: item.isRoboto === false}" class="content">
                    {{ item.msg }}
                </div>
            </div>
        </div>
        <!-- 发送内容区域 -->
        <van-search class="search" background="#ccc" shape="round" left-icon="" v-model="value" show-action @search="onSearch">
            <template #action>
                <van-button @click="onSearch" type="primary">发送</van-button>
            </template>
        </van-search>
    </div>
</template>

<script>
// 导入 io
import io from 'socket.io-client'
export default {
  data () {
    return {
      value: '',
      // 聊天的数组
      charArr: [
        { msg: '我是小智同学', isRoboto: true },
        { msg: '你好啊，我是小明', isRoboto: false }
      ],
      // 创建一个 socket 对象
      socket: null
    }
  },
  methods: {
    onSearch () {
      // 得到输入框中的内容并且提交到服务器: this.value
      // 先将发送的内容保存到数组中
      this.charArr.push({
        msg: this.value,
        isRoboto: false
      })
      // 创建一个 socket 对象
      this.socket.emit('message', {
        msg: this.value,
        timestamp: Date.now()
      })
    }
  },
  created () {
    // 使用 socket 去连接服务器
    this.socket = io(`http://ttapi.research.itcast.cn?token=${this.$store.state.userInfo.token}`)
    // 接收服务器的响应信息
    this.socket.on('message', data => {
      // 将数据添加到聊天的数组中
      this.charArr.push({
        msg: data.msg,
        isRoboto: true
      })
    })
  }
}
</script>

<style lang="less" scoped>
.zhi {
    .i-title {
        background-color: #3e9df8;
        /deep/ .van-nav-bar__title {
            color: #fff;
        }
        /deep/.van-icon {
            color: #fff;
        }
    }
    .search {
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 100%;
    }
    .box {
        background-color: #ececec;
        width: 100%;
        position: fixed;
        left: 0;
        top: 46px;
        bottom: 64px;
        .item {
            overflow: hidden;
            margin: 10px;
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                float: left;
                margin-right: 10px;
            }
            .content {
                float: left;
                background: #cecece;
                padding: 8px;
                border-radius: 5px;
                max-width: 70%;
            }
            .userimg {
                float: right;
                margin-right: 0px;
                margin-left: 10px;
            }
            .usercontent {
                float: right;
            }
        }
    }
}
</style>
