/**
 * 分页组件类型定义
 */

export interface PaginationProps {
  /** 当前页码 */
  page: number
  /** 每页数量 */
  pageSize: number
  /** 总数 */
  total: number
  /** 可选的每页数量 */
  pageSizes?: number[]
  /** 是否显示总数 */
  showTotal?: boolean
  /** 是否显示每页数量选择器 */
  showSizeChanger?: boolean
}

export interface PaginationEmits {
  /** 页码改变事件 */
  (e: 'pageChange', page: number): void
  /** 每页数量改变事件 */
  (e: 'sizeChange', size: number): void
}

