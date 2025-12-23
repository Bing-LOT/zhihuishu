/**
 * Banner 管理 API
 */

import request from './request'

/**
 * Banner数据结构
 */
export interface BannerItem {
  id: number
  picUrl: string
  sort: number
}

/**
 * 上传文件（公共接口）
 * @param file 文件对象
 * @returns 返回文件URL
 */
export function uploadFile(file: File): Promise<{ url: string }> {
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

/**
 * 添加Banner
 * @param picUrl 图片地址
 * @param sort 排序序号
 * @returns 返回Banner ID
 */
export function addBanner(picUrl: string, sort: number): Promise<{ id: number }> {
  return request({
    url: '/banner/add',
    method: 'POST',
    data: {
      picUrl,
      sort
    }
  })
}

/**
 * 获取Banner列表
 */
export function getBannerList(): Promise<BannerItem[]> {
  return request({
    url: '/banner/list',
    method: 'GET'
  })
}

/**
 * 更新Banner
 * @param id Banner ID
 * @param picUrl 图片地址
 * @param sort 排序序号
 */
export function updateBanner(id: number, picUrl: string, sort: number): Promise<void> {
  return request({
    url: `/banner/update/${id}`,
    method: 'PUT',
    data: {
      picUrl,
      sort
    }
  })
}

/**
 * 删除Banner
 * @param id Banner ID
 */
export function deleteBanner(id: number): Promise<void> {
  return request({
    url: `/banner/delete/${id}`,
    method: 'DELETE'
  })
}

