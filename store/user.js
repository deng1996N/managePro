export default {
  state: {
    form: {},
    formLabel:[],

  },
  mutations: {
    getUser(state, val) {
      state.form = val.list
    },
    addUser(state, val) {
      state.form.unshift(val)
    },
    // 用户管理页面存入表单表头和数据
    sendData(state,val){
      console.log(val)
      state.form = val[0]
      state.formLabel=val[1]
    }
  }
}
