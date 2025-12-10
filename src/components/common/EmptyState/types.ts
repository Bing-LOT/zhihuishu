/**
 * 空状态组件类型定义
 */

export interface EmptyStateProps {
  /** 描述文本 */
  description?: string
  /** 图标类型 */
  iconType?: 'no-data' | 'no-result' | 'network-error'
  /** 是否显示操作按钮 */
  showAction?: boolean
  /** 操作按钮文本 */
  actionText?: string
}

export interface EmptyStateEmits {
  /** 操作按钮点击事件 */
  (e: 'action'): void
}

