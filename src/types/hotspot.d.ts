/**
 * 思政热点相关类型定义
 */

/** 思政热点数据项 */
export interface HotspotItem {
  id: number
  title: string
  content: string
  contentType: number  // 0=富文本内容（内部详情）；1=URL地址（外部跳转）
  pinTop: number  // 1=置顶；0=不置顶
  statPv: number  // 浏览量
  showFront: number  // 1=显示；0=不显示
  createTime: string
  updateTime?: string
}

/** 特别专题数据项 */
export interface SpecialTopicItem {
  id: number
  title: string
  coverUrl: string
  content: string
  contentType: number  // 0=富文本内容（内部详情）；1=URL地址（外部跳转）
  sort: number
  showFront: number  // 1=显示；0=不显示
  createTime?: string
  updateTime?: string
}

