/**
 * 课程相关类型定义
 */

import type { Status } from './common'

/** 课程级别 */
export type CourseLevel = 'national' | 'provincial' | 'university'

/** 课程状态 */
export type CourseStatus = 'draft' | 'published' | 'offline'

/** 教师信息 */
export interface Teacher {
  id: string
  name: string
  title: string
  avatar?: string
  department: string
}

/** 课程章节 */
export interface CourseChapter {
  id: string
  courseId: string
  title: string
  sort: number
  sections: CourseSection[]
}

/** 课程小节 */
export interface CourseSection {
  id: string
  chapterId: string
  title: string
  sort: number
  videoUrl?: string
  duration?: number
  pdfUrl?: string
  isFree: boolean
}

/** 课程信息 */
export interface Course {
  /** 课程 ID */
  id: string
  /** 课程标题 */
  title: string
  /** 课程封面 */
  cover: string
  /** 课程描述 */
  description: string
  /** 课程级别 */
  level: CourseLevel
  /** 教师列表 */
  teacherList: Teacher[]
  /** 课程视频（预览） */
  video?: string
  /** 课程 PDF */
  pdf?: string
  /** 排序权重 */
  sort: number
  /** 状态 */
  status: CourseStatus
  /** 学习人数 */
  studentCount: number
  /** 章节总数 */
  chapterCount: number
  /** 总时长（分钟） */
  totalDuration: number
  /** 课程标签 */
  tags: string[]
  /** 创建时间 */
  createTime: string
  /** 更新时间 */
  updateTime: string
  /** 发布时间 */
  publishTime?: string
}

/** 课程详情（包含章节） */
export interface CourseDetail extends Course {
  chapters: CourseChapter[]
}

/** 课程学习进度 */
export interface CourseProgress {
  courseId: string
  userId: string
  /** 已学习章节数 */
  completedChapters: number
  /** 已学习小节数 */
  completedSections: number
  /** 学习进度百分比 */
  progress: number
  /** 学习时长（分钟） */
  studyDuration: number
  /** 最后学习时间 */
  lastStudyTime: string
  /** 是否完成 */
  isCompleted: boolean
}

/** 课程查询参数 */
export interface CourseQueryParams {
  keyword?: string
  level?: CourseLevel
  status?: CourseStatus
  teacherId?: string
  tags?: string[]
  page: number
  pageSize: number
}

/** 课程创建/更新请求 */
export interface CourseFormData {
  title: string
  cover: string
  description: string
  level: CourseLevel
  teacherIds: string[]
  video?: string
  pdf?: string
  sort: number
  status: CourseStatus
  tags: string[]
}

