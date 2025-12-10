/**
 * 认证守卫
 * 用于检查用户是否已登录
 */

import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useUserStore } from '@/stores/user'

/**
 * 认证守卫
 * @param to 目标路由
 * @param from 来源路由
 * @param next 导航函数
 */
export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const userStore = useUserStore()
  
  // 检查路由是否需要认证
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if (requiresAuth) {
    // 检查用户是否已登录
    if (!userStore.isLoggedIn) {
      // 未登录，跳转到 SSO 登录
      // TODO: 实现 SSO 跳转逻辑
      console.warn('需要登录，跳转到 SSO')
      next({
        path: '/auth/login',
        query: { redirect: to.fullPath }
      })
    } else {
      // 已登录，继续导航
      next()
    }
  } else {
    // 不需要认证，直接通过
    next()
  }
}

