import Vue from 'vue'
import Router from 'vue-router'

// 导入Login组件
import Login from '@/components/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
