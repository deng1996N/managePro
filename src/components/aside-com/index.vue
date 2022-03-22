<template>
  <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :background-color="bgcColors" text-color="#999" active-text-color="#f5d403" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <h3>{{ isCollapse ? '后台' : '后台管理系统' }}</h3>
    <el-menu-item @click="changMenu(item)" v-for="item in noChildren" :index="'' + item.path" :key="item.id">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.labal }}</span>
    </el-menu-item>
    <el-submenu v-for="item1 in hasChildren" :index="'' + item1.path" :key="item1.name">
      <template slot="title">
        <i :class="'el-icon-' + item1.icon"></i>
        <span slot="title">{{ item1.labal }}</span>
      </template>
      <el-menu-item-group v-for="item2 in item1.children" :index="'' + item2.path" :key="item2.name">
        <el-menu-item @click="changMenu(item2)" :index="item2.path">{{ item2.labal }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      navList: [
        {
          id: 1,
          path: '/home',
          name: 'Home',
          labal: '首页',
          icon: 's-home',
          url: 'Home'
        },
        {
          id: 2,
          path: '/goods',
          name: 'Goods',
          labal: '商品',
          icon: 's-goods',
          url: 'Goods'
        },
        {
          id: 3,
          path: '/user',
          name: 'User',
          labal: '用户管理',
          icon: 'user-solid',
          url: 'User'
        },
        {
          id: 4,
          labal: '更多',
          icon: 's-tools',
          children: [
            {
              id: 5,
              path: '/page1',
              name: 'Page1',
              labal: '页面1',
              icon: 's-tools',
              url: ''
            },
            {
              id: 6,
              path: '/page2',
              name: 'Page2',
              labal: '页面2',
              icon: 's-tools',
              url: ''
            }
          ]
        }
      ]
    }
  },
  computed: {
    noChildren() {
      return this.navList.filter(item => !item.children)
    },
    hasChildren() {
      return this.navList.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    ...mapState({
      bgcColors: state => state.tab.color
    })
  },
  methods: {
    changMenu(item) {
      this.$router.push({
        name: item.name
      })
      this.$store.commit('changMenu', item)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  background-color: #333;
  h3 {
    height: 50px;
    padding-top: 15px;
    text-align: center;
    color: #999;
  }
}
</style>