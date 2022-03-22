<template>
  <header>
    <div class="left-box">
      <el-button @click="tabHandler" class="el-icon-menu" size="mini" plain>{{ isCollapse ? '展开' : '折起' }}</el-button>
      <h3>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item currentMenu v-for="item in tabs" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
        </el-breadcrumb>
      </h3>
    </div>
    <div class="userInfo">
      <span class="theme el-icon-s-shop" title="改变颜色" @click="colorBoxShow = !colorBoxShow">更换主题</span>
      <div class="colorBoxList" v-show="colorBoxShow" @mouseleave="colorBoxShow = false">
        <div class="colorBox" style="background-color: #333" title="默认" @click="changeColor('#333')"></div>
        <div class="colorBox" style="background-color: #800" title="红色" @click="changeColor('#800')"></div>
        <div class="colorBox" style="background-color: #04b" title="蓝色" @click="changeColor('#04b')"></div>
        <div class="colorBox" style="background-color: #880" title="橙色" @click="changeColor('#880')"></div>
      </div>
      <el-dropdown size="mini">
        <span>
          <img :src="userImgSrc" alt="个人中心" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item divided @click.native="quitLogin">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      colorBoxShow: false,
      userImgSrc: require('@/assets/images/user.png')
    }
  },
  computed: {
    ...mapState({
      tabs: state => state.tab.tabList,
      isCollapse: state => state.tab.isCollapse
    })
  },
  methods: {
    changeColor(color) {
      this.$store.commit('changeColor', color)
      localStorage.setItem('color',color)
    },
    tabHandler() {
      this.$store.commit('colShow')
    },
    quitLogin() {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('color')
      this.$router.push({
        name: 'Login'
      })
      this.$message({
        message: '退出登录'
      })
    }
  }
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  .left-box {
    display: flex;
    justify-content: center;
    color: #fff;
    .el-button {
      margin-right: 20px;
    }
    h3 {
      padding: 10px;
      .el-breadcrumb__inner a:hover,
      /deep/ .el-breadcrumb__inner.is-link:hover {
        color: #fff !important;
        font-weight: 400;
      }
      /deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner {
        color: #fff;
      }
    }
  }
  .userInfo {
    position: relative;
    .theme {
      display: inline-block;
      position: absolute;
      top: 10px;
      left: -90px;
      width: 120px;
      height: 50px;
      font-size: 16px;
      color: #fff;
      cursor: pointer;
    }
    .colorBoxList {
      display: flex;
      position: absolute;
      top: 30px;
      left: -115px;
      background-color: #fff;
      border: 1px solid #ccc;
      .colorBox {
        width: 20px;
        height: 20px;
        margin: 3px;
        cursor: pointer;
      }
    }
    img {
      width: 35px;
      border-radius: 50%;
    }
  }
  //   .el-dropdown-link {
  //     cursor: pointer;
  //     color: #409eff;
  //   }
  //   .el-icon-arrow-down {
  //     font-size: 12px;
  //   }
  // }
}
</style>