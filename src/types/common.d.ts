/**
 * 通用类型定义
 */

/** 用户角色 */
export type UserRole = 'student' | 'teacher' | 'admin'

/** 状态类型 */
export type Status = 'active' | 'inactive' | 'pending' | 'archived'

/** 分页请求参数 */
export interface PaginationParams {
  page: number
  pageSize: number
}

/** 分页响应数据 */
export interface PaginationResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/** API 响应基础结构 */
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp: number
}

/** 排序参数 */
export interface SortParams {
  field: string
  order: 'asc' | 'desc'
}

/** 时间范围 */
export interface TimeRange {
  startTime: string
  endTime: string
}

/** 文件信息 */
export interface FileInfo {
  id: string
  name: string
  url: string
  size: number
  type: string
  uploadTime: string
}

/** 选项结构（用于下拉框等） */
export interface Option<T = string | number> {
  label: string
  value: T
  disabled?: boolean
}

