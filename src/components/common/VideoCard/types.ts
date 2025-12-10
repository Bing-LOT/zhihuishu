/**
 * 视频卡片组件类型定义
 */

export interface VideoCardProps {
  /** 缩略图 */
  thumbnail: string
  /** 标题 */
  title: string
  /** 是否为大尺寸 */
  isLarge?: boolean
}

export interface VideoCardEmits {
  (e: 'click'): void
}

