/**
 * 一院一品 API
 */

import request from './request'

/**
 * 一院一品数据结构
 */
export interface CollegeItem {
  id: number // 业务id
  name: string // 课程名称
  coverUrl: string // 封面图片
  college: string // 所在学院
  teachers: string[] // 主讲教师多个
  types: string[] // 建设课程类型，多个
  content: string // 课程详细内容
  statPv: number // 浏览量
  showFront: number // 是否前台显示：1=显示；0=隐藏
  createTime: string // 发布时间
}

/**
 * 分页查询参数
 */
export interface CollegePageParams {
  pageIndex: number
  pageSize: number
  keyword?: string
  showFront?: number // 1=显示；0=隐藏；不传显示所有
  college?: string
}

/**
 * 分页响应数据
 */
export interface PageResponse<T> {
  records: T[]
  total: number
  size: number
  current: number
  pages: number
}

/**
 * 分页查询一院一品列表
 */
export function getCollegePageList(params: CollegePageParams) {
  return request.post<PageResponse<CollegeItem>>('/college/page/list', params)
}

/**
 * 新增一院一品参数
 */
export interface AddCollegeParams {
  coverUrl: string // 封面图片（必需）
  name: string // 课程名称（必需）
  college: string // 所在学院（必需）
  teachers: string[] // 主讲教师，多个（必需）
  types: string[] // 建设课程类型，多个（必需）
  content: string // 课程详情内容（必需）
  showFront: number // 前台显示：1=显示；0=隐藏（必需）
}

/**
 * 新增一院一品
 */
export function addCollege(data: AddCollegeParams) {
  return request.post('/college/add', data)
}

/**
 * 编辑一院一品参数
 */
export interface EditCollegeParams {
  id: number // 业务id（必需）
  coverUrl: string // 封面图片（必需）
  name: string // 课程名称（必需）
  college: string // 所在学院（必需）
  teachers: string[] // 主讲教师，多个（必需）
  types: string[] // 建设课程类型，多个（必需）
  content: string // 课程详情内容（必需）
  showFront: number // 前台显示：1=显示；0=隐藏（必需）
}

/**
 * 编辑一院一品
 */
export function updateCollege(data: EditCollegeParams) {
  return request.put('/college/edit', data)
}

/**
 * 删除一院一品
 */
export function deleteCollege(id: number) {
  return request.delete(`/college/remove/${id}`)
}

/**
 * 批量更新排序
 */
export function updateCollegeSort(data: { id: number; sort: number }[]) {
  return request.post('/college/sort/batch', data)
}

