/**
 * 教学有道相关 API
 */

import request from './request'
import type { 
  TeachingCase, 
  TeachingCaseQuery, 
  TeachingCasePageResult,
  College 
} from '@/types/teaching'

/**
 * 获取学院列表
 */
export function getCollegeList() {
  return request<College[]>({
    url: '/api/teaching/colleges',
    method: 'get'
  })
}

/**
 * 获取教学案例列表(分页)
 */
export function getTeachingCaseList(params: TeachingCaseQuery) {
  return request<TeachingCasePageResult>({
    url: '/api/teaching/cases',
    method: 'get',
    params
  })
}

/**
 * 获取教学案例详情
 */
export function getTeachingCaseDetail(id: number | string) {
  return request<TeachingCase>({
    url: `/api/teaching/cases/${id}`,
    method: 'get'
  })
}

/**
 * 增加教学案例浏览量
 */
export function increaseViewCount(id: number | string) {
  return request({
    url: `/api/teaching/cases/${id}/view`,
    method: 'post'
  })
}

/**
 * 获取相关推荐教学案例
 */
export function getRelatedCases(id: number | string, limit: number = 4) {
  return request<TeachingCase[]>({
    url: `/api/teaching/cases/${id}/related`,
    method: 'get',
    params: { limit }
  })
}

