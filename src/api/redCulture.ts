/**
 * 红色文化资源地图 API
 */

import request from './request'

/**
 * 红色文化资源数据结构
 */
export interface RedCultureItem {
  id: number
  title: string
  coverUrl: string
  address: string
  tags: string[]
  lng: number
  lat: number
  contentType: string // 0=富文本；1=URL地址
  content: string
  pinTop: number // 1=置顶；0=不置顶
  showFront: number // 1=显示；0=隐藏
  createTime: string
}

/**
 * 分页响应数据结构
 */
export interface RedCulturePageResponse {
  records: RedCultureItem[]
  total: number
  size: number
  current: number
  pages: number
}

/**
 * 分页查询参数
 */
export interface RedCulturePageParams {
  pageIndex: number // 页码，默认1
  pageSize: number // 每页大小，默认10条
  keyword?: string // 搜索关键词（可选）
  showFront?: number // 前台显示状态筛选：1=显示；0=隐藏（可选）
}

/**
 * 获取红色文化资源分页列表
 * @param params 分页查询参数
 * @returns 分页数据
 */
export function getRedCultureList(params: RedCulturePageParams): Promise<RedCulturePageResponse> {
  return request({
    url: '/redCulture/page/list',
    method: 'post',
    data: params
  })
}

/**
 * 新增红色文化资源参数
 */
export interface CreateRedCultureParams {
  coverUrl: string        // 封面图片（必需）
  title: string           // 标题（必需）
  address: string         // 地址（必需）
  tags: string[]          // 建设课程类型，多个（必需）
  contentType: number     // 资源详情内容类型：0=富文本；1=URL地址（必需）
  content: string         // 富文本或URL地址（必需）
  pinTop: number          // 是否置顶：1=置顶；0=不置顶（必需）
  showFront: number       // 前台显示：1=显示；0=隐藏（必需）
  lng?: number            // 经度（可选）
  lat?: number            // 纬度（可选）
}

/**
 * 新增红色文化资源
 * @param data 资源数据
 * @returns 创建结果
 */
export function createRedCulture(data: CreateRedCultureParams): Promise<any> {
  return request({
    url: '/redCulture/add',
    method: 'post',
    data
  })
}

/**
 * 编辑红色文化资源参数
 */
export interface EditRedCultureParams {
  id: number              // 资源ID（必需）
  coverUrl: string        // 封面图片（必需）
  title: string           // 标题（必需）
  address: string         // 地址（必需）
  tags: string[]          // 建设课程类型，多个（必需）
  contentType: number     // 资源详情内容类型：0=富文本；1=URL地址（必需）
  content: string         // 富文本或URL地址（必需）
  pinTop: number          // 是否置顶：1=置顶；0=不置顶（必需）
  showFront: number       // 前台显示：1=显示；0=隐藏（必需）
  lng?: number            // 经度（可选）
  lat?: number            // 纬度（可选）
}

/**
 * 编辑红色文化资源
 * @param data 资源数据（包含id）
 * @returns 编辑结果
 */
export function editRedCulture(data: EditRedCultureParams): Promise<any> {
  return request({
    url: '/redCulture/edit',
    method: 'put',
    data
  })
}

/**
 * 更新红色文化资源
 * @param id 资源ID
 * @param data 资源数据
 * @returns 更新结果
 */
export function updateRedCulture(id: number, data: Partial<RedCultureItem>): Promise<any> {
  return request({
    url: `/redCulture/update/${id}`,
    method: 'put',
    data
  })
}

/**
 * 删除红色文化资源
 * @param id 资源ID
 * @returns 删除结果
 */
export function deleteRedCulture(id: number): Promise<any> {
  return request({
    url: `/redCulture/remove/${id}`,
    method: 'delete'
  })
}

/**
 * 习思想标题数据结构
 */
export interface XiThoughtTitle {
  code: string  // 内容代码
  title: string // 标题
}

/**
 * 获取习思想标题列表
 * @returns 标题列表
 */
export function getXiThoughtTitles(): Promise<XiThoughtTitle[]> {
  return request({
    url: '/api/xiThought/titles/get',
    method: 'get'
  })
}

/**
 * 习思想视频展播数据结构
 */
export interface XiThoughtVideo {
  id: number          // 业务id
  title: string       // 标题
  coverUrl: string    // 封面图
  createTime: string  // 发布时间
  expoType: string    // 展播类型
  college: string     // 所在学院
  presenter: string   // 主持人
  content: string     // 课程简介
  videoUrl: string    // 视频
  statPv: number      // 浏览量
}

/**
 * 获取习思想视频展播Top列表
 * @returns 视频列表
 */
export function getXiThoughtVideoTopList(): Promise<XiThoughtVideo[]> {
  return request({
    url: '/api/xiThought/videoExpo/top/list',
    method: 'get'
  })
}

/**
 * 获取习思想视频详情
 * @param id 视频ID
 * @returns 视频详情
 */
export function getXiThoughtVideoDetail(id: string | number): Promise<XiThoughtVideo> {
  return request({
    url: `/api/xiThought/videoExpo/get/${id}`,
    method: 'get'
  })
}

