/**
 * 资源卡片组件类型定义
 */

import type { Resource } from '@/types'

export interface ResourceCardProps {
  /** 资源数据 */
  resource: Resource
  /** 是否显示操作按钮 */
  showActions?: boolean
}

export interface ResourceCardEmits {
  /** 点击事件 */
  (e: 'click', resource: Resource): void
  /** 收藏事件 */
  (e: 'favorite', id: string): void
  /** 下载事件 */
  (e: 'download', id: string): void
}

