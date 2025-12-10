/**
 * 课程相关 API
 */

import request from './request'
import type { 
  Course, 
  CourseDetail,
  CourseQueryParams, 
  CourseFormData,
  CourseProgress,
  PaginationResponse 
} from '@/types'

/**
 * 获取课程列表
 * @param params 查询参数
 */
export function getCourseList(params: CourseQueryParams): Promise<PaginationResponse<Course>> {
  // TODO: 实现获取课程列表 API
  return request({
    url: '/courses',
    method: 'GET',
    params
  })
}

/**
 * 获取课程详情
 * @param id 课程 ID
 */
export function getCourseDetail(id: string): Promise<CourseDetail> {
  // TODO: 实现获取课程详情 API
  return request({
    url: `/courses/${id}`,
    method: 'GET'
  })
}

/**
 * 创建课程
 * @param data 课程数据
 */
export function createCourse(data: CourseFormData): Promise<Course> {
  // TODO: 实现创建课程 API
  return request({
    url: '/courses',
    method: 'POST',
    data
  })
}

/**
 * 更新课程
 * @param id 课程 ID
 * @param data 课程数据
 */
export function updateCourse(id: string, data: Partial<CourseFormData>): Promise<Course> {
  // TODO: 实现更新课程 API
  return request({
    url: `/courses/${id}`,
    method: 'PUT',
    data
  })
}

/**
 * 删除课程
 * @param id 课程 ID
 */
export function deleteCourse(id: string): Promise<void> {
  // TODO: 实现删除课程 API
  return request({
    url: `/courses/${id}`,
    method: 'DELETE'
  })
}

/**
 * 获取课程学习进度
 * @param courseId 课程 ID
 */
export function getCourseProgress(courseId: string): Promise<CourseProgress> {
  // TODO: 实现获取课程学习进度 API
  return request({
    url: `/courses/${courseId}/progress`,
    method: 'GET'
  })
}

/**
 * 更新课程学习进度
 * @param courseId 课程 ID
 * @param sectionId 小节 ID
 * @param duration 学习时长（秒）
 */
export function updateCourseProgress(
  courseId: string, 
  sectionId: string, 
  duration: number
): Promise<CourseProgress> {
  // TODO: 实现更新课程学习进度 API
  return request({
    url: `/courses/${courseId}/progress`,
    method: 'POST',
    data: { sectionId, duration }
  })
}

/**
 * 获取我的课程列表
 */
export function getMyCourses(): Promise<Course[]> {
  // TODO: 实现获取我的课程列表 API
  return request({
    url: '/courses/my',
    method: 'GET'
  })
}

/**
 * 加入课程
 * @param courseId 课程 ID
 */
export function joinCourse(courseId: string): Promise<void> {
  // TODO: 实现加入课程 API
  return request({
    url: `/courses/${courseId}/join`,
    method: 'POST'
  })
}

/**
 * 退出课程
 * @param courseId 课程 ID
 */
export function leaveCourse(courseId: string): Promise<void> {
  // TODO: 实现退出课程 API
  return request({
    url: `/courses/${courseId}/leave`,
    method: 'POST'
  })
}

