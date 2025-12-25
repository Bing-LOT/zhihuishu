/**
 * 用户状态管理
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, UserStats } from '@/types'
import { getStorageItem, setStorageItem } from '@/utils/storage'

// 本地存储的 key
const AUTH_TOKEN_KEY = 'AUTH_TOKEN'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string>('')
  const refreshToken = ref<string>('')
  
  // API 文档要求的 AuthToken - 从本地存储中读取，如果不存在则使用默认值
  const authToken = ref<string>(
    getStorageItem<string>(AUTH_TOKEN_KEY) || 'e801656e474d45dda9036df21c0be90b'
  )
  
  const userStats = ref<UserStats | null>(null)

  // Getters
  const isLoggedIn = computed(() => !!token.value && !!user.value)
  const userRole = computed(() => user.value?.role)
  const userName = computed(() => user.value?.name || '')
  const userAvatar = computed(() => user.value?.avatar || '')
  const permissions = computed(() => user.value?.permissions || [])

  // Actions
  
  /**
   * 登录
   * @param accessToken 访问令牌
   * @param userData 用户信息
   */
  function login(_accessToken: string, _userData: User) {
    // TODO: 实现登录逻辑
  }

  /**
   * 登出
   */
  function logout() {
    // TODO: 实现登出逻辑
  }

  /**
   * 刷新 Token
   */
  async function refreshAccessToken() {
    // TODO: 实现 Token 刷新逻辑
  }

  /**
   * 更新用户信息
   * @param userData 用户信息
   */
  function updateUser(_userData: Partial<User>) {
    // TODO: 实现用户信息更新逻辑
  }

  /**
   * 获取用户统计信息
   */
  async function fetchUserStats() {
    // TODO: 实现获取用户统计信息逻辑
  }

  /**
   * 检查用户权限
   * @param permission 权限代码
   */
  function hasPermission(_permission: string): boolean {
    // TODO: 实现权限检查逻辑
    return false
  }

  /**
   * 检查用户角色
   * @param roles 角色列表
   */
  function hasRole(_roles: string[]): boolean {
    // TODO: 实现角色检查逻辑
    return false
  }

  /**
   * 设置 AuthToken 并持久化到本地存储
   * @param token AuthToken值
   */
  function setAuthToken(token: string) {
    authToken.value = token
    setStorageItem(AUTH_TOKEN_KEY, token)
    console.log('✅ AuthToken 已保存到本地存储:', token)
  }

  /**
   * 初始化 AuthToken（从URL参数或本地存储中读取）
   * @param urlToken 从URL参数中获取的token，优先级更高
   */
  function initAuthToken(urlToken?: string) {
    if (urlToken) {
      // 如果URL中有token，使用它并保存
      setAuthToken(urlToken)
      console.log('🔑 从 URL 参数初始化 AuthToken:', urlToken)
    } else {
      // 否则使用已经从localStorage加载的token
      console.log('🔑 使用本地存储的 AuthToken:', authToken.value)
    }
  }

  return {
    // State
    user,
    token,
    refreshToken,
    authToken,
    userStats,
    
    // Getters
    isLoggedIn,
    userRole,
    userName,
    userAvatar,
    permissions,
    
    // Actions
    login,
    logout,
    refreshAccessToken,
    updateUser,
    fetchUserStats,
    hasPermission,
    hasRole,
    setAuthToken,
    initAuthToken
  }
})

