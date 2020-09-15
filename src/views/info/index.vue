<template>
    <div class="info">
        <!-- 个人信息 -->
        <van-nav-bar left-arrow @click-left="$router.back()" right-text="保存" @click-right="onClickRight" :fixed="true" title="个人信息" class="i-title" z-index="99" />
        <!-- 头像 & 昵称 & 介绍 -->
        <van-cell-group>
            <van-cell @click="updateimg" title="头像" is-link>
                <template #default>
                    <img style="width:30px;height:30px;border-radius:50%;" :src="userObj.photo" alt="">
                </template>
            </van-cell>
            <van-cell @click="changename" title="昵称" is-link :value="userObj.name"/>
            <van-cell title="介绍" is-link :value="userObj.intro" />
        </van-cell-group>
        <!-- 性别 & 生日 -->
        <van-cell-group>
            <van-cell title="性别" :value="userObj.gender === 0 ? '男': '女'" />
            <van-cell title="生日" :value="userObj.birthday" />
        </van-cell-group>
        <!-- name 的弹出层 -->
        <van-popup v-model="nameshow" position="bottom" :style="{ height: '7%' }">
            <van-field required v-model="userObj.name" />
        </van-popup>
        <!-- 头像上传框 -->
        <imgpop @updatephoto="updatephoto" ref="imgpop" />
    </div>
</template>

<script>
// 导入操作用户的方法
import { apiGetUse, apiGetUseInfo, apiUpdateUserInfo } from '../../api/user'
// 导入头像操作面板
import imgpop from './com/imgpop.vue'
export default {
  data () {
    return {
      userObj: {},
      // 控制 name 面板的显示与隐藏
      nameshow: false
    }
  },
  methods: {
    // 打开图片选择器
    updateimg () {
      this.$refs.imgpop.show = true
    },
    changename () {
      // 打开一个面板，用来渲染名字
      this.nameshow = true
    },
    // 点击保存触发事件
    async onClickRight () {
      try {
        // 得到修改后的数据，并且将数据提交到服务器
        await apiUpdateUserInfo(this.userObj)
        // 提示用户修改成功
        this.$toast.success('修改成功')
      } catch (err) {
        this.$toast.fail(err.message)
      }
    },
    // 上传图片
    updatephoto (photo) {
      this.userObj.photo = photo
    }
  },
  async created () {
    // 得到用户信息：
    //   头像 & 昵称 & 介绍
    const res1 = await apiGetUse()
    this.$set(this.userObj, 'photo', res1.data.data.photo)
    this.$set(this.userObj, 'name', res1.data.data.name)
    this.$set(this.userObj, 'intro', res1.data.data.intro)
    //   性别 & 生日
    const res2 = await apiGetUseInfo()
    this.$set(this.userObj, 'birthday', res2.data.data.birthday)
    this.$set(this.userObj, 'gender', res2.data.data.gender)
  },
  components: {
    imgpop
  }
}
</script>

<style lang="less" scoped>
.info {
    margin-top: 46px;
    .i-title {
        background-color: #3e9df8;
        /deep/ .van-nav-bar__title {
            color: #fff;
        }
        /deep/.van-icon {
            color: #fff;
        }
        /deep/ .van-nav-bar__text {
            color: #fff;
        }
    }
}
</style>
