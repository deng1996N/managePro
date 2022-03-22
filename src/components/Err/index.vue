<template>
  <div class="err">
    <el-card>
      你没有权限 <span class="num">{{ count }} </span>秒后返回首页
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Err',
  data() {
    return {
      count: 5
    }
  },
  methods: {
    countDown() {
      let countNum = 4
      setInterval(() => {
        this.count = countNum
        countNum--
      }, 1000)
    },
    toLogin() {
      setTimeout(() => {
        this.$router.push({ name: 'Home' })
      }, 5000)
    }
  },
  mounted() {
    this.toLogin()
    this.countDown()
  }
}
</script>

<style>
.num {
  color: red;
  font-size: 28px;
}
</style>