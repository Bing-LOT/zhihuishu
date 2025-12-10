/**
 * 认证相关工具函数
 */

import type { UserRole } from '@/types'

/**
 * Token 存储键
 */
const TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

/**
 * 获取 Token
 */
export function getToken(): string | null {
  // TODO: 实现获取 Token 逻辑
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * 设置 Token
 * @param token 访问令牌
 */
export function setToken(token: string): void {
  // TODO: 实现设置 Token 逻辑
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * 移除 Token
 */
export function removeToken(): void {
  // TODO: 实现移除 Token 逻辑
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

/**
 * 获取刷新 Token
 */
export function getRefreshToken(): string | null {
  // TODO: 实现获取刷新 Token 逻辑
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

/**
 * 设置刷新 Token
 * @param token 刷新令牌
 */
export function setRefreshToken(token: string): void {
  // TODO: 实现设置刷新 Token 逻辑
  localStorage.setItem(REFRESH_TOKEN_KEY, token)
}

/**
 * 检查是否已登录
 */
export function isAuthenticated(): boolean {
  // TODO: 实现检查是否已登录逻辑
  return !!getToken()
}

/**
 * 跳转到 SSO 登录
 * @param redirectUrl 登录成功后的回调地址
 */
export function redirectToSSO(redirectUrl?: string): void {
  // TODO: 实现跳转到 SSO 登录逻辑
  const ssoUrl = import.meta.env.VITE_SSO_URL
  const callbackUrl = `${window.location.origin}/auth/callback`
  const redirect = redirectUrl || window.location.href
  
  // 构建 SSO 登录 URL
  const loginUrl = `${ssoUrl}?callback=${encodeURIComponent(callbackUrl)}&redirect=${encodeURIComponent(redirect)}`
  
  window.location.href = loginUrl
}

/**
 * 检查用户角色
 * @param userRole 用户角色
 * @param requiredRoles 需要的角色列表
 */
export function hasRole(userRole: UserRole, requiredRoles: UserRole[]): boolean {
  // TODO: 实现检查用户角色逻辑
  return requiredRoles.includes(userRole)
}

/**
 * 检查用户权限
 * @param userPermissions 用户权限列表
 * @param requiredPermission 需要的权限
 */
export function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  // TODO: 实现检查用户权限逻辑
  return userPermissions.includes(requiredPermission)
}

