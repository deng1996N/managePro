
export default {
  state: {
    isCollapse: true,
    color:localStorage.getItem('color') || '',
    tabList: [{
      path: '/home',
      name: 'Home',
      label: '首页'
    }]
  },
  mutations: {
    changeColor(state,val){
      state.color = val
    },
    colShow(state) {
      state.isCollapse = !state.isCollapse
    },
    changMenu(state, val) {
      // console.log(state, val)
      if (val.name !== 'Home') {
        let res = state.tabList.findIndex(item => item.name === val.name)
        if (res === -1) {
          state.tabList.push({
            path: val.path,
            name: val.name,
            label: val.labal
          })

        } else {
          return
        }
      }

    },
    //删除tag事件
    closeTag(state, val) {
      let index = state.tabList.findIndex(item => item.name === val.name)
      state.tabList.splice(index, 1)
    }



  }
}



// if (this.$route.path !== item.path) {
//   this.storeTabList.splice(index, 1)
// } else {
//   if (index !== length - 1) {
//     this.$router.push({
//       name: this.storeTabList[index].name
//     })
//   } else {
//     this.$router.push({
//       name: this.storeTabList[index - 1].name
//     })
//   }
// }