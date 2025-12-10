/**
 * 题目相关类型定义
 */

/** 题目类型 */
export type QuestionType = 'single' | 'multiple' | 'judge'

/** 题目难度 */
export type QuestionDifficulty = 'easy' | 'medium' | 'hard'

/** 选项 */
export interface QuestionOption {
  key: string
  content: string
}

/** 题目基础接口 */
export interface BaseQuestion {
  /** 题目 ID */
  id: string
  /** 题目类型 */
  type: QuestionType
  /** 题目标题/题干 */
  title: string
  /** 难度 */
  difficulty: QuestionDifficulty
  /** 分值 */
  score: number
  /** 所属课程 ID */
  courseId?: string
  /** 所属章节 ID */
  chapterId?: string
  /** 标签 */
  tags: string[]
  /** 解析 */
  analysis?: string
  /** 创建时间 */
  createTime: string
  /** 更新时间 */
  updateTime: string
}

/** 单选题 */
export interface SingleChoiceQuestion extends BaseQuestion {
  type: 'single'
  /** 选项列表 */
  options: QuestionOption[]
  /** 正确答案（选项 key） */
  answer: string
}

/** 多选题 */
export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple'
  /** 选项列表 */
  options: QuestionOption[]
  /** 正确答案（选项 key 数组） */
  answer: string[]
}

/** 判断题 */
export interface JudgeQuestion extends BaseQuestion {
  type: 'judge'
  /** 正确答案 */
  answer: boolean
}

/** 题目联合类型 */
export type Question = SingleChoiceQuestion | MultipleChoiceQuestion | JudgeQuestion

/** 题目查询参数 */
export interface QuestionQueryParams {
  keyword?: string
  type?: QuestionType
  difficulty?: QuestionDifficulty
  courseId?: string
  chapterId?: string
  tags?: string[]
  page: number
  pageSize: number
}

/** 题目创建请求 */
export interface QuestionFormData {
  type: QuestionType
  title: string
  difficulty: QuestionDifficulty
  score: number
  courseId?: string
  chapterId?: string
  tags: string[]
  options?: QuestionOption[]
  answer: string | string[] | boolean
  analysis?: string
}

/** 题库统计 */
export interface QuestionStats {
  /** 总题数 */
  total: number
  /** 各类型题目数量 */
  byType: Record<QuestionType, number>
  /** 各难度题目数量 */
  byDifficulty: Record<QuestionDifficulty, number>
  /** 今日新增 */
  todayAdded: number
}

