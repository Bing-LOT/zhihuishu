/**
 * 视频管理 API
 */

import request from './request'

/**
 * 视频数据结构
 */
export interface VideoItem {
  id: number          // 业务id
  title: string       // 标题
  coverUrl: string    // 封面图
  videoUrl: string    // 视频地址
  college: string     // 学院
  createTime: string  // 发布日期
  description?: string // 视频描述
}

/**
 * 获取视频列表
 * @returns 返回视频列表
 */
export function getVideoList(): Promise<VideoItem[]> {
  return request({
    url: '/api/video/list',
    method: 'get'
  })
}

