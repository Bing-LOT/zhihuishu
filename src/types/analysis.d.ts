/**
 * 数据分析相关类型定义
 */

/** 时间维度 */
export type TimeDimension = 'day' | 'week' | 'month' | 'year'

/** 用户统计数据 */
export interface UserAnalysis {
  /** 总用户数 */
  totalUsers: number
  /** 学生数 */
  studentCount: number
  /** 教师数 */
  teacherCount: number
  /** 管理员数 */
  adminCount: number
  /** 活跃用户数 */
  activeUsers: number
  /** 新增用户数 */
  newUsers: number
  /** 用户增长趋势 */
  userGrowthTrend: {
    date: string
    count: number
  }[]
  /** 按院系分布 */
  departmentDistribution: {
    department: string
    count: number
  }[]
}

/** 学习统计数据 */
export interface LearningAnalysis {
  /** 总学习时长（分钟） */
  totalStudyDuration: number
  /** 总学习人数 */
  totalLearners: number
  /** 课程完成数 */
  completedCourses: number
  /** 平均学习时长 */
  averageStudyDuration: number
  /** 学习时长趋势 */
  studyDurationTrend: {
    date: string
    duration: number
  }[]
  /** 热门课程 Top10 */
  popularCourses: {
    courseId: string
    courseTitle: string
    learnerCount: number
    averageProgress: number
  }[]
  /** 资源访问统计 */
  resourceAccessStats: {
    totalViews: number
    totalDownloads: number
    topResources: {
      resourceId: string
      title: string
      viewCount: number
    }[]
  }
}

/** 考试统计数据 */
export interface ExamAnalysis {
  /** 总考试次数 */
  totalExams: number
  /** 参考总人次 */
  totalParticipants: number
  /** 平均分 */
  averageScore: number
  /** 及格率 */
  passRate: number
  /** 考试趋势 */
  examTrend: {
    date: string
    examCount: number
    participantCount: number
  }[]
  /** 分数分布 */
  scoreDistribution: {
    range: string
    count: number
    percentage: number
  }[]
  /** 难题排行 */
  difficultQuestions: {
    questionId: string
    title: string
    correctRate: number
    attemptCount: number
  }[]
}

/** 综合数据看板 */
export interface Dashboard {
  /** 概览数据 */
  overview: {
    totalUsers: number
    totalCourses: number
    totalResources: number
    totalExams: number
    todayActiveUsers: number
    todayStudyDuration: number
  }
  /** 用户统计 */
  userStats: UserAnalysis
  /** 学习统计 */
  learningStats: LearningAnalysis
  /** 考试统计 */
  examStats: ExamAnalysis
}

/** 数据导出请求 */
export interface ExportDataParams {
  /** 数据类型 */
  type: 'user' | 'learning' | 'exam' | 'resource'
  /** 时间范围 */
  startDate: string
  endDate: string
  /** 导出格式 */
  format: 'excel' | 'csv' | 'pdf'
  /** 筛选条件 */
  filters?: Record<string, any>
}

/** 报表生成请求 */
export interface ReportGenerateParams {
  /** 报表类型 */
  reportType: 'weekly' | 'monthly' | 'quarterly' | 'annual'
  /** 时间参数 */
  period: string
  /** 包含的模块 */
  modules: ('user' | 'learning' | 'exam')[]
}

