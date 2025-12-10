/**
 * 用户相关类型定义
 */

import type { UserRole } from './common'

/** 用户信息 */
export interface User {
  /** 用户 ID */
  id: string
  /** 用户名 */
  username: string
  /** 真实姓名 */
  name: string
  /** 角色 */
  role: UserRole
  /** 邮箱 */
  email?: string
  /** 手机号 */
  phone?: string
  /** 头像 URL */
  avatar?: string
  /** 学号/工号 */
  studentId?: string
  /** 院系 */
  department?: string
  /** 专业/职称 */
  major?: string
  /** 权限列表 */
  permissions: string[]
  /** 创建时间 */
  createTime: string
  /** 最后登录时间 */
  lastLoginTime?: string
}

/** 用户登录请求 */
export interface LoginRequest {
  /** SSO Token */
  token: string
  /** 回调地址 */
  redirectUrl?: string
}

/** 用户登录响应 */
export interface LoginResponse {
  /** 访问 Token */
  accessToken: string
  /** 刷新 Token */
  refreshToken: string
  /** Token 过期时间 */
  expiresIn: number
  /** 用户信息 */
  user: User
}

/** 用户权限 */
export interface Permission {
  id: string
  name: string
  code: string
  type: 'menu' | 'button' | 'api'
  path?: string
}

/** 用户统计信息 */
export interface UserStats {
  /** 学习时长（分钟） */
  studyDuration: number
  /** 完成课程数 */
  completedCourses: number
  /** 考试次数 */
  examCount: number
  /** 平均分数 */
  averageScore: number
  /** 资源收藏数 */
  favoriteCount: number
}

