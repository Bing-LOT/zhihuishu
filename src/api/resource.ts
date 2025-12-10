/**
 * 资源管理 API
 */

import request from './request'
import type { 
  Resource, 
  ResourceQueryParams, 
  ResourceFormData,
  ResourceStats,
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

