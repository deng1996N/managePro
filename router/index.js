// 引入路由组件
import VueRouter from "vue-router";
// 引入vue实例
import Vue from 'vue'
import Main from "@/views/main.vue"
import Home from "@/views/Home/index.vue"
import User from "@/views/User/index.vue"
import Goods from "@/views/Goods/index.vue"
import Page1 from "@/views/Setting/Page1"
import Page2 from "@/views/Setting/Page2"
import Login from "@/views/Login"
import Err from "@/components/Err"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    name: 'Main',
    redirect: '/home',
    meta: {
      needPermisson: false
    },
    children: [
      {
        path: '/home',
        component: Home,
        name: 'Home',
        meta: {
          needPermisson: false
        }
      },
      {
        path: '/user',
        component: User,
        name: 'User',
        meta: {
          needPermisson: false
        }
      },
      {
        path: '/goods',
        component: Goods,
        name: 'Goods',
        meta: {
          needPermisson: true
        },
      },
      {
        path: '/page1',
        component: Page1,
        name: 'Page1'
      },
      {
        path: '/page2',
        component: Page2,
        name: 'Page2'
      },
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
  {
    path: '/err',
    component: Err,
    name: 'Err'
  }

]
const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router