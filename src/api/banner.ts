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
/**
 * 上传文件（通过Vite代理，避免CORS）
 */
export function uploadFile(file: File): Promise<{ url: string }> {
  return new Promise((resolve, reject) => {
    console.log('========== 上传文件（走Vite代理） ==========')
    console.log('文件信息:', {
      name: file.name,
      size: file.size,
      type: file.type
    })
    
    // 创建Headers对象
    const myHeaders = new Headers()
    myHeaders.append("AuthToken", "e568ff77ee9e45f488a6faff3c827366")
    
    // 创建FormData
    const formdata = new FormData()
    formdata.append("file", file)
    
    console.log('✅ Headers已设置: AuthToken')
    console.log('✅ FormData已创建: file字段')
    
    // 请求配置
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    }
    
    // 使用代理路径（/upload 会被Vite代理转发到 https://dszk.fzu.edu.cn/dszk-api/upload）
    const uploadUrl = '/upload'
    console.log('请求URL:', uploadUrl)
    console.log('通过Vite代理转发到: https://dszk.fzu.edu.cn/dszk-api/upload')
    console.log('==========================================')
    
    // 使用fetch发送请求
    fetch(uploadUrl, requestOptions)
      .then(response => {
        console.log('收到响应，状态码:', response.status)
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.msg || `HTTP ${response.status}: ${response.statusText}`)
          })
        }
        return response.json()
      })
      .then(result => {
        console.log('✅ 上传成功，响应数据:', result)
        
        // 解析响应格式：{ msg, code, data: { url } }
        if (result.code === 200 && result.data?.url) {
          resolve({ url: result.data.url })
        } else {
          reject(new Error(result.msg || '上传失败'))
        }
      })
      .catch(error => {
        console.error('❌ 上传失败:', error)
        reject(error)
      })
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

