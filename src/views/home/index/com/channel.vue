<template>
  <div>
      <van-popup v-model="show" position="bottom" :style="{ height: '80%' }">
          <!-- 我的频道 -->
          <van-cell title="我的频道">
              <template #default>
                <!-- <van-button type="danger" round plain size="mini" v-if="cross=== false" @click="cross=true">编辑</van-button>
                <van-button type="danger" round plain size="mini" v-else @click="cross=false">完成</van-button> -->
                <van-button type="danger" round plain size="mini" @click="cross=!cross">{{ cross === false ? '编辑': '完成' }}</van-button>
              </template>
          </van-cell>
          {{ active }}
          <van-grid>
            <van-grid-item @click="changeChannel(index)" class="itemf" v-for="(item, index) in channelList" :key="index">
                <template #text>
                    <span class="myword" :class="{ active: active === index }">{{ item.name }}</span>
                    <van-icon @click.stop="delChannel(index)" v-if="cross && index !== 0" class="items" name="clear" />
                </template>
            </van-grid-item>
          </van-grid>
          <!-- 频道推荐 -->
          <van-cell title="频道推荐"></van-cell>
          <van-grid>
            <van-grid-item @click="addChannel(item)" v-for="(item, index) in tuijianChannel" :key="index" :text="item.name" />
          </van-grid>
      </van-popup>
  </div>
</template>

<script>
//  ||  或者 && 并且
// 导入操作频道的方法
import { apiGetAllChannel, processChannel } from '@/api/channel.js'
// 导入操作 lcaol 的方法
import { localSet } from '@/utils/mylocal.js'
export default {
  // channelList：我的频道
  // active: 当前选中的频道
  props: ['channelList', 'active'],
  data () {
    return {
      // 控制面板的显示与隐藏
      show: false,
      // 控制叉叉的显示与隐藏
      cross: false,
      // 所有的频道数据
      allChannel: []
    }
  },
  methods: {
    async getAllChannel () {
      const res = await apiGetAllChannel()
      this.allChannel = res.data.data.channels
    },
    // 添加频道
    async addChannel (item) {
      // 添加额外属性
      this.$set(item, 'articleList', [])
      this.$set(item, 'loading', false)
      this.$set(item, 'finished', false)
      this.$set(item, 'isLoading', false)
      // 将 item 添加到我的频道中
      this.channelList.push(item)
      // 将 item 从频道推荐中删除(由于计算属性的原因，这个功能可以不写)
      // 保存频道数据
      // 判断用户是否登录
      // 得到 token
      const token = this.$store.state.userInfo.token
      if (!token) {
        // 说明未登录：将修改后的频道数据保存到本地 localstorage 中
        localSet(this.channelList, 'channels')
      } else {
        // 说明已登录：将修改后的频道数据提交到服务器
        // 得到接口所需的数据结构 [{ id: '频道的id', seq: '频道的顺序' }]
        // 由于推荐频道不能操作，因为它永远都是第一个，所以需要将频道从数据源中排除
        var newArr = this.channelList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        await processChannel(newArr)
      }
    },
    // 删除频道
    async delChannel (index) {
      // 将下标为 index 的元素从数组中删除
      this.channelList.splice(index, 1)
      // 保存操作之后数据
      // 用户的登录信息
      const token = this.$store.state.userInfo.token
      // 判断用户是否登录
      if (!token) {
        // 保存到本地
        localSet(this.channelList, 'channels')
      } else {
        // 提交到服务器
        // 生成频道数据
        var newArr = this.channelList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        await processChannel(newArr)
      }
    },
    // 改变选中的频道
    changeChannel (index) {
      // 不能直接在子组件中修改父组件中传入的内容
      // 应该将 index 提交到父组 件中，在父组件中修改
      this.$emit('update:active', index)
    }
  },
  created () {
    // 得到所有的频道数据
    this.getAllChannel()
  },
  // 定义一个计算属性
  computed: {
    tuijianChannel () {
      // 开始从一个数组中去掉另一个数组中的元素
      // 1.0 得到我的数组中所有元素的 id
      const ids = this.channelList.map(item => {
        return item.id
      })
      // 2.0 遍历所有频道数据
      const newArr = this.allChannel.filter(item => {
        return !ids.includes(item.id)
      })
      // 返回新的数组
      return newArr
    }
  }
}
</script>

<style lang="less" scoped>
.itemf {
    position: relative;
    .items {
        position: absolute;
        top: 0;
        right: 0;
        color: #666;
        font-size: 12px;
    }
    .myword {
        color: #646566;
        font-size: 12px;
    }
    .active {
      color: red;
    }
}
</style>
