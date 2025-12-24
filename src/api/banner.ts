/**
 * Banner 管理 API
 */

import request from './request'
import { useUserStore } from '@/stores/user'

/**
 * Banner数据结构
 */
export interface BannerItem {
  id: number
  picUrl: string
  sort: number
}

/**
 * 上传文件（公共接口）
 * @param file 文件对象
 * @returns 返回文件URL
 */
/**
 * 上传文件（通过Vite代理，避免CORS）
 * 
 * 对应 API 文档的 curl 命令:
 * curl --location --request POST 'https://dszk.fzu.edu.cn/dszk-api/upload' \
 * --header 'AuthToken: 269e7eccac95435dbb626fce47c182c3' \
 * --form 'file=@"文件路径"'
 * 
 * 本地开发环境通过 Vite 代理:
 * POST http://localhost:5173/upload → https://dszk.fzu.edu.cn/dszk-api/upload
 */
export function uploadFile(file: File): Promise<{ url: string }> {
  return new Promise((resolve, reject) => {
    const userStore = useUserStore()
    
    console.log('========== 上传文件（走Vite代理） ==========')
    console.log('文件信息:', {
      name: file.name,
      size: file.size,
      type: file.type
    })
    
    // 创建FormData（必须先创建，再设置Headers）
    const formdata = new FormData()
    formdata.append("file", file)
    
    // 创建Headers对象 - 使用 AuthToken（注意大小写，与 API 文档一致）
    const myHeaders = new Headers()
    if (userStore.authToken) {
      myHeaders.append("AuthToken", userStore.authToken)
    }
    
    console.log('✅ FormData已创建: file 字段')
    console.log('✅ Headers已设置: AuthToken =', userStore.authToken)
    console.log('   (与 API 文档一致: 269e7eccac95435dbb626fce47c182c3)')
    
    // 请求配置
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    }
    
    // 使用代理路径（/upload 会被Vite代理转发到 https://dszk.fzu.edu.cn/dszk-api/upload）
    const uploadUrl = '/upload'
    console.log('请求URL:', uploadUrl)
    console.log('通过Vite代理转发到: https://dszk.fzu.edu.cn/dszk-api/upload')
    console.log('==========================================')
    
    // 使用fetch发送请求
    fetch(uploadUrl, requestOptions)
      .then(response => {
        console.log('收到响应，状态码:', response.status)
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.msg || `HTTP ${response.status}: ${response.statusText}`)
          })
        }
        return response.json()
      })
      .then(result => {
        console.log('✅ 上传成功，响应数据:', result)
        
        // 解析响应格式：{ msg, code, data: { url } }
        if (result.code === 200 && result.data?.url) {
          resolve({ url: result.data.url })
        } else {
          reject(new Error(result.msg || '上传失败'))
        }
      })
      .catch(error => {
        console.error('❌ 上传失败:', error)
        reject(error)
      })
  })
}

/**
 * 添加Banner
 * @param picUrl 图片地址
 * @param sort 排序序号
 * @returns 返回Banner ID
 */
export function addBanner(picUrl: string, sort: number): Promise<{ id: number }> {
  return request({
    url: '/banner/add',
    method: 'POST',
    data: {
      picUrl,
      sort
    }
  })
}

/**
 * 获取Banner列表
 */
export function getBannerList(): Promise<BannerItem[]> {
  return request({
    url: '/banner/list',
    method: 'GET'
  })
}

/**
 * 更新Banner
 * @param id Banner ID
 * @param picUrl 图片地址
 * @param sort 排序序号
 */
export function updateBanner(id: number, picUrl: string, sort: number): Promise<void> {
  return request({
    url: `/banner/update/${id}`,
    method: 'PUT',
    data: {
      picUrl,
      sort
    }
  })
}

/**
 * 编辑Banner (v2 - 已更新)
 * @param id Banner ID
 * @param picUrl 图片地址
 * @param sort 排序序号
 */
export function editBanner(id: number, picUrl: string, sort: number): Promise<any> {
  console.log('🔧🔧🔧 editBanner v2 函数被调用 🔧🔧🔧')
  console.log('参数:', { id, picUrl, sort })
  console.log('准备发送 PUT 请求到 /banner/edit')
  
  return request({
    url: '/banner/edit',
    method: 'PUT',
    data: {
      id,
      picUrl,
      sort
    }
  })
}

/**
 * 删除Banner
 * @param id Banner ID
 */
export function deleteBanner(id: number): Promise<void> {
  return request({
    url: `/banner/delete/${id}`,
    method: 'DELETE'
  })
}

/**
 * 删除Banner (新接口)
 * @param id Banner ID
 */
export function removeBanner(id: number): Promise<void> {
  return request({
    url: `/banner/remove/${id}`,
    method: 'DELETE'
  })
}

/**
 * 党建课程数据结构
 */
export interface PoliticalCourseItem {
  id?: number
  title: string
  content: string
  videoUrl: string
  sort: number
}

/**
 * 添加党建课程
 * @param data 党建课程数据
 */
export function addPoliticalCourse(data: PoliticalCourseItem): Promise<{ id: number }> {
  return request({
    url: '/politicalCourse/add',
    method: 'POST',
    data
  })
}

/**
 * 编辑党建课程
 * @param data 党建课程数据
 */
export function editPoliticalCourse(data: PoliticalCourseItem): Promise<void> {
  return request({
    url: '/politicalCourse/edit',
    method: 'PUT',
    data
  })
}

/**
 * 删除党建课程
 * @param id 课程ID
 */
export function deletePoliticalCourse(id: number): Promise<void> {
  return request({
    url: `/politicalCourse/remove/${id}`,
    method: 'DELETE'
  })
}

/**
 * 获取党建课程列表
 */
export function getPoliticalCourseList(): Promise<PoliticalCourseItem[]> {
  return request({
    url: '/politicalCourse/list',
    method: 'GET'
  })
}

/**
 * 习思想优秀视频展播数据结构
 */
export interface VideoExpoItem {
  title: string
  coverUrl: string
  expoType: string
  college: string
  presenter: string
  content: string
  videoUrl: string
  showFront: number
}

/**
 * 新增习思想优秀视频展播
 * @param data 视频展播数据
 */
export function addVideoExpo(data: VideoExpoItem): Promise<{ id: number }> {
  return request({
    url: '/xiThought/videoExpo/add',
    method: 'POST',
    data
  })
}

/**
 * 习思想优秀视频展播列表查询参数
 */
export interface VideoExpoListParams {
  pageIndex: number
  pageSize: number
  keyword?: string
  showFront?: number
}

/**
 * 习思想优秀视频展播列表项
 */
export interface VideoExpoListItem {
  id: number
  title: string
  coverUrl: string
  expoType: string
  college: string
  presenter: string
  content: string
  videoUrl: string
  showFront: number
  createTime?: string
  updateTime?: string
}

/**
 * 习思想优秀视频展播列表响应
 */
export interface VideoExpoListResponse {
  records: VideoExpoListItem[]  // API实际返回的是 records 而不是 list
  total: number
  size: number
  current: number
}

/**
 * 获取习思想优秀视频展播列表（分页）
 * @param params 查询参数
 */
export function getVideoExpoList(params: VideoExpoListParams): Promise<VideoExpoListResponse> {
  return request({
    url: '/xiThought/videoExpo/page/list',
    method: 'POST',
    data: params
  })
}

/**
 * 编辑习思想优秀视频展播数据结构
 */
export interface VideoExpoEditItem extends VideoExpoItem {
  id: number
}

/**
 * 编辑习思想优秀视频展播
 * @param data 视频展播数据（包含id）
 */
export function editVideoExpo(data: VideoExpoEditItem): Promise<void> {
  return request({
    url: '/xiThought/videoExpo/edit',
    method: 'PUT',
    data
  })
}

/**
 * 删除习思想优秀视频展播
 * @param id 视频ID
 */
export function deleteVideoExpo(id: number): Promise<void> {
  return request({
    url: `/xiThought/videoExpo/remove/${id}`,
    method: 'DELETE'
  })
}

/**
 * 实践案例列表查询参数
 */
export interface ExampleExpoListParams {
  pageIndex: number
  pageSize: number
  keyword?: string
  showFront?: number
}

/**
 * 实践案例列表项
 */
export interface ExampleExpoListItem {
  id: number
  name: string  // 案例/课程名称
  coverUrl: string
  property?: string  // 课程性质
  direction?: string  // 入选方向：面向产出、教学有道
  college: string
  teachers?: Array<{  // 教师信息
    name: string  // 教师姓名
    title?: string  // 职称
  }>
  content: string
  videoUrl?: string  // 教学视频
  showFront: number
  createTime?: string
  updateTime?: string
}

/**
 * 实践案例列表响应
 */
export interface ExampleExpoListResponse {
  records: ExampleExpoListItem[]  // API实际返回的是 records 而不是 list
  total: number
  size: number
  current: number
}

/**
 * 获取实践案例列表（分页）
 * @param params 查询参数
 */
export function getExampleExpoList(params: ExampleExpoListParams): Promise<ExampleExpoListResponse> {
  return request({
    url: '/xiThought/exampleExpo/page/list',
    method: 'POST',
    data: params
  })
}

/**
 * 实践案例数据结构（新增）
 */
export interface ExampleExpoItem {
  name: string  // 案例/课程名称
  coverUrl: string
  teachers: Array<{  // 教师信息
    name: string  // 教师姓名
    title: string  // 职称
  }>
  property: string  // 课程性质
  direction: string  // 入选方向：面向产出、教学有道
  college: string
  content: string
  videoUrl: string  // 教学视频
  showFront: number
}

/**
 * 新增实践案例
 * @param data 实践案例数据
 */
export function addExampleExpo(data: ExampleExpoItem): Promise<{ id: number }> {
  return request({
    url: '/xiThought/exampleExpo/add',
    method: 'POST',
    data
  })
}

/**
 * 编辑实践案例数据结构
 */
export interface ExampleExpoEditItem extends ExampleExpoItem {
  id: number
}

/**
 * 编辑实践案例
 * @param data 实践案例数据（包含id）
 */
export function editExampleExpo(data: ExampleExpoEditItem): Promise<void> {
  return request({
    url: '/xiThought/exampleExpo/edit',
    method: 'PUT',
    data
  })
}

/**
 * 删除实践案例
 * @param id 案例ID
 */
export function deleteExampleExpo(id: number): Promise<void> {
  return request({
    url: `/xiThought/exampleExpo/remove/${id}`,
    method: 'DELETE'
  })
}

/**
 * 总书记的福建足迹 - Banner数据结构
 */
export interface FootprintBannerItem {
  id: number
  picUrl: string
  sort: number
}

/**
 * 获取总书记的福建足迹 Banner列表
 */
export function getFootprintBannerList(): Promise<FootprintBannerItem[]> {
  return request({
    url: '/xiThought/footprint/banner/list',
    method: 'GET'
  })
}

/**
 * 新增总书记的福建足迹 Banner
 * @param picUrl 图片地址
 * @param sort 排序序号
 */
export function addFootprintBanner(picUrl: string, sort: number): Promise<{ id: number }> {
  return request({
    url: '/xiThought/footprint/banner/add',
    method: 'POST',
    data: {
      picUrl,
      sort
    }
  })
}

/**
 * 删除总书记的福建足迹 Banner
 * @param id Banner ID
 */
export function removeFootprintBanner(id: number): Promise<void> {
  return request({
    url: `/xiThought/footprint/banner/remove/${id}`,
    method: 'DELETE'
  })
}

/**
 * 总书记的福建足迹列表查询参数
 */
export interface FootprintListParams {
  pageIndex: number
  pageSize: number
  keyword?: string
  showFront?: number  // 显示状态：1=显示；0=不显示；不传显示所有
}

/**
 * 总书记的福建足迹列表项
 */
export interface FootprintListItem {
  id: number
  title: string
  footprintType: number  // 0=富文本内容（内部详情）；1=URL地址（外部跳转）
  content: string
  pinTop: number  // 1=置顶；0=不置顶
  statPv: number  // 浏览量
  showFront: number  // 1=显示；0=不显示
  createTime: string
}

/**
 * 总书记的福建足迹列表响应
 */
export interface FootprintListResponse {
  records: FootprintListItem[]
  total: number
  size: number
  current: number
  pages: number
}

/**
 * 获取总书记的福建足迹列表（分页）
 * @param params 查询参数
 */
export function getFootprintList(params: FootprintListParams): Promise<FootprintListResponse> {
  return request({
    url: '/xiThought/footprint/page/list',
    method: 'POST',
    data: params
  })
}

/**
 * 新增足迹数据结构
 */
export interface FootprintAddItem {
  title: string
  footprintType: number  // 0=富文本内容（内部详情）；1=URL地址（外部跳转）
  content: string
  pinTop: number  // 1=置顶；0=不置顶
  showFront: number  // 1=显示；0=不显示
}

/**
 * 新增总书记的福建足迹
 * @param data 足迹数据
 */
export function addFootprint(data: FootprintAddItem): Promise<{ id: number }> {
  return request({
    url: '/xiThought/footprint/add',
    method: 'POST',
    data
  })
}
