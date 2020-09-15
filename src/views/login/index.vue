<template>
    <div class="login">
        <!-- 完成静态页面 -->
        <!-- 头部标题 -->
        <van-nav-bar title="登录" class="l-title" />
        <!-- 输入框区域 -->
        <van-cell-group>
            <van-form @submit="onSubmit">
                <van-field :rules="rules.mobile" v-model="user.mobile" placeholder="请输入手机号">
                    <template #left-icon>
                        <span class="iconfont icon-shouji"></span>
                    </template>
                </van-field>
                <van-field :rules="rules.code" v-model="user.code" placeholder="请输入密码">
                    <template #button>
                        <van-button round class="codebtn" size="small" color="#ededed">发送验证码</van-button>
                    </template>
                    <template #left-icon>
                        <span class="iconfont icon-lock"></span>
                    </template>
                </van-field>
                <!-- 登录按钮 -->
                <div class="loginbtn">
                    <van-button :loading="isLoading" type="info" size="large">登录</van-button>
                </div>
            </van-form>
        </van-cell-group>
    </div>
</template>

<script>
// 导入操作用户的方法
import { apiLogin } from '../../api/user'
// 导入操作 local 的方法
import { localSet } from '../../utils/mylocal'
export default {
  data () {
    return {
      // 登录的数据
      user: {
        mobile: '13911112222',
        code: '246810'
      },
      // 数据的校验规则
      rules: {
        mobile: [
          { required: true, message: '请填写手机号', trigger: 'onBlur' }
        ],
        code: [
          { required: true, message: '请填写手机号', trigger: 'onBlur' }
        ]
      },
      // 是否处于登录状态
      isLoading: false
    }
  },
  methods: {
    async onSubmit () {
      // 判断当前是否处于加载状态
      if (this.isLoading === true) {
        // 终止后续代码的执行
        return
      }
      // 进入 Loading 状态
      this.isLoading = true
      try {
        var res = await apiLogin(this.user)
        // 保存用户的登录信息： token & refresh_token
        // 保存信息到 vuex 中
        this.$store.commit('setUserInfo', res.data.data)
        // 保存到 localstorage 中
        // window.localStorage.setItem('userInfo', JSON.stringify(res.data.data))
        localSet(res.data.data)
        // console.log(this.$route.path) // login & checklogin
        if (this.$route.path === '/login') {
          // 跳转到首页
          this.$router.push('/home')
        } else {
          // 回退到上一个页面
          this.$router.back()
        }
      } catch (err) {
        this.$toast.fail(err.message)
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
// scoped：将当前样式设置为局部样式（这里的样式只会在当前页面中生效）
// 如果设置了 scoped 并且希望样式能够作用到子组件中，可以添加一个选择器：深度选择器 /deep/
// 注意：/deep/ >>> ::v-deep 都是深度选择器
.login {
    .l-title {
        background-color: #3e9df8;
        /deep/ .van-nav-bar__title {
            color: #fff;
        }
    }
    .codebtn {
        padding: 5px; // border-radius: 15px;
        /deep/ .van-button__text {
            color: #666;
        }
    }
    .loginbtn {
        margin: 20px;
    }
}
</style>
