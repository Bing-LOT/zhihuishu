/**
 * API 调用示例
 * 所有API请求都会自动携带AuthToken
 */

import request from './request'

/**
 * 示例：获取Banner列表
 */
export function getBannerList() {
  return request({
    url: '/banner/list',
    method: 'GET'
  })
}

/**
 * 示例：创建Banner
 */
export function createBanner(data: any) {
  return request({
    url: '/banner/create',
    method: 'POST',
    data
  })
}

/**
 * 示例：获取资源列表
 */
export function getResourceList(params?: any) {
  return request({
    url: '/resource/list',
    method: 'GET',
    params
  })
}

/**
 * 示例：上传文件
 */
export function uploadFile(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  
  return request({
    url: '/upload',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 所有这些请求都会自动在请求头中携带AuthToken
// 无需手动添加

