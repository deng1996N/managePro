<template>
  <div class="login-container">
    <el-card>
      <h1>个人中心</h1>
      <el-form ref="loginForm" :model="form" :rules="rules" status-icon label-width="80px" style="width: 300px" size="small">
        <el-form-item label="用户名称" prop="name" :rules="rules.name">
          <el-input clearable v-model="form.name" maxlength="8" placeholder="输入名称（随便填）"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="account" :rules="rules.account">
          <el-input clearable v-model="form.account" maxlength="11" placeholder="输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="输入密码" prop="password">
          <el-input type="password" placeholder="随便填" show-password v-model="form.password" :rules="rules.password" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordSure">
          <el-input type="password" placeholder="跟上面密码一致" show-password v-model="form.passwordSure" :rules="rules.passwordSure" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('loginForm')">登录</el-button>
          <el-button disabled>密码随便填</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Mock from 'mockjs'
export default {
  name: 'Login',
  data() {
    // 手机号验证
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
    }
    // 密码验证
    const validatePasssord = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.passwordSure !== '') {
          this.$refs.loginForm.validateField('passwordSure')
        }
        callback()
      }
    }
    // 二次确认密码的验证规则
    const validatePasswordCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        account: '',
        password: '',
        passwordSure: ''
      },
      rules: {
        name: {
          required: true,
          message: '请输入用户名称',
          trigger: 'blur'
        },
        account: {
          required: true,
          validator: validatePhone
        },
        password: {
          required: true,
          validator: validatePasssord
        },
        passwordSure: {
          required: true,
          validator: validatePasswordCheck
        }
      }
    }
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 页面验证通过，开始发请求到服务器获取token和对应用户数据 假设getLoginInfo是登录页接口
          // getLoginInfo().then(res=>{
          //   // 判断用户是否存在,通过判断状态码
          //   if(!res.data.token){
          //     // 没有这个用户，toRegisty注册页面
          //   }else
          //     // 用户存在
          //     localStorage.setItem('token',JSON.parse(res.data.token))
          //     this.$router.push({name: 'Home'})
          // },err=>{
          //   // 用户验证失败
          //   console.log(err)
          // })
          const token = Mock.Random.guid()
          const userInfo = {
            name: this.form.name,
            phone: this.form.account
          }
          // console.log(token)
          localStorage.setItem('token', token)
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          this.$router.push({ name: 'Home' })
          this.$message({
            message: '登录成功！',
            type: 'success'
          })
        } else {
          alert('登录失败!!') // 登录失败
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background-color: #ccc;
  position: relative;
  width: 100%;
  height: 100%;
  .el-card {
    h1 {
      text-align: center;
      margin-bottom: 20px;
    }
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 30px;
  }
}
</style>