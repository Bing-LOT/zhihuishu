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
    url: `/redCulture/delete/${id}`,
    method: 'delete'
  })
}

