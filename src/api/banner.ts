/**
 * Banner 管理 API
 */

import request from './request'
import { useUserStore } from '@/stores/user'

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
 * 
 * 对应 API 文档的 curl 命令:
 * curl --location --request POST 'https://dszk.fzu.edu.cn/dszk-api/upload' \
 * --header 'AuthToken: 269e7eccac95435dbb626fce47c182c3' \
 * --form 'file=@"文件路径"'
 * 
 * 本地开发环境通过 Vite 代理:
 * POST http://localhost:5173/upload → https://dszk.fzu.edu.cn/dszk-api/upload
 */
export function uploadFile(file: File): Promise<{ url: string }> {
  return new Promise((resolve, reject) => {
    const userStore = useUserStore()
    
    console.log('========== 上传文件（走Vite代理） ==========')
    console.log('文件信息:', {
      name: file.name,
      size: file.size,
      type: file.type
    })
    
    // 创建FormData（必须先创建，再设置Headers）
    const formdata = new FormData()
    formdata.append("file", file)
    
    // 创建Headers对象 - 使用 AuthToken（注意大小写，与 API 文档一致）
    const myHeaders = new Headers()
    if (userStore.authToken) {
      myHeaders.append("AuthToken", userStore.authToken)
    }
    
    console.log('✅ FormData已创建: file 字段')
    console.log('✅ Headers已设置: AuthToken =', userStore.authToken)
    console.log('   (与 API 文档一致: 269e7eccac95435dbb626fce47c182c3)')
    
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

