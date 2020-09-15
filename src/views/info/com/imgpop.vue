<template>
  <div class="imgpop">
      <van-popup :close-on-click-overlay="false" class="mypop" v-model="show">
          <div @click="openFile">从相册中选择</div>
          <input @change="imgChange" ref="myfile" type="file" style="display:none">
          <div class="middle">拍照</div>
          <div @click="show=false">取消</div>
      </van-popup>
  </div>
</template>

<script>
// 导入图片预览框
import { ImagePreview } from 'vant'
// 导入上传图片的方法
import { apiUpdateImg } from '../../../api/user'
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    // 打开图片
    openFile () {
      // 触发 上传框的点击事件
      this.$refs.myfile.click()
    },
    // 当选中的图片发生变化时触发
    imgChange () {
      // 得到 input:type=file 中选择的图片
      const file = this.$refs.myfile.files[0]
      // 将图片对象转为一个虚拟地址
      // 方式一：
      //   const path = URL.createObjectURL(file)
      // 方式二： 使用 fileReader 将 file 转为 base64 格式的 url
      // 创建一个 filerenader
      const reader = new FileReader()
      // 开始转换
      reader.readAsDataURL(file)
      // 设置事件：设置转换成功之后的事件(这个事件会在转换成功之后触发)
      reader.addEventListener('load', () => {
        // 预览图片
        ImagePreview({
          images: [reader.result],
          onClose: this.closeMethod
        })
      })
    },
    // 关闭图片之后的事件
    closeMethod () {
      // 关闭图片操作面板
      this.show = false
      // 弹出一个提示框
      this.$dialog.confirm({
        message: '是否设置图片为头像'
      }).then(async () => {
        // 得到上传的图片
        const file = this.$refs.myfile.files[0]
        // 将图片提交到服务器
        const res = await apiUpdateImg(file)
        // 接收服务器返回的数据
        const photo = res.data.data.photo
        // 将图片传给父组件
        this.$emit('updatephoto', photo)
        // 提示用户图片上传成功
        this.$toast.success('图片上伟主成功')
      }).catch(() => {
        console.log('取消')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.imgpop {
    .mypop {
        width: 90%;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        .middle {
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
        }
    }
}
</style>
