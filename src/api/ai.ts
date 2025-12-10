/**
 * AI 助手 API
 */

import request from './request'

/**
 * AI 对话消息
 */
export interface AIChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
}

/**
 * AI 对话会话
 */
export interface AIChatSession {
  id: string
  title: string
  messages: AIChatMessage[]
  createTime: string
  updateTime: string
}

/**
 * AI 推荐结果
 */
export interface AIRecommendation {
  type: 'course' | 'resource' | 'exam'
  id: string
  title: string
  reason: string
  score: number
}

/**
 * 发送 AI 对话消息
 * @param sessionId 会话 ID
 * @param message 消息内容
 */
export function sendChatMessage(sessionId: string, message: string): Promise<AIChatMessage> {
  // TODO: 实现发送 AI 对话消息 API
  return request({
    url: `/ai/chat/${sessionId}`,
    method: 'POST',
    data: { message }
  })
}

/**
 * 创建 AI 对话会话
 */
export function createChatSession(): Promise<AIChatSession> {
  // TODO: 实现创建 AI 对话会话 API
  return request({
    url: '/ai/chat',
    method: 'POST'
  })
}

/**
 * 获取 AI 对话会话列表
 */
export function getChatSessions(): Promise<AIChatSession[]> {
  // TODO: 实现获取 AI 对话会话列表 API
  return request({
    url: '/ai/chat',
    method: 'GET'
  })
}

/**
 * 获取 AI 对话会话详情
 * @param sessionId 会话 ID
 */
export function getChatSession(sessionId: string): Promise<AIChatSession> {
  // TODO: 实现获取 AI 对话会话详情 API
  return request({
    url: `/ai/chat/${sessionId}`,
    method: 'GET'
  })
}

/**
 * 删除 AI 对话会话
 * @param sessionId 会话 ID
 */
export function deleteChatSession(sessionId: string): Promise<void> {
  // TODO: 实现删除 AI 对话会话 API
  return request({
    url: `/ai/chat/${sessionId}`,
    method: 'DELETE'
  })
}

/**
 * 获取 AI 推荐内容
 * @param type 推荐类型
 * @param limit 推荐数量
 */
export function getRecommendations(
  type?: 'course' | 'resource' | 'exam',
  limit = 10
): Promise<AIRecommendation[]> {
  // TODO: 实现获取 AI 推荐内容 API
  return request({
    url: '/ai/recommend',
    method: 'GET',
    params: { type, limit }
  })
}

/**
 * AI 内容生成
 * @param prompt 提示词
 * @param type 生成类型
 */
export function generateContent(
  prompt: string,
  type: 'question' | 'analysis' | 'summary'
): Promise<{ content: string }> {
  // TODO: 实现 AI 内容生成 API
  return request({
    url: '/ai/generate',
    method: 'POST',
    data: { prompt, type }
  })
}

