/**
 * Banner API - Base64上传方案（临时方案）
 */

import request from './request'

/**
 * 上传文件（Base64方式，避免CORS和FormData问题）
 */
export function uploadFileBase64(file: File): Promise<{ url: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = async (e) => {
      try {
        const base64 = e.target?.result as string
        
        console.log('========== Base64上传 ==========')
        console.log('文件名:', file.name)
        console.log('Base64长度:', base64.length)
        console.log('===============================')
        
        // 发送base64到后端
        const result = await request({
          url: '/upload/base64',
          method: 'POST',
          data: {
            file: base64,
            filename: file.name,
            type: file.type
          }
        })
        
        resolve(result)
      } catch (error) {
        reject(error)
      }
    }
    
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

