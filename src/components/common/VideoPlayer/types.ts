/**
 * 视频播放器组件类型定义
 */

export interface VideoPlayerProps {
  /** 视频 URL */
  src: string
  /** 封面图 URL */
  poster?: string
  /** 是否自动播放 */
  autoplay?: boolean
  /** 是否循环播放 */
  loop?: boolean
  /** 是否静音 */
  muted?: boolean
  /** 播放速率 */
  playbackRate?: number
}

export interface VideoPlayerEmits {
  /** 播放事件 */
  (e: 'play'): void
  /** 暂停事件 */
  (e: 'pause'): void
  /** 结束事件 */
  (e: 'ended'): void
  /** 时间更新事件 */
  (e: 'timeupdate', time: number): void
  /** 进度更新事件 */
  (e: 'progress', progress: number): void
}

