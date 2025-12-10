/**
 * 课程卡片组件类型定义
 */

import type { Course } from '@/types'

export interface CourseCardProps {
  /** 课程数据 */
  course: Course
  /** 是否显示进度 */
  showProgress?: boolean
  /** 学习进度（百分比） */
  progress?: number
}

export interface CourseCardEmits {
  /** 点击事件 */
  (e: 'click', course: Course): void
  /** 继续学习事件 */
  (e: 'continue', id: string): void
}

