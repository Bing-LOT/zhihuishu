/**
 * 考试相关 API
 */

import request from './request'
import type { 
  Exam, 
  ExamDetail,
  ExamQueryParams, 
  ExamFormData,
  ExamRecord,
  ExamStatistics,
  ExamAnswer,
  Question,
  QuestionQueryParams,
  QuestionFormData,
  PaginationResponse 
} from '@/types'

/**
 * 获取考试列表
 * @param params 查询参数
 */
export function getExamList(params: ExamQueryParams): Promise<PaginationResponse<Exam>> {
  // TODO: 实现获取考试列表 API
  return request({
    url: '/exams',
    method: 'GET',
    params
  })
}

/**
 * 获取考试详情
 * @param id 考试 ID
 */
export function getExamDetail(id: string): Promise<ExamDetail> {
  // TODO: 实现获取考试详情 API
  return request({
    url: `/exams/${id}`,
    method: 'GET'
  })
}

/**
 * 创建考试
 * @param data 考试数据
 */
export function createExam(data: ExamFormData): Promise<Exam> {
  // TODO: 实现创建考试 API
  return request({
    url: '/exams',
    method: 'POST',
    data
  })
}

/**
 * 更新考试
 * @param id 考试 ID
 * @param data 考试数据
 */
export function updateExam(id: string, data: Partial<ExamFormData>): Promise<Exam> {
  // TODO: 实现更新考试 API
  return request({
    url: `/exams/${id}`,
    method: 'PUT',
    data
  })
}

/**
 * 删除考试
 * @param id 考试 ID
 */
export function deleteExam(id: string): Promise<void> {
  // TODO: 实现删除考试 API
  return request({
    url: `/exams/${id}`,
    method: 'DELETE'
  })
}

/**
 * 开始考试
 * @param examId 考试 ID
 */
export function startExam(examId: string): Promise<ExamRecord> {
  // TODO: 实现开始考试 API
  return request({
    url: `/exams/${examId}/start`,
    method: 'POST'
  })
}

/**
 * 提交考试
 * @param examId 考试 ID
 * @param answers 答案列表
 */
export function submitExam(examId: string, answers: ExamAnswer[]): Promise<ExamRecord> {
  // TODO: 实现提交考试 API
  return request({
    url: `/exams/${examId}/submit`,
    method: 'POST',
    data: { answers }
  })
}

/**
 * 获取考试记录
 * @param recordId 记录 ID
 */
export function getExamRecord(recordId: string): Promise<ExamRecord> {
  // TODO: 实现获取考试记录 API
  return request({
    url: `/exam-records/${recordId}`,
    method: 'GET'
  })
}

/**
 * 获取我的考试记录列表
 * @param examId 考试 ID（可选）
 */
export function getMyExamRecords(examId?: string): Promise<ExamRecord[]> {
  // TODO: 实现获取我的考试记录列表 API
  return request({
    url: '/exam-records/my',
    method: 'GET',
    params: { examId }
  })
}

/**
 * 获取考试统计
 * @param examId 考试 ID
 */
export function getExamStatistics(examId: string): Promise<ExamStatistics> {
  // TODO: 实现获取考试统计 API
  return request({
    url: `/exams/${examId}/statistics`,
    method: 'GET'
  })
}

/**
 * 获取题目列表
 * @param params 查询参数
 */
export function getQuestionList(params: QuestionQueryParams): Promise<PaginationResponse<Question>> {
  // TODO: 实现获取题目列表 API
  return request({
    url: '/questions',
    method: 'GET',
    params
  })
}

/**
 * 获取题目详情
 * @param id 题目 ID
 */
export function getQuestionDetail(id: string): Promise<Question> {
  // TODO: 实现获取题目详情 API
  return request({
    url: `/questions/${id}`,
    method: 'GET'
  })
}

/**
 * 创建题目
 * @param data 题目数据
 */
export function createQuestion(data: QuestionFormData): Promise<Question> {
  // TODO: 实现创建题目 API
  return request({
    url: '/questions',
    method: 'POST',
    data
  })
}

/**
 * 更新题目
 * @param id 题目 ID
 * @param data 题目数据
 */
export function updateQuestion(id: string, data: Partial<QuestionFormData>): Promise<Question> {
  // TODO: 实现更新题目 API
  return request({
    url: `/questions/${id}`,
    method: 'PUT',
    data
  })
}

/**
 * 删除题目
 * @param id 题目 ID
 */
export function deleteQuestion(id: string): Promise<void> {
  // TODO: 实现删除题目 API
  return request({
    url: `/questions/${id}`,
    method: 'DELETE'
  })
}

