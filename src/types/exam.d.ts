/**
 * 考试相关类型定义
 */

import type { Question } from './question'

/** 考试状态 */
export type ExamStatus = 'draft' | 'published' | 'ongoing' | 'finished' | 'archived'

/** 考试类型 */
export type ExamType = 'practice' | 'exam' | 'mock'

/** 考试信息 */
export interface Exam {
  /** 考试 ID */
  id: string
  /** 考试标题 */
  title: string
  /** 考试类型 */
  type: ExamType
  /** 考试描述 */
  description?: string
  /** 关联课程 ID */
  courseId?: string
  /** 总分 */
  totalScore: number
  /** 及格分 */
  passScore: number
  /** 考试时长（分钟） */
  duration: number
  /** 题目数量 */
  questionCount: number
  /** 开始时间 */
  startTime: string
  /** 结束时间 */
  endTime: string
  /** 状态 */
  status: ExamStatus
  /** 参考人数 */
  participantCount: number
  /** 创建人 ID */
  creatorId: string
  /** 创建人姓名 */
  creatorName: string
  /** 创建时间 */
  createTime: string
  /** 更新时间 */
  updateTime: string
}

/** 考试详情（包含题目） */
export interface ExamDetail extends Exam {
  questions: Question[]
}

/** 考试答案记录 */
export interface ExamAnswer {
  questionId: string
  /** 学生答案 */
  answer: string | string[] | boolean
  /** 是否正确 */
  isCorrect?: boolean
  /** 得分 */
  score?: number
}

/** 考试记录 */
export interface ExamRecord {
  /** 记录 ID */
  id: string
  /** 考试 ID */
  examId: string
  /** 考试标题 */
  examTitle: string
  /** 用户 ID */
  userId: string
  /** 用户姓名 */
  userName: string
  /** 答题记录 */
  answers: ExamAnswer[]
  /** 总分 */
  totalScore: number
  /** 得分 */
  score: number
  /** 是否及格 */
  isPassed: boolean
  /** 正确题数 */
  correctCount: number
  /** 答题进度（百分比） */
  progress: number
  /** 开始时间 */
  startTime: string
  /** 提交时间 */
  submitTime?: string
  /** 用时（秒） */
  duration?: number
  /** 状态 */
  status: 'in_progress' | 'submitted' | 'expired'
}

/** 考试统计 */
export interface ExamStatistics {
  examId: string
  /** 参考人数 */
  participantCount: number
  /** 提交人数 */
  submitCount: number
  /** 及格人数 */
  passCount: number
  /** 及格率 */
  passRate: number
  /** 平均分 */
  averageScore: number
  /** 最高分 */
  highestScore: number
  /** 最低分 */
  lowestScore: number
  /** 分数分布 */
  scoreDistribution: {
    range: string
    count: number
  }[]
}

/** 考试查询参数 */
export interface ExamQueryParams {
  keyword?: string
  type?: ExamType
  status?: ExamStatus
  courseId?: string
  page: number
  pageSize: number
}

/** 考试创建/更新请求 */
export interface ExamFormData {
  title: string
  type: ExamType
  description?: string
  courseId?: string
  totalScore: number
  passScore: number
  duration: number
  questionIds: string[]
  startTime: string
  endTime: string
  status: ExamStatus
}

