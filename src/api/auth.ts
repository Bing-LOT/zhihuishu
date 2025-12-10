/**
 * 认证相关 API
 */

import request from './request'
import type { LoginRequest, LoginResponse, User } from '@/types'

/**
 * SSO 登录
 * @param data 登录请求数据
 */
export function login(data: LoginRequest): Promise<LoginResponse> {
  // TODO: 实现 SSO 登录 API
  return request({
    url: '/auth/login',
    method: 'POST',
    data
  })
}

/**
 * 登出
 */
export function logout(): Promise<void> {
  // TODO: 实现登出 API
  return request({
    url: '/auth/logout',
    method: 'POST'
  })
}

/**
 * 刷新 Token
 * @param refreshToken 刷新令牌
 */
export function refreshToken(refreshToken: string): Promise<{ accessToken: string; expiresIn: number }> {
  // TODO: 实现刷新 Token API
  return request({
    url: '/auth/refresh',
    method: 'POST',
    data: { refreshToken }
  })
}

/**
 * 获取当前用户信息
 */
export function getCurrentUser(): Promise<User> {
  // TODO: 实现获取用户信息 API
  return request({
    url: '/auth/user',
    method: 'GET'
  })
}

/**
 * 修改密码
 * @param oldPassword 旧密码
 * @param newPassword 新密码
 */
export function changePassword(oldPassword: string, newPassword: string): Promise<void> {
  // TODO: 实现修改密码 API
  return request({
    url: '/auth/password',
    method: 'PUT',
    data: { oldPassword, newPassword }
  })
}

/**
 * SSO 回调处理
 * @param code SSO 授权码
 */
export function ssoCallback(code: string): Promise<LoginResponse> {
  // TODO: 实现 SSO 回调 API
  return request({
    url: '/auth/sso/callback',
    method: 'POST',
    data: { code }
  })
}

