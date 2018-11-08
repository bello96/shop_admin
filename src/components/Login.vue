<template>
    <div class="login">
        <!-- el-form: 表单组件 -->
        <!-- :model="form" form对象用来收集表单中所有的数据-->
        <!-- label-width  设置label的宽度 -->
        <!-- el-form-item 表单相 -->
        <!-- rules: 设置校验规则  给每一个el-form-item设置一个prop属性 v-model的值一样-->
        <el-form  :model="form" label-width="80px" status-icon ref="form" :rules="rules">
            <img src="../assets/2.jpg" alt="">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
            <el-button @click="login" type="primary">登录</el-button>
            <el-button @click='reset'>重置</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 引入axios
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        // 对username进行校验
        username: [
          // 必填项
          { required: true, message: '请输入用户名', trigger: 'change' },
          // 校验长度
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'change' }
        ],
        password: [
          // 必填项
          { required: true, message: '请输入用户名', trigger: 'change' },
          // 校验长度
          {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    // 重置表单
    reset() {
      // 获取表单组件,调用resetFields
      this.$refs.form.resetFields()
    },
    // 登录
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 校验通过
          //   console.log('校验通过')
          // 发送ajax请求
          axios({
            url: 'http://localhost:8888/api/private/v1/login',
            method: 'post',
            data: this.form
          }).then(res => {
            if (res.data.meta.status === 200) {
              // 登录成功
              this.$message.success('登录成功')
              // 存储token
              localStorage.setItem('token', res.data.data.token)
              // 跳转到home组件
              this.$router.push('/home')
            } else {
              // 登录失败
              this.$message.error(res.data.meta.msg)
            }
          })
        } else {
          // 校验没通过
          console.log('请输入正确的账号和密码')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/*
  vue脚手架给我们配置了less的配置，但是并没有安装less 和 less-loader
  yarn add less less-loader -D
*/
.login {
  height: 100%;
  background-color: #2d434c;
  overflow: hidden;

  .el-form {
    width: 400px;
    margin: 200px auto;
    background-color: #fff;
    border-radius: 25px;
    padding: 75px 40px 15px;
    position: relative;

    img {
      width: 120px;
      position: absolute;
      top: -70px;
      border-radius: 50%;
      left: 180px;
      border: 5px solid #fff;
    }
    .el-button + .el-button {
      margin-left: 70px;
    }
  }
}
</style>
