/**
 * 资源管理 API
 */

import request from './request'
import type { 
  Resource, 
  ResourceQueryParams, 
  ResourceFormData,
  ResourceStats,
  PoliticalResourceAddParams,
  PoliticalResourceEditParams,
  PoliticalResourceListParams,
  PoliticalResourceListResponse,
  PaginationResponse 
} from '@/types'

/**
 * 获取资源列表
 * @param params 查询参数
 */
export function getResourceList(params: ResourceQueryParams): Promise<PaginationResponse<Resource>> {
  // TODO: 实现获取资源列表 API
  return request({
    url: '/resources',
    method: 'GET',
    params
  })
}

/**
 * 获取资源详情
 * @param id 资源 ID
 */
export function getResourceDetail(id: string): Promise<Resource> {
  // TODO: 实现获取资源详情 API
  return request({
    url: `/resources/${id}`,
    method: 'GET'
  })
}

/**
 * 创建资源
 * @param data 资源数据
 */
export function createResource(data: ResourceFormData): Promise<Resource> {
  // TODO: 实现创建资源 API
  return request({
    url: '/resources',
    method: 'POST',
    data
  })
}

/**
 * 更新资源
 * @param id 资源 ID
 * @param data 资源数据
 */
export function updateResource(id: string, data: Partial<ResourceFormData>): Promise<Resource> {
  // TODO: 实现更新资源 API
  return request({
    url: `/resources/${id}`,
    method: 'PUT',
    data
  })
}

/**
 * 删除资源
 * @param id 资源 ID
 */
export function deleteResource(id: string): Promise<void> {
  // TODO: 实现删除资源 API
  return request({
    url: `/resources/${id}`,
    method: 'DELETE'
  })
}

/**
 * 上传资源文件
 * @param file 文件对象
 */
export function uploadResourceFile(file: File): Promise<{ url: string; size: number }> {
  // TODO: 实现上传资源文件 API
  const formData = new FormData()
  formData.append('file', file)
  
  return request({
    url: '/resources/upload',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 收藏资源
 * @param id 资源 ID
 */
export function favoriteResource(id: string): Promise<void> {
  // TODO: 实现收藏资源 API
  return request({
    url: `/resources/${id}/favorite`,
    method: 'POST'
  })
}

/**
 * 取消收藏资源
 * @param id 资源 ID
 */
export function unfavoriteResource(id: string): Promise<void> {
  // TODO: 实现取消收藏资源 API
  return request({
    url: `/resources/${id}/favorite`,
    method: 'DELETE'
  })
}

/**
 * 下载资源
 * @param id 资源 ID
 */
export function downloadResource(id: string): Promise<Blob> {
  // TODO: 实现下载资源 API
  return request({
    url: `/resources/${id}/download`,
    method: 'GET',
    responseType: 'blob'
  })
}

/**
 * 获取资源统计
 */
export function getResourceStats(): Promise<ResourceStats> {
  // TODO: 实现获取资源统计 API
  return request({
    url: '/resources/stats',
    method: 'GET'
  })
}

/**
 * 新增思政资源
 * @param data 思政资源数据
 */
export function addPoliticalResource(data: PoliticalResourceAddParams): Promise<any> {
  return request({
    url: '/politicalResource/add',
    method: 'POST',
    data
  })
}

/**
 * 获取思政资源列表（分页）
 * @param params 查询参数
 */
export function getPoliticalResourceList(params: PoliticalResourceListParams): Promise<PoliticalResourceListResponse> {
  return request({
    url: '/politicalResource/page/list',
    method: 'POST',
    data: params
  })
}

/**
 * 编辑思政资源
 * @param data 编辑数据
 */
export function editPoliticalResource(data: PoliticalResourceEditParams): Promise<any> {
  return request({
    url: '/politicalResource/edit',
    method: 'PUT',
    data
  })
}

/**
 * 删除思政资源
 * @param id 资源ID
 */
export function deletePoliticalResource(id: number): Promise<any> {
  return request({
    url: `/politicalResource/remove/${id}`,
    method: 'DELETE'
  })
}

/**
 * 编辑思政资源页面标题
 * @param content 标题内容
 */
export function editPoliticalResourcePageTitle(content: string): Promise<any> {
  return request({
    url: '/politicalResource/title/edit',
    method: 'PUT',
    data: { content }
  })
}

/**
 * 新增课程展播
 * @param data 课程展播数据
 */
export interface CourseExpoAddParams {
  name: string                    // 课程名称
  coverUrl: string                // 课程封面
  levelName: string               // 示范等级
  property: string                // 课程性质
  college: string                 // 所在学院
  brief: string                   // 课程简介
  docUrl: string                  // 教学设计文档
  videoUrl: string                // 教学视频
  showStatPv: number              // 显示学习统计：1=显示；0=不显示
  showFront: number               // 是否前台显示：1=显示；0=不显示
  teachers: Array<{               // 教师信息
    name: string                  // 教师姓名
    title: string                 // 职称
  }>
}

export function addCourseExpo(data: CourseExpoAddParams): Promise<any> {
  return request({
    url: '/courseExpo/add',
    method: 'POST',
    data
  })
}

/**
 * 编辑课程展播
 * @param data 课程展播数据（包含ID）
 */
export interface CourseExpoEditParams extends CourseExpoAddParams {
  id: string | number           // 课程展播ID
}

export function editCourseExpo(data: CourseExpoEditParams): Promise<any> {
  return request({
    url: '/courseExpo/edit',
    method: 'PUT',
    data
  })
}

/**
 * 查询课程展播列表（分页）
 * @param params 查询参数
 */
export interface CourseExpoPageParams {
  pageIndex: number               // 页码
  pageSize: number                // 每页大小，默认10条
  keyword?: string                // 搜索关键词（可选）
  showFront?: number              // 显示状态：1=显示；0=不显示；不传显示所有（可选）
}

export interface CourseExpoItem {
  id: string | number
  name: string                    // 课程名称
  coverUrl: string                // 课程封面
  levelName: string               // 示范等级
  property: string                // 课程性质
  college: string                 // 所在学院
  brief: string                   // 课程简介
  docUrl: string                  // 教学设计文档
  videoUrl: string                // 教学视频
  showStatPv: number              // 显示学习统计
  showFront: number               // 是否前台显示
  teachers: Array<{               // 教师信息
    name: string
    title: string
  }>
  createTime?: string             // 创建时间
  updateTime?: string             // 更新时间
}

export interface CourseExpoPageResponse {
  records: CourseExpoItem[]       // 数据列表
  total: number                   // 总记录数
  pageIndex: number               // 当前页码
  pageSize: number                // 每页大小
}

export function getCourseExpoPageList(params: CourseExpoPageParams): Promise<CourseExpoPageResponse> {
  return request({
    url: '/courseExpo/page/list',
    method: 'POST',
    data: params
  })
}

/**
 * 删除课程展播
 * @param id 课程展播ID
 */
export function deleteCourseExpo(id: string | number): Promise<any> {
  return request({
    url: `/courseExpo/remove/${id}`,
    method: 'DELETE'
  })
}

/**
 * 编辑核心文稿
 * @param content 核心文稿内容
 */
export function editCoreText(content: string): Promise<any> {
  return request({
    url: '/xiThought/achievement/coreText/edit',
    method: 'PUT',
    data: { content }
  })
}

