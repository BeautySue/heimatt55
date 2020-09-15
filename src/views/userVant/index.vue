<template>
    <div style="margin-bottom: 100px">
        <h2>练习使用 vant </h2>
        <h3>1.0 使用 vant 中的 button</h3>
        <van-button @click="fn" type="default">默认按钮</van-button>
        <van-button type="primary">主要按钮</van-button>
        <van-button type="info">信息按钮</van-button>
        <van-button type="warning">警告按钮</van-button>
        <van-button type="danger">危险按钮</van-button>
        <h3>2.0 使用 vant 中的单元格</h3>
        <van-cell-group>
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" label="描述信息" />
        </van-cell-group>
        <h3>3.0 使用 vant 中的图标</h3>
        <van-icon name="like" />
        <van-icon name="star" />
        <h3>4.0 使用 vant 中的插槽</h3>
        <van-cell value="内容">
            <template #title>
                <van-icon name="like" />
                <span>单元格</span>
                <van-icon name="star" />
            </template>
        </van-cell>
        <h3>5.0 使用 vant 中 form 中的表单校验</h3>
        <van-form>
            <van-field v-model="value3" name="asyncValidator" placeholder="正则"
                :rules="myrules"
            />
            <van-field v-model="value4" name="asyncValidator1" placeholder="函数"
                :rules="myrules4"
            />
            <van-field v-model="value5" name="asyncValidator2" placeholder="异步函数"
                :rules="myrules5"
            />
        </van-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      value3: '1',
      // 使用正则进行校验
      myrules: [{ pattern: /^\d{6}$/, message: '请输入正确内容', trigger: 'onBlur' }],
      value4: '2',
      // 使用函数进行校验
      myrules4: [{ validator: this.validator, message: '请输入正确内容', trigger: 'onBlur' }],
      // 使用异步函数校验
      myrules5: [{ validator: this.asyncvalidator, message: '请输入正确内容', trigger: 'onBlur' }],
      value5: ''
    }
  },
  methods: {
    fn () {
      console.log('hello')
    },
    validator (val) {
      return /^\d{6}$/.test(val)
    },
    asyncvalidator (val) {
      // 同步校验：value 必须等于 123456
      // return val === '123456'
      // 异步校验
      return new Promise((resolve) => {
        this.$toast.loading('请等待')
        setTimeout(() => {
          this.$toast.clear()
          resolve(/^\d{6}$/.test(val))
        }, 1000)
      })
      // 要将参数提交到服务器进行校验，但是服务器处理是需要时间的
    }
  }
}
</script>

<style>
</style>
