import Vue from 'vue'
import App from './App'
import router from './router'

// 导入ElementUI组件库
import ElementUI from 'element-ui'
// 导入elementui样式
import 'element-ui/lib/theme-chalk/index.css'

// 导入公共样式
import '@/assets/commen.css'

// 使用elementui这个插件
Vue.use(ElementUI)

Vue.config.productionTip = false

// 禁用eslint的no-now规则
/*  eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
