import Vue from 'vue'
import Router from 'vue-router'

// 导入Login组件
import Login from '@/components/Login.vue'

// 导入Home组件
import Home from '@/components/Home.vue'

// 导入users组件
import Users from '@/components/Users.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      // 嵌套路由1:通过children给某个路由配置子路由
      // 嵌套路由2: 给子路由配置一个出口
      children: [
        {
          path: '/users',
          component: Users
        }
      ]
    }
  ]
})

// 给路由添加导航守卫
// to:去哪儿
// from:到哪去
// next() :指定跳转到哪个组件,next() : 表示放行
router.beforeEach((to, from, next) => {
  // 判断是否有token
  const token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    // 有token 放行
    next()
  } else {
    // 没有token,跳转到登录
    next('/login')
  }
})

// 导出路由对象
export default router
