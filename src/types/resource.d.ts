/**
 * 资源相关类型定义
 */

import type { Status } from './common'

/** 资源类型 */
export type ResourceType = 'text' | 'image' | 'video' | 'file' | 'link'

/** 资源分类 */
export type ResourceCategory = 
  | 'course'      // 课程资源
  | 'article'     // 文章
  | 'material'    // 教材
  | 'case'        // 案例
  | 'activity'    // 活动资源
  | 'other'       // 其他

/** 资源信息 */
export interface Resource {
  /** 资源 ID */
  id: string
  /** 资源标题 */
  title: string
  /** 资源类型 */
  type: ResourceType
  /** 资源分类 */
  category: ResourceCategory
  /** 封面图 */
  cover?: string
  /** 资源 URL */
  url: string
  /** 资源描述 */
  description?: string
  /** 文件大小（字节） */
  size?: number
  /** 时长（秒，视频/音频） */
  duration?: number
  /** 标签 */
  tags: string[]
  /** 浏览次数 */
  viewCount: number
  /** 下载次数 */
  downloadCount: number
  /** 收藏次数 */
  favoriteCount: number
  /** 上传者 ID */
  uploaderId: string
  /** 上传者姓名 */
  uploaderName: string
  /** 状态 */
  status: Status
  /** 创建时间 */
  createTime: string
  /** 更新时间 */
  updateTime: string
}

/** 资源列表查询参数 */
export interface ResourceQueryParams {
  /** 关键词 */
  keyword?: string
  /** 资源类型 */
  type?: ResourceType
  /** 资源分类 */
  category?: ResourceCategory
  /** 标签 */
  tags?: string[]
  /** 状态 */
  status?: Status
  /** 页码 */
  page: number
  /** 每页数量 */
  pageSize: number
}

/** 资源创建/更新请求 */
export interface ResourceFormData {
  title: string
  type: ResourceType
  category: ResourceCategory
  cover?: string
  url: string
  description?: string
  tags: string[]
  status: Status
}

/** 资源统计 */
export interface ResourceStats {
  /** 总数 */
  total: number
  /** 各类型数量 */
  byType: Record<ResourceType, number>
  /** 各分类数量 */
  byCategory: Record<ResourceCategory, number>
  /** 今日新增 */
  todayAdded: number
  /** 本周浏览量 */
  weeklyViews: number
}

