/**
 * 权限守卫
 * 用于检查用户是否有访问某个路由的权限
 */

import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import type { UserRole } from '@/types'
import { useUserStore } from '@/stores/user'

/**
 * 权限守卫
 * @param to 目标路由
 * @param from 来源路由
 * @param next 导航函数
 */
export function roleGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const userStore = useUserStore()
  
  // 获取路由要求的角色
  const requiredRoles = to.matched
    .map(record => record.meta.roles as UserRole[] | undefined)
    .find(roles => roles && roles.length > 0)
  
  if (requiredRoles && requiredRoles.length > 0) {
    // 检查用户角色是否匹配
    const hasPermission = userStore.user && requiredRoles.includes(userStore.user.role)
    
    if (!hasPermission) {
      // 无权限，跳转到无权限页面或首页
      console.warn(`用户角色 ${userStore.user?.role} 无权访问 ${to.path}`)
      next({
        path: '/403',
        replace: true
      })
    } else {
      // 有权限，继续导航
      next()
    }
  } else {
    // 不需要特定角色，直接通过
    next()
  }
}

