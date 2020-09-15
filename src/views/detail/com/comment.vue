<template>
    <div class="comment">
        <van-cell>
            <template #title>
                <div class="combox">
                    <div class="img">
                        <img :src="item.aut_photo" alt="">
                    </div>
                    <div class="msg">
                        <div class="name">{{ item.aut_name }}</div>
                        <div class="content">{{ item.content }}</div>
                        <div class="other">
                            <span>{{ item.pubdate | timefilter }}</span>
                            <span v-if="isReply === false" @click="openreply" class="reply">回复 {{ item.reply_count }}</span>
                        </div>
                    </div>
                    <div class="like">
                        <van-icon name="like" /> {{ item.like_count }}
                    </div>
                </div>
            </template>
        </van-cell>
    </div>
</template>

<script>
// 导入 bus
import bus from '../../../utils/bus'
export default {
  // item：当前组件的数据源
  // isReply：控制回复按钮是否显示
  props: ['item', 'isReply'],
  methods: {
    // 打开回复面板
    openreply () {
      //   // 得到当前组件的父组件 van-list
      //   console.log(this.$parent)
      //   // 再得到 vant-list 的父组件： detail
      //   console.log(this.$parent.$parent)
      //   // 再得到 detail 的子组件 reply
      //   console.log(this.$parent.$parent.$refs.reply.show)
      this.$parent.$parent.$refs.reply.show = true
      // 将数据传入到 bus
      bus.$emit('passval', this.item)
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
    .combox {
        display: flex;
        .img {
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 10px;
            }
        }
        .msg {
            flex: 1;
            .name {
                color: #0094ff;
            }
            .content {
                padding: 10px 0 10px 10px;
            }
            .other {
                .reply {
                    background-color: #ccc;
                    padding: 5px 10px;
                    border-radius: 20px;
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>
