/**
 * 考试状态管理
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Exam, ExamRecord, ExamAnswer } from '@/types'

export const useExamStore = defineStore('exam', () => {
  // State
  const currentExam = ref<Exam | null>(null)
  const currentRecord = ref<ExamRecord | null>(null)
  const answers = ref<Map<string, ExamAnswer>>(new Map())
  const startTime = ref<string>('')
  const remainingTime = ref<number>(0)
  const isSubmitting = ref(false)

  // Getters
  const examId = computed(() => currentExam.value?.id)
  const totalQuestions = computed(() => currentExam.value?.questionCount || 0)
  const answeredCount = computed(() => answers.value.size)
  const progress = computed(() => {
    if (totalQuestions.value === 0) return 0
    return Math.round((answeredCount.value / totalQuestions.value) * 100)
  })
  const isCompleted = computed(() => answeredCount.value === totalQuestions.value)

  // Actions
  
  /**
   * 开始考试
   * @param exam 考试信息
   */
  async function startExam(exam: Exam) {
    // TODO: 实现开始考试逻辑
  }

  /**
   * 保存答案
   * @param questionId 题目 ID
   * @param answer 答案
   */
  function saveAnswer(questionId: string, answer: string | string[] | boolean) {
    // TODO: 实现保存答案逻辑
  }

  /**
   * 获取答案
   * @param questionId 题目 ID
   */
  function getAnswer(questionId: string): ExamAnswer | undefined {
    // TODO: 实现获取答案逻辑
    return undefined
  }

  /**
   * 提交考试
   */
  async function submitExam() {
    // TODO: 实现提交考试逻辑
  }

  /**
   * 自动保存（防止刷新丢失）
   */
  async function autoSave() {
    // TODO: 实现自动保存逻辑
  }

  /**
   * 更新剩余时间
   * @param seconds 剩余秒数
   */
  function updateRemainingTime(seconds: number) {
    // TODO: 实现更新剩余时间逻辑
  }

  /**
   * 重置考试状态
   */
  function resetExam() {
    // TODO: 实现重置考试状态逻辑
  }

  /**
   * 加载考试记录
   * @param recordId 记录 ID
   */
  async function loadExamRecord(recordId: string) {
    // TODO: 实现加载考试记录逻辑
  }

  /**
   * 继续未完成的考试
   * @param record 考试记录
   */
  function resumeExam(record: ExamRecord) {
    // TODO: 实现继续考试逻辑
  }

  return {
    // State
    currentExam,
    currentRecord,
    answers,
    startTime,
    remainingTime,
    isSubmitting,
    
    // Getters
    examId,
    totalQuestions,
    answeredCount,
    progress,
    isCompleted,
    
    // Actions
    startExam,
    saveAnswer,
    getAnswer,
    submitExam,
    autoSave,
    updateRemainingTime,
    resetExam,
    loadExamRecord,
    resumeExam
  }
})

