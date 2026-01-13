/**
 * 后台管理系统入口文件
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'

// 创建应用实例
const app = createApp(App)

// 创建 Pinia 实例
const pinia = createPinia()

// 注册插件
app.use(pinia)
app.use(router)

// 挂载应用
app.mount('#app')

// 如果当前路径是根路径，重定向到后台首页
if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
  router.push('/admin/resources/home')
}






