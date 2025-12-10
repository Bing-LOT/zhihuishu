/**
 * 认证相关 Hook
 */

import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import type { UserRole } from '@/types'

/**
 * 认证 Hook
 */
export function useAuth() {
  const userStore = useUserStore()

  // 是否已登录
  const isLoggedIn = computed(() => userStore.isLoggedIn)

  // 当前用户
  const currentUser = computed(() => userStore.user)

  // 用户角色
  const userRole = computed(() => userStore.userRole)

  /**
   * 检查用户是否有指定角色
   * @param roles 角色列表
   */
  function hasRole(roles: UserRole[]): boolean {
    // TODO: 实现角色检查逻辑
    return userStore.hasRole(roles)
  }

  /**
   * 检查用户是否有指定权限
   * @param permission 权限代码
   */
  function hasPermission(permission: string): boolean {
    // TODO: 实现权限检查逻辑
    return userStore.hasPermission(permission)
  }

  /**
   * 是否为学生
   */
  const isStudent = computed(() => userRole.value === 'student')

  /**
   * 是否为教师
   */
  const isTeacher = computed(() => userRole.value === 'teacher')

  /**
   * 是否为管理员
   */
  const isAdmin = computed(() => userRole.value === 'admin')

  return {
    isLoggedIn,
    currentUser,
    userRole,
    isStudent,
    isTeacher,
    isAdmin,
    hasRole,
    hasPermission
  }
}

