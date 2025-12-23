/**
 * Vue Router 主配置文件
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import portalRoutes from './modules/portal'
import adminRoutes from './modules/admin'
import { authGuard } from './guards/authGuard'
import { roleGuard } from './guards/roleGuard'
import { useUserStore } from '@/stores/user'

// 认证相关路由
const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      title: '登录',
      requiresAuth: false
    }
  },
  {
    path: '/auth/callback',
    name: 'AuthCallback',
    component: () => import('@/views/auth/Callback.vue'),
    meta: {
      title: 'SSO 回调',
      requiresAuth: false
    }
  }
]

// 错误页面路由
const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('@/views/error/403.vue'),
    meta: {
      title: '无权限',
      requiresAuth: false
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '页面不存在',
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

// 合并所有路由
const routes: RouteRecordRaw[] = [
  ...portalRoutes,
  ...adminRoutes,
  ...authRoutes,
  ...errorRoutes
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 大思政课数智化平台`
  }
  
  // 处理URL参数中的AuthToken
  const authTokenParam = to.query.AuthToken as string
  if (authTokenParam) {
    const userStore = useUserStore()
    userStore.setAuthToken(authTokenParam)
    console.log('从URL获取AuthToken并存储:', authTokenParam)
    
    // 移除URL中的AuthToken参数（保持URL整洁）
    const newQuery = { ...to.query }
    delete newQuery.AuthToken
    
    next({
      path: to.path,
      query: newQuery,
      replace: true
    })
    return
  }
  
  // 认证守卫
  authGuard(to, from, (result) => {
    if (result === undefined) {
      // 认证通过，继续执行权限守卫
      roleGuard(to, from, next)
    } else {
      // 认证未通过，执行跳转
      next(result)
    }
  })
})

// 全局后置钩子
router.afterEach((to, from) => {
  // TODO: 可以在这里添加页面访问统计等逻辑
  console.log(`路由跳转: ${from.path} -> ${to.path}`)
})

// 路由错误处理
router.onError((error) => {
  console.error('路由错误:', error)
})

export default router

