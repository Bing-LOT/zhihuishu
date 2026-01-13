/**
 * 教学有道相关类型定义
 */

/**
 * 教师信息
 */
export interface Teacher {
  /** 教师姓名 */
  name: string
  /** 职称 */
  title?: string
}

/**
 * 教学案例
 */
export interface TeachingCase {
  /** ID */
  id: number | string
  /** 案例名称 */
  title: string
  /** 封面图片 */
  coverUrl: string
  /** 教师姓名 */
  teacherName: string
  /** 浏览人数 */
  viewCount: number
  /** 所属学院 */
  collegeName?: string
  /** 案例类型: 1-教学案例, 2-一流本科 */
  caseType?: number
  /** 是否为国家示范 */
  isNational?: boolean
  /** 创建时间 */
  createTime?: string
  /** 学校名称 */
  schoolName?: string
  /** 学科门类 */
  categoryName?: string
  /** 教学类别名称 */
  caseTypeName?: string
  /** 授课教师列表 */
  teachers?: Teacher[]
  /** 课程简介 */
  introduction?: string
  /** 教学设计 */
  designContent?: string
  /** 教学视频URL */
  videoUrl?: string
}

/**
 * 学院信息
 */
export interface College {
  /** ID */
  id: number | string
  /** 学院名称 */
  name: string
}

/**
 * 教学案例查询参数
 */
export interface TeachingCaseQuery {
  /** 学院 ID (0 表示全部) */
  collegeId?: number | string
  /** 案例类型: 1-教学案例, 2-一流本科 (0 表示全部) */
  caseType?: number
  /** 搜索关键词 */
  keyword?: string
  /** 页码 */
  page?: number
  /** 每页数量 */
  pageSize?: number
}

/**
 * 教学案例分页响应
 */
export interface TeachingCasePageResult {
  /** 列表数据 */
  list: TeachingCase[]
  /** 总数 */
  total: number
  /** 当前页码 */
  page: number
  /** 每页数量 */
  pageSize: number
}

