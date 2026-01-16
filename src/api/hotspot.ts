/**
 * 思政热点 API
 */

import request from './request'

/**
 * 思政热点数据结构
 */
export interface HotspotItem {
  id: number
  title: string
  source?: string  // 来源（如：新华网、人民日报等）
  content: string
  contentType?: number  // 0=富文本内容（内部详情）；1=URL地址（外部跳转）
  pinTop?: number  // 1=置顶；0=不置顶
  statPv?: number  // 浏览量
  showFront: number  // 1=显示；0=不显示
  createTime: string
  updateTime?: string
}

/**
 * 思政热点列表查询参数
 */
export interface HotspotListParams {
  pageIndex: number
  pageSize: number
  keyword?: string
  showFront?: number  // 显示状态：1=显示；0=不显示；不传显示所有
}

/**
 * 思政热点列表响应
 */
export interface HotspotListResponse {
  records: HotspotItem[]
  total: number
  size: number
  current: number
  pages: number
}

/**
 * 获取思政热点列表（分页）
 * @param params 查询参数
 */
export function getHotspotList(params: HotspotListParams): Promise<HotspotListResponse> {
  return request({
    url: '/api/news/page/list',
    method: 'POST',
    data: params
  })
}

/**
 * 获取思政热点详情
 * @param id 热点ID
 */
export function getHotspotDetail(id: string | number): Promise<HotspotItem> {
  return request({
    url: `/api/news/get/${id}`,
    method: 'GET'
  })
}

/**
 * 新增思政热点数据结构
 */
export interface HotspotAddItem {
  title: string  // 标题（必需）
  source?: string  // 来源（可选）
  content: string  // 内容（必需）
  showFront: number  // 前台显示：1=显示；0=隐藏（必需）
}

/**
 * 新增思政热点
 * @param data 热点数据
 */
export function addHotspot(data: HotspotAddItem): Promise<{ id: number }> {
  return request({
    url: '/news/add',
    method: 'POST',
    data
  })
}

/**
 * 编辑思政热点数据结构
 */
export interface HotspotEditItem extends HotspotAddItem {
  id: number  // id（必需）
}

/**
 * 编辑思政热点
 * @param data 热点数据（包含id）
 */
export function editHotspot(data: HotspotEditItem): Promise<void> {
  return request({
    url: '/news/edit',
    method: 'PUT',
    data
  })
}

/**
 * 删除思政热点
 * @param id 热点ID
 */
export function removeHotspot(id: number): Promise<void> {
  return request({
    url: `/news/remove/${id}`,
    method: 'DELETE'
  })
}

/**
 * 切换思政热点显示/隐藏状态参数
 */
export interface ToggleShowFrontParams {
  id: number  // 热点ID（必需）
  showFront: number  // 前台显示：1=显示；0=隐藏（必需）
}

/**
 * 切换思政热点显示/隐藏状态
 * @param params 包含id和showFront的参数
 */
export function toggleHotspotShowFront(params: ToggleShowFrontParams): Promise<void> {
  return request({
    url: '/news/showFront/edit',
    method: 'PUT',
    data: params
  })
}

/**
 * 特别专题数据结构
 */
export interface SpecialTopicItem {
  id: number
  title: string
  coverUrl: string
  content: string
  contentType: number  // 0=富文本内容（内部详情）；1=URL地址（外部跳转）
  sort: number
  showFront: number  // 1=显示；0=不显示
  createTime?: string
  updateTime?: string
}

/**
 * 获取特别专题列表
 */
export function getSpecialTopicList(): Promise<SpecialTopicItem[]> {
  return request({
    url: '/specialTopic/list',
    method: 'GET'
  })
}

/**
 * 新增特别专题
 * @param data 专题数据
 */
export function addSpecialTopic(data: Omit<SpecialTopicItem, 'id' | 'createTime' | 'updateTime'>): Promise<{ id: number }> {
  return request({
    url: '/specialTopic/add',
    method: 'POST',
    data
  })
}

/**
 * 编辑特别专题
 * @param data 专题数据（包含id）
 */
export function editSpecialTopic(data: Omit<SpecialTopicItem, 'createTime' | 'updateTime'>): Promise<void> {
  return request({
    url: '/specialTopic/edit',
    method: 'PUT',
    data
  })
}

/**
 * 删除特别专题
 * @param id 专题ID
 */
export function removeSpecialTopic(id: number): Promise<void> {
  return request({
    url: `/specialTopic/remove/${id}`,
    method: 'DELETE'
  })
}

