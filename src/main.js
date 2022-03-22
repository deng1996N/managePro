import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from '../router'
import './assets/less/index.less'
import store from '../store'
import './api/mock.js'
Vue.use(ElementUI);
Vue.config.productionTip = false

// 全局路由导航守卫
router.beforeEach((to, from, next) => {
  // const token = localStorage.getItem('token')
  // if (to.name !== 'Login') {
  //   // {
  //   //   // if(!token) next({name: 'Login'})
  //   //   // else next()
  //   // }
  //   if (to.meta.needPermisson) {
  //     next({ name: 'Err' })
  //   } else {
  //     next({ name: 'Login' })

  //   }
  // }

  // else next()
  const token = localStorage.getItem('token')
  if (to.name !== 'Login') {
    if (!token) {
      next({ name: 'Login' })
    }
    else {
      if (to.meta.needPermisson) {
        next({ name: 'Err' })
      }
      else next()
    }
  } else {
    if (token) {
      ElementUI.Message('您已登录')
      next({
        name: 'Home'
      })
    }
    else {
      next()
    }
  }
})



new Vue({
  store,
  router,
  render: h => h(App)

}).$mount('#app')
