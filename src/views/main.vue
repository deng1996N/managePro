<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <aside-com></aside-com>
    </el-aside>
    <el-container>
      <el-header :style="'background-color:' + bgcColors">
        <Header />
      </el-header>
      <Tags />
      <el-main>
        <router-view> </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import asideCom from '../components/aside-com/index.vue'
import Header from '@/components/Header'
import Tags from '@/components/Tags/'
import { mapState } from 'vuex'
export default {
  name: 'Main',
  components: {
    asideCom,
    Header,
    Tags
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      bgcColors: state => state.tab.color
    })
  }
}
</script>

<style lang="less" scoped>
.el-aside {
  height: 100%;
}
.el-header {
  background-color: #333;
  height: 50px !important;
}

.el-main {
  padding-top: 0;
}
</style>