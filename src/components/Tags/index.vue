<template>
  <div class="tabs-container">
    <el-tag v-for="(item,index) in storeTabList" :key="item.path" :closable="item.name !== 'Home'" plain :effect="item.path === $route.path ? 'dark' : 'light'" @click="changMenu(item)" @close="tagHandler(item, index)">
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
export default {
  name: 'Tabs',
  computed: {
    ...mapState({
      storeTabList: state => state.tab.tabList
    })
  },
  methods: {
    ...mapMutations({
      closeTag: 'closeTag'
    }),
    changMenu(item) {
      this.$router.push({
        name: item.name
      })
    },
    tagHandler(item,index) {
      // console.log(item)
      let length = this.storeTabList.length - 1
      this.closeTag(item)
      if (item.name !== this.$route.name) {
        return
      }
      if (index === length) {
        this.$router.push({
          name: this.storeTabList[index-1].name
        })
      } else {
        this.$router.push({
          name: this.storeTabList[index].name
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 5px;
  cursor: pointer;
}
</style>