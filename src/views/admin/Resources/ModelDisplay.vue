<template>
  <div class="model-display">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="page-title">
        <h2>党员教师课程思政示范展播</h2>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-left: 8px;">
          <path d="M12 5.33333L6.66667 10.6667L4 8" stroke="#999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p class="page-desc">管理党员教师课程思政示范资源</p>
    </div>

    <!-- 搜索和筛选栏 -->
    <div class="page-toolbar">
      <div class="toolbar-left">
        <div class="search-box">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="#999" stroke-width="1.5"/>
            <path d="M11 11L14 14" stroke="#999" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="搜索标题..."
            class="search-input"
            @input="handleSearch"
          />
        </div>
        
        <select v-model="statusFilter" class="status-filter" @change="handleFilter">
          <option value="all">全部状态</option>
          <option value="active">显示中</option>
          <option value="inactive">已隐藏</option>
        </select>

        <div class="data-count">
          共 {{ totalCount }} 条数据
        </div>
      </div>

      <button class="btn-add" @click="showAddDialog = true">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 2.33333V11.6667M2.33333 7H11.6667" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
        新增
      </button>
    </div>

    <!-- 列表内容 -->
    <div class="content-list">
      <div
        v-for="(item, index) in filteredItems"
        :key="item.id"
        class="content-item"
        :draggable="true"
        @dragstart="handleDragStart(index, $event)"
        @dragover.prevent
        @drop="handleDrop(index, $event)"
      >
        <!-- 拖动手柄 -->
        <div class="drag-handle">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="5" cy="3" r="1" fill="#999"/>
            <circle cx="11" cy="3" r="1" fill="#999"/>
            <circle cx="5" cy="8" r="1" fill="#999"/>
            <circle cx="11" cy="8" r="1" fill="#999"/>
            <circle cx="5" cy="13" r="1" fill="#999"/>
            <circle cx="11" cy="13" r="1" fill="#999"/>
          </svg>
        </div>

        <!-- 缩略图 -->
        <div class="item-thumbnail">
          <img :src="item.cover || '/images/home/video-1.jpg'" :alt="item.title" />
        </div>

        <!-- 内容信息 -->
        <div class="item-content">
          <h3 class="item-title">
            {{ item.title }}
            <span v-if="item.status === 'inactive'" class="hidden-tag">前台隐藏</span>
          </h3>
          
          <div class="item-meta">
            <div class="meta-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 7C8.38071 7 9.5 5.88071 9.5 4.5C9.5 3.11929 8.38071 2 7 2C5.61929 2 4.5 3.11929 4.5 4.5C4.5 5.88071 5.61929 7 7 7Z" fill="#666"/>
                <path d="M7 8.5C4.51472 8.5 2.5 10.0147 2.5 11.9V12.5H11.5V11.9C11.5 10.0147 9.48528 8.5 7 8.5Z" fill="#666"/>
              </svg>
              <span>{{ item.teacher }}</span>
            </div>

            <div class="meta-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M12 5.5L7 2L2 5.5V11C2 11.2652 2.10536 11.5196 2.29289 11.7071C2.48043 11.8946 2.73478 12 3 12H11C11.2652 12 11.5196 11.8946 11.7071 11.7071C11.8946 11.5196 12 11.2652 12 11V5.5Z" stroke="#666" stroke-width="1.2" fill="none"/>
              </svg>
              <span>{{ item.college }}</span>
            </div>

            <span class="category-tag">{{ item.category }}</span>
          </div>

          <p class="item-description">{{ item.description }}</p>

          <div class="item-footer">
            <div class="footer-info">
              <span class="sort-info">排序：第 {{ index + 1 }} 位</span>
              <span class="time-info">发布时间：{{ item.publishTime }}</span>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="item-actions">
          <button class="action-btn action-btn--edit" @click="editItem(item)" title="编辑">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L5.33301 13.3334L1.99967 14.3334L2.99967 11L11.6663 2.33337L11.333 2.00004Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button 
            class="action-btn" 
            :class="item.status === 'active' ? 'action-btn--hide' : 'action-btn--show'"
            @click="toggleVisibility(item)" 
            :title="item.status === 'active' ? '隐藏' : '显示'"
          >
            <svg v-if="item.status === 'active'" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <!-- 眼睛开启图标 -->
              <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
              <!-- 眼睛关闭图标 -->
              <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/>
              <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <button class="action-btn action-btn--delete" @click="deleteItem(item.id)" title="删除">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4H3.33333H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.33301 4.00004V2.66671C5.33301 2.31309 5.47348 1.97395 5.72353 1.7239C5.97358 1.47385 6.31272 1.33337 6.66634 1.33337H9.33301C9.68663 1.33337 10.0258 1.47385 10.2758 1.7239C10.5259 1.97395 10.6663 2.31309 10.6663 2.66671V4.00004M12.6663 4.00004V13.3334C12.6663 13.687 12.5259 14.0261 12.2758 14.2762C12.0258 14.5262 11.6866 14.6667 11.333 14.6667H4.66634C4.31272 14.6667 3.97358 14.5262 3.72353 14.2762C3.47348 14.0261 3.33301 13.687 3.33301 13.3334V4.00004H12.6663Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredItems.length === 0 && !isLoading" class="empty-state">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="#d9d9d9" stroke-width="2"/>
          <path d="M32 20V36M32 44H32.02" stroke="#d9d9d9" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <p>暂无数据</p>
      </div>

      <!-- 加载状态 -->
      <div v-if="isLoading" class="loading-state">
        <svg class="loading-icon" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="16" stroke="#e31e24" stroke-width="3" stroke-linecap="round" stroke-dasharray="80" stroke-dashoffset="60" />
        </svg>
        <p>加载中...</p>
      </div>
    </div>

    <!-- 分页 -->
    <div v-if="totalCount > 0" class="pagination-wrapper">
      <div class="pagination-info">
        显示 {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, totalCount) }} 条，共 {{ totalCount }} 条
      </div>
      <div class="pagination">
        <button 
          class="pagination-btn" 
          :disabled="currentPage === 1"
          @click="handlePageChange(currentPage - 1)"
        >
          上一页
        </button>
        
        <button
          v-for="page in visiblePages"
          :key="page"
          class="pagination-btn"
          :class="{ active: page === currentPage }"
          @click="handlePageChange(page)"
        >
          {{ page }}
        </button>
        
        <button 
          class="pagination-btn" 
          :disabled="currentPage >= Math.ceil(totalCount / pageSize)"
          @click="handlePageChange(currentPage + 1)"
        >
          下一页
        </button>
        
        <select 
          v-model="pageSize" 
          class="page-size-select"
          @change="handlePageSizeChange(pageSize)"
        >
          <option :value="10">10条/页</option>
          <option :value="20">20条/页</option>
          <option :value="50">50条/页</option>
        </select>
      </div>
    </div>

    <!-- 新增/编辑对话框 -->
    <div v-if="showAddDialog || showEditDialog" class="dialog-overlay" @click.self="closeDialog">
      <div class="dialog">
        <div class="dialog__header">
          <h3>{{ showEditDialog ? '编辑' : '新增' }}</h3>
          <button class="dialog__close" @click="closeDialog">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="#666" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        
        <div class="dialog__body">
          <!-- 封面图片上传 -->
          <div class="form-group">
            <label>课程封面 <span class="required">*</span></label>
            <div class="cover-upload-area">
              <input
                ref="coverInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="handleCoverChange"
              />
              <div v-if="formData.cover" class="cover-preview">
                <img :src="formData.cover" alt="预览" />
                <button class="cover-remove" @click="removeCover">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
              <div v-else class="cover-upload-trigger">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="2" stroke="#d9d9d9" stroke-width="2"/>
                  <path d="M16 28L20 24L24 28L30 22L32 24V32H16V28Z" fill="#d9d9d9"/>
                  <circle cx="20" cy="18" r="2" fill="#d9d9d9"/>
                </svg>
                <p class="upload-text">用于前台卡片列表的图</p>
                <button class="btn-select-cover" type="button" @click="triggerCoverUpload">选择图片</button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>课程名称 <span class="required">*</span></label>
            <input
              v-model="formData.title"
              type="text"
              placeholder="请输入课程名称"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label>示范等级 <span class="required">*</span></label>
            <select v-model="formData.level" class="form-input">
              <option value="">请选择示范等级</option>
              <option value="国家级">国家级</option>
              <option value="省级">省级</option>
              <option value="校级">校级</option>
              <option value="院级">院级</option>
            </select>
          </div>

          <div class="form-group">
            <label>课程性质 <span class="required">*</span></label>
            <select v-model="formData.category" class="form-input">
              <option value="">请选择课程性质</option>
              <option value="专业必修课程">专业必修课程</option>
              <option value="通识教育课程">通识教育课程</option>
              <option value="专业选修课程">专业选修课程</option>
              <option value="实践课程">实践课程</option>
            </select>
          </div>

          <div class="form-group">
            <label>所在学院 <span class="required">*</span></label>
            <select v-model="formData.college" class="form-input">
              <option value="">请选择学院</option>
              <option value="计算机与大数据学院">计算机与大数据学院</option>
              <option value="机械工程学院">机械工程学院</option>
              <option value="材料科学与工程学院">材料科学与工程学院</option>
              <option value="化学化工学院">化学化工学院</option>
              <option value="土木工程学院">土木工程学院</option>
              <option value="经济与管理学院">经济与管理学院</option>
              <option value="法学院">法学院</option>
              <option value="外国语学院">外国语学院</option>
              <option value="数学与统计学院">数学与统计学院</option>
              <option value="物理与信息工程学院">物理与信息工程学院</option>
              <option value="生物科学与工程学院">生物科学与工程学院</option>
              <option value="环境与安全工程学院">环境与安全工程学院</option>
              <option value="建筑与城乡规划学院">建筑与城乡规划学院</option>
              <option value="紫金矿业学院">紫金矿业学院</option>
              <option value="海洋学院">海洋学院</option>
              <option value="石油化工学院">石油化工学院</option>
              <option value="交通运输学院">交通运输学院</option>
              <option value="马克思主义学院">马克思主义学院</option>
              <option value="人文社会科学学院">人文社会科学学院</option>
            </select>
          </div>

          <div class="form-group">
            <label>教师信息 <span class="required">*</span></label>
            <div class="teacher-list">
              <div
                v-for="(teacher, index) in formData.teachers"
                :key="index"
                class="teacher-item"
              >
                <input
                  v-model="teacher.name"
                  type="text"
                  placeholder="教师姓名"
                  class="form-input teacher-input"
                />
                <input
                  v-model="teacher.title"
                  type="text"
                  placeholder="职称"
                  class="form-input teacher-input"
                />
                <button
                  v-if="formData.teachers.length > 1"
                  class="btn-remove-teacher"
                  @click="removeTeacher(index)"
                  type="button"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <button class="btn-add-teacher" type="button" @click="addTeacher">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2.33333V11.6667M2.33333 7H11.6667" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              添加教师
            </button>
          </div>

          <div class="form-group">
            <label>课程简介 <span class="required">*</span></label>
            <textarea
              v-model="formData.description"
              rows="4"
              placeholder="用于详情页的课程简介"
              class="form-input"
            ></textarea>
          </div>

          <div class="form-group">
            <label>教学设计 <span class="required">*</span></label>
            <div class="file-upload-area">
              <input
                ref="pdfInput"
                type="file"
                accept=".pdf"
                style="display: none"
                @change="handlePdfChange"
              />
              <div v-if="formData.pdfFile" class="file-preview">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#e31e24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 2V8H20" stroke="#e31e24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="file-name">{{ formData.pdfFile.name }}</span>
                <button class="btn-remove-file" type="button" @click="removePdf">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
              <div v-else class="file-upload-trigger">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M24 16V32M16 24H32" stroke="#d9d9d9" stroke-width="2" stroke-linecap="round"/>
                  <circle cx="24" cy="24" r="20" stroke="#d9d9d9" stroke-width="2" stroke-dasharray="3 3"/>
                </svg>
                <p class="upload-text">上传教学设计文档</p>
                <p class="upload-hint">仅支持上传 1 个 PDF 文档</p>
                <button class="btn-select-file" type="button" @click="triggerPdfUpload">选择 PDF 文件</button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>教学视频 <span class="required">*</span></label>
            <div class="file-upload-area">
              <input
                ref="videoInput"
                type="file"
                accept="video/mp4"
                style="display: none"
                @change="handleVideoChange"
              />
              <div v-if="formData.videoFile" class="file-preview">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="#e31e24" stroke-width="2"/>
                  <path d="M10 9L15 12L10 15V9Z" fill="#e31e24"/>
                </svg>
                <span class="file-name">{{ formData.videoFile.name }}</span>
                <button class="btn-remove-file" type="button" @click="removeVideo">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
              <div v-else class="file-upload-trigger">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M24 16V32M16 24H32" stroke="#d9d9d9" stroke-width="2" stroke-linecap="round"/>
                  <circle cx="24" cy="24" r="20" stroke="#d9d9d9" stroke-width="2" stroke-dasharray="3 3"/>
                </svg>
                <p class="upload-text">上传教学视频</p>
                <p class="upload-hint">仅支持上传 1 个视频文件</p>
                <p class="upload-hint">支持 MP4 格式，最大 500MB</p>
                <button class="btn-select-file" type="button" @click="triggerVideoUpload">选择视频文件</button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="toggle-label">
              <div class="toggle-label-text">
                <span>显示学习统计</span>
                <small>控制前台页面是否显示该课程的统计数据</small>
              </div>
              <label class="toggle-switch">
                <input v-model="formData.showStats" type="checkbox" />
                <span class="toggle-slider"></span>
              </label>
            </label>
          </div>

          <div class="form-group">
            <label class="toggle-label">
              <div class="toggle-label-text">
                <span>前台显示状态 <span class="required">*</span></span>
                <small>控制课程是否在前台展示</small>
              </div>
              <label class="toggle-switch">
                <input v-model="formData.isActive" type="checkbox" />
                <span class="toggle-slider"></span>
              </label>
            </label>
          </div>
        </div>

        <div class="dialog__footer">
          <button class="btn-cancel" @click="closeDialog" :disabled="isSaving">取消</button>
          <button class="btn-confirm" @click="saveItem" :disabled="isSaving">
            {{ isSaving ? '保存中...' : '保存' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 预览对话框 -->
    <div v-if="showPreviewDialog" class="dialog-overlay" @click.self="showPreviewDialog = false">
      <div class="dialog dialog--large">
        <div class="dialog__header">
          <h3>预览</h3>
          <button class="dialog__close" @click="showPreviewDialog = false">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="#666" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        
        <div class="dialog__body">
          <div v-if="previewData" class="preview-content">
            <img v-if="previewData.cover" :src="previewData.cover" alt="封面" class="preview-cover" />
            <h2>{{ previewData.title }}</h2>
            <div class="preview-meta">
              <span>教师：{{ previewData.teacher }}</span>
              <span>学院：{{ previewData.college }}</span>
              <span>类别：{{ previewData.category }}</span>
            </div>
            <p class="preview-description">{{ previewData.description }}</p>
            <div class="preview-time">发布时间：{{ previewData.publishTime }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { uploadFile } from '@/api/banner'
import { 
  addCourseExpo, 
  editCourseExpo, 
  getCourseExpoPageList,
  deleteCourseExpo,
  type CourseExpoAddParams, 
  type CourseExpoEditParams,
  type CourseExpoItem
} from '@/api/resource'

interface DisplayItem {
  id: string
  title: string
  levelName?: string   // 示范等级
  teacher: string
  teachers?: Array<{ name: string; title: string }>  // 完整教师信息
  college: string
  category: string
  description: string
  status: 'active' | 'inactive'
  publishTime: string
  cover?: string
  docUrl?: string      // 教学设计文档URL
  videoUrl?: string    // 教学视频URL
  showStatPv?: number  // 显示学习统计
  sort: number
}

// 数据列表
const items = ref<DisplayItem[]>([])

// 搜索和筛选
const searchKeyword = ref('')
const statusFilter = ref('all')

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const totalCount = ref(0)
const isLoading = ref(false)

// 对话框状态
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const showPreviewDialog = ref(false)
const coverInput = ref<HTMLInputElement | null>(null)
const pdfInput = ref<HTMLInputElement | null>(null)
const videoInput = ref<HTMLInputElement | null>(null)

// 表单数据
const formData = ref({
  id: '',
  title: '',
  level: '',
  college: '',
  category: '',
  teachers: [
    { name: '', title: '' }
  ],
  description: '',
  cover: '',
  coverUrl: '',  // 保存原有的封面URL
  pdfFile: null as { name: string; url: string } | null,
  videoFile: null as { name: string; url: string } | null,
  docUrl: '',    // 保存原有的PDF文档URL
  videoUrl: '',  // 保存原有的视频URL
  showStats: false,
  isActive: true,
  status: 'active' as 'active' | 'inactive',
  publishTime: new Date().toISOString().split('T')[0]
})

// 预览数据
const previewData = ref<DisplayItem | null>(null)

// 拖拽相关
const draggedIndex = ref<number | null>(null)

// 保存加载状态
const isSaving = ref(false)

// 实际文件对象（用于上传）
const actualPdfFile = ref<File | null>(null)
const actualVideoFile = ref<File | null>(null)
const actualCoverFile = ref<File | null>(null)

// 添加教师
const addTeacher = () => {
  formData.value.teachers.push({ name: '', title: '' })
}

// 移除教师
const removeTeacher = (index: number) => {
  formData.value.teachers.splice(index, 1)
}

// 触发封面上传
const triggerCoverUpload = () => {
  coverInput.value?.click()
}

// 处理封面选择
const handleCoverChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    actualCoverFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.value.cover = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

// 移除封面
const removeCover = () => {
  formData.value.cover = ''
  actualCoverFile.value = null
  if (coverInput.value) {
    coverInput.value.value = ''
  }
}

// 触发PDF上传
const triggerPdfUpload = () => {
  pdfInput.value?.click()
}

// 处理PDF选择
const handlePdfChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    if (file.type !== 'application/pdf') {
      alert('仅支持 PDF 文件')
      return
    }
    actualPdfFile.value = file
    formData.value.pdfFile = {
      name: file.name,
      url: URL.createObjectURL(file)
    }
  }
}

// 移除PDF
const removePdf = () => {
  formData.value.pdfFile = null
  actualPdfFile.value = null
  if (pdfInput.value) {
    pdfInput.value.value = ''
  }
}

// 触发视频上传
const triggerVideoUpload = () => {
  videoInput.value?.click()
}

// 处理视频选择
const handleVideoChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    if (file.type !== 'video/mp4') {
      alert('仅支持 MP4 格式')
      return
    }
    if (file.size > 500 * 1024 * 1024) {
      alert('视频文件不能超过 500MB')
      return
    }
    actualVideoFile.value = file
    formData.value.videoFile = {
      name: file.name,
      url: URL.createObjectURL(file)
    }
  }
}

// 移除视频
const removeVideo = () => {
  formData.value.videoFile = null
  actualVideoFile.value = null
  if (videoInput.value) {
    videoInput.value.value = ''
  }
}

// 计算属性
const filteredItems = computed(() => {
  return items.value.sort((a, b) => a.sort - b.sort)
})

// 可见页码列表
const visiblePages = computed(() => {
  const total = Math.ceil(totalCount.value / pageSize.value)
  const current = currentPage.value
  const pages: number[] = []
  
  // 显示当前页前后各2页
  let start = Math.max(1, current - 2)
  let end = Math.min(total, current + 2)
  
  // 确保至少显示5页
  if (end - start < 4) {
    if (start === 1) {
      end = Math.min(total, start + 4)
    } else if (end === total) {
      start = Math.max(1, end - 4)
    }
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// 转换API数据到显示数据
const convertToDisplayItem = (item: CourseExpoItem, index: number): DisplayItem => {
  const teacherNames = item.teachers.map(t => t.name).join('、')
  return {
    id: String(item.id),
    title: item.name,
    levelName: item.levelName,
    teacher: teacherNames,
    teachers: item.teachers,           // 保存完整教师信息
    college: item.college,
    category: item.property,
    description: item.brief,
    status: item.showFront === 1 ? 'active' : 'inactive',
    publishTime: item.createTime || item.updateTime || new Date().toISOString().split('T')[0],
    cover: item.coverUrl,
    docUrl: item.docUrl,
    videoUrl: item.videoUrl,
    showStatPv: item.showStatPv,       // 保存统计显示状态
    sort: index + 1
  }
}

// 加载数据
const loadData = async () => {
  try {
    isLoading.value = true
    console.log('加载课程展播列表数据...')
    
    // 组装查询参数
    const params = {
      pageIndex: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchKeyword.value || undefined,
      showFront: statusFilter.value === 'all' ? undefined : 
                 statusFilter.value === 'active' ? 1 : 0
    }
    
    console.log('查询参数:', params)
    
    const response = await getCourseExpoPageList(params)
    console.log('查询结果:', response)
    
    // 转换数据格式
    items.value = response.records.map((item, index) => 
      convertToDisplayItem(item, (currentPage.value - 1) * pageSize.value + index)
    )
    totalCount.value = response.total
    
    console.log('数据加载成功，共', totalCount.value, '条')
  } catch (error: any) {
    console.error('加载数据失败:', error)
    alert(error.message || '加载数据失败，请重试')
  } finally {
    isLoading.value = false
  }
}

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1  // 搜索时重置到第一页
  loadData()
}

// 筛选处理
const handleFilter = () => {
  currentPage.value = 1  // 筛选时重置到第一页
  loadData()
}

// 分页处理
const handlePageChange = (page: number) => {
  currentPage.value = page
  loadData()
}

const handlePageSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
  loadData()
}

// 拖拽开始
const handleDragStart = (index: number, event: DragEvent) => {
  draggedIndex.value = index
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
}

// 拖拽放下
const handleDrop = (targetIndex: number, event: DragEvent) => {
  event.preventDefault()
  if (draggedIndex.value === null || draggedIndex.value === targetIndex) return

  const draggedItem = filteredItems.value[draggedIndex.value]
  const targetItem = filteredItems.value[targetIndex]
  
  // 交换排序
  const tempSort = draggedItem.sort
  draggedItem.sort = targetItem.sort
  targetItem.sort = tempSort

  draggedIndex.value = null
}

// 从URL提取文件名
const getFileNameFromUrl = (url: string, defaultName: string): string => {
  if (!url) return defaultName
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    const fileName = pathname.substring(pathname.lastIndexOf('/') + 1)
    return fileName || defaultName
  } catch {
    // 如果不是完整URL，尝试从路径中提取
    const parts = url.split('/')
    return parts[parts.length - 1] || defaultName
  }
}

// 编辑项目
const editItem = (item: DisplayItem) => {
  // 使用完整的教师信息（包括职称），如果没有则从名字解析
  const teachersArray = item.teachers && item.teachers.length > 0 
    ? item.teachers 
    : item.teacher.split('、').map(name => ({ name, title: '' }))
  
  // 如果有文档URL，显示文件信息
  const pdfFileInfo = item.docUrl ? {
    name: getFileNameFromUrl(item.docUrl, '教学设计.pdf'),
    url: item.docUrl
  } : null
  
  // 如果有视频URL，显示文件信息
  const videoFileInfo = item.videoUrl ? {
    name: getFileNameFromUrl(item.videoUrl, '教学视频.mp4'),
    url: item.videoUrl
  } : null
  
  formData.value = {
    id: item.id,
    title: item.title,
    level: item.levelName || '',          // 回显示范等级
    college: item.college,
    category: item.category,
    teachers: teachersArray.length > 0 ? teachersArray : [{ name: '', title: '' }],
    description: item.description,
    cover: item.cover || '',
    coverUrl: item.cover || '',           // 保存原有封面URL
    pdfFile: pdfFileInfo,                 // 回显PDF文件信息
    videoFile: videoFileInfo,             // 回显视频文件信息
    docUrl: item.docUrl || '',            // 保存原有PDF文档URL
    videoUrl: item.videoUrl || '',        // 保存原有视频URL
    showStats: item.showStatPv === 1,     // 回显统计显示状态
    isActive: item.status === 'active',
    status: item.status,
    publishTime: item.publishTime
  }
  showEditDialog.value = true
}

// 预览项目
const previewItem = (item: DisplayItem) => {
  previewData.value = item
  showPreviewDialog.value = true
}

// 切换显示/隐藏状态
const toggleVisibility = async (item: DisplayItem) => {
  try {
    const newStatus = item.status === 'active' ? 'inactive' : 'active'
    const statusText = newStatus === 'active' ? '显示' : '隐藏'
    
    if (!confirm(`确定要将此课程设置为${statusText}状态吗？`)) {
      return
    }
    
    console.log('切换显示状态，课程ID:', item.id, '目标状态:', statusText)
    
    // 准备编辑参数
    const params: CourseExpoEditParams = {
      id: item.id,
      name: item.title,
      coverUrl: item.cover || '',
      levelName: item.levelName || '',
      property: item.category,
      college: item.college,
      brief: item.description,
      docUrl: item.docUrl || '',
      videoUrl: item.videoUrl || '',
      showStatPv: item.showStatPv || 0,
      showFront: newStatus === 'active' ? 1 : 0,  // 切换显示状态
      teachers: item.teachers || []
    }
    
    console.log('调用编辑API，参数:', params)
    await editCourseExpo(params)
    console.log('状态切换成功')
    
    alert(`已设置为${statusText}状态`)
    
    // 重新加载数据
    await loadData()
  } catch (error: any) {
    console.error('状态切换失败:', error)
    alert(error.message || '操作失败，请重试')
  }
}

// 删除项目
const deleteItem = async (id: string) => {
  if (confirm('确定要删除这条内容吗？')) {
    try {
      console.log('删除课程展播，ID:', id)
      await deleteCourseExpo(id)
      console.log('删除成功')
      alert('删除成功')
      
      // 重新加载数据
      await loadData()
    } catch (error: any) {
      console.error('删除失败:', error)
      alert(error.message || '删除失败，请重试')
    }
  }
}

// 保存项目
const saveItem = async () => {
  // 验证必填项
  if (!formData.value.title) {
    alert('请输入课程名称')
    return
  }
  if (!formData.value.level) {
    alert('请选择示范等级')
    return
  }
  if (!formData.value.category) {
    alert('请选择课程性质')
    return
  }
  if (!formData.value.college) {
    alert('请选择所在学院')
    return
  }
  
  const validTeachers = formData.value.teachers.filter(t => t.name && t.title)
  if (validTeachers.length === 0) {
    alert('请至少添加一位教师信息')
    return
  }
  
  if (!formData.value.description) {
    alert('请输入课程简介')
    return
  }
  
  if (!showEditDialog.value) {
    // 新增时的验证
    if (!actualCoverFile.value) {
      alert('请上传课程封面')
      return
    }
    if (!actualPdfFile.value) {
      alert('请上传教学设计文档')
      return
    }
    if (!actualVideoFile.value) {
      alert('请上传教学视频')
      return
    }
  } else {
    // 编辑时的验证：如果移除了原文件，必须重新上传
    if (!actualPdfFile.value && !formData.value.docUrl) {
      alert('请上传教学设计文档')
      return
    }
    if (!actualVideoFile.value && !formData.value.videoUrl) {
      alert('请上传教学视频')
      return
    }
  }

  try {
    isSaving.value = true
    
    // 上传封面图片
    let coverUrl = formData.value.cover
    if (actualCoverFile.value) {
      console.log('开始上传封面...')
      const coverResult = await uploadFile(actualCoverFile.value)
      coverUrl = coverResult.url
      console.log('封面上传成功:', coverUrl)
    }
    
    // 上传PDF文件
    let docUrl = ''
    if (actualPdfFile.value) {
      console.log('开始上传PDF文件...')
      const pdfResult = await uploadFile(actualPdfFile.value)
      docUrl = pdfResult.url
      console.log('PDF上传成功:', docUrl)
    }
    
    // 上传视频文件
    let videoUrl = ''
    if (actualVideoFile.value) {
      console.log('开始上传视频文件...')
      const videoResult = await uploadFile(actualVideoFile.value)
      videoUrl = videoResult.url
      console.log('视频上传成功:', videoUrl)
    }

    const teacherNames = validTeachers.map(t => t.name).join('、')

    if (showEditDialog.value) {
      // 编辑 - 调用编辑API
      // 如果没有上传新文件，使用原有的URL
      const finalDocUrl = docUrl || formData.value.docUrl
      const finalVideoUrl = videoUrl || formData.value.videoUrl
      
      const params: CourseExpoEditParams = {
        id: formData.value.id,
        name: formData.value.title,
        coverUrl: coverUrl,
        levelName: formData.value.level,
        property: formData.value.category,
        college: formData.value.college,
        brief: formData.value.description,
        docUrl: finalDocUrl,
        videoUrl: finalVideoUrl,
        showStatPv: formData.value.showStats ? 1 : 0,
        showFront: formData.value.isActive ? 1 : 0,
        teachers: validTeachers
      }
      
      console.log('调用编辑API，参数:', params)
      await editCourseExpo(params)
      console.log('编辑成功')
      
      alert('编辑成功')
      closeDialog()
      
      // 重新加载数据
      await loadData()
    } else {
      // 新增 - 调用API
      const params: CourseExpoAddParams = {
        name: formData.value.title,
        coverUrl: coverUrl,
        levelName: formData.value.level,
        property: formData.value.category,
        college: formData.value.college,
        brief: formData.value.description,
        docUrl: docUrl,
        videoUrl: videoUrl,
        showStatPv: formData.value.showStats ? 1 : 0,
        showFront: formData.value.isActive ? 1 : 0,
        teachers: validTeachers
      }
      
      console.log('调用新增API，参数:', params)
      await addCourseExpo(params)
      console.log('新增成功')
      
      alert('新增成功')
      closeDialog()
      
      // 重新加载数据
      currentPage.value = 1  // 新增后回到第一页
      await loadData()
    }
  } catch (error: any) {
    console.error('保存失败:', error)
    alert(error.message || '保存失败，请重试')
  } finally {
    isSaving.value = false
  }
}

// 关闭对话框
const closeDialog = () => {
  showAddDialog.value = false
  showEditDialog.value = false
  formData.value = {
    id: '',
    title: '',
    level: '',
    college: '',
    category: '',
    teachers: [{ name: '', title: '' }],
    description: '',
    cover: '',
    coverUrl: '',
    pdfFile: null,
    videoFile: null,
    docUrl: '',
    videoUrl: '',
    showStats: false,
    isActive: true,
    status: 'active',
    publishTime: new Date().toISOString().split('T')[0]
  }
  // 清空文件引用
  actualCoverFile.value = null
  actualPdfFile.value = null
  actualVideoFile.value = null
}

// 初始化加载数据
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.model-display {
  max-width: 1400px;
}

/* 页面标题 */
.page-header {
  margin-bottom: 24px;
}

.page-title {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.page-title h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 400;
  color: #e31e24;
}

.page-desc {
  margin: 0;
  font-size: 14px;
  color: #666;
}

/* 工具栏 */
.page-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 16px;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  min-width: 240px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
}

.status-filter {
  padding: 8px 12px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.data-count {
  font-size: 14px;
  color: #666;
}

.btn-add {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  background: #e31e24;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
  flex-shrink: 0;
}

.btn-add:hover {
  background: #c71b20;
}

/* 列表内容 */
.content-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.content-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  transition: all 0.3s;
  cursor: move;
}

.content-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.drag-handle {
  flex-shrink: 0;
  padding: 8px 4px;
  cursor: grab;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.drag-handle:hover {
  opacity: 1;
}

.item-thumbnail {
  width: 160px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
  background: #f5f5f5;
}

.item-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-title {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hidden-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  background: #ff4d4f;
  color: white;
  font-size: 12px;
  font-weight: 400;
  border-radius: 2px;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #666;
}

.category-tag {
  padding: 2px 12px;
  background: #fff7e6;
  color: #d48806;
  border-radius: 2px;
  font-size: 12px;
}

.item-description {
  margin: 8px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.item-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}

.footer-info {
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 14px;
  color: #999;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.action-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn--edit {
  color: #1890ff;
}

.action-btn--edit:hover {
  background: #e6f7ff;
}

.action-btn--hide {
  color: #52c41a;
}

.action-btn--hide:hover {
  background: #f6ffed;
}

.action-btn--show {
  color: #ff9800;
}

.action-btn--show:hover {
  background: #fff7e6;
}

.action-btn--delete {
  color: #ff4d4f;
}

.action-btn--delete:hover {
  background: #fff1f0;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #999;
}

.empty-state p {
  margin: 16px 0 0;
  font-size: 14px;
}

/* 对话框 */
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.dialog {
  width: 600px;
  max-width: 90vw;
  max-height: 85vh;
  background: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.dialog--large {
  width: 800px;
}

.dialog__header {
  padding: 20px 24px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.dialog__header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.dialog__close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.dialog__close:hover {
  background: #f5f5f5;
}

.dialog__body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.form-group {
  margin-bottom: 20px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.required {
  color: #ff4d4f;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #e31e24;
}

textarea.form-input {
  resize: vertical;
  min-height: 80px;
}

.radio-group {
  display: flex;
  gap: 24px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.radio-label input {
  cursor: pointer;
}

/* 封面上传区域 */
.cover-upload-area {
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  background: #fafafa;
}

.cover-upload-trigger {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.upload-text {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.cover-preview {
  position: relative;
  width: 100%;
  max-height: 200px;
}

.cover-preview img {
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 4px;
}

.cover-remove {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.cover-remove:hover {
  background: rgba(0, 0, 0, 0.8);
}

.btn-select-cover {
  padding: 8px 24px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-select-cover:hover {
  background: #096dd9;
}

/* 教师列表 */
.teacher-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.teacher-item {
  display: flex;
  gap: 12px;
  align-items: center;
}

.teacher-input {
  flex: 1;
}

.btn-remove-teacher {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #ff4d4f;
  border: 1px solid #ffccc7;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-remove-teacher:hover {
  background: #fff1f0;
  border-color: #ff4d4f;
}

.btn-add-teacher {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  background: transparent;
  color: #1890ff;
  border: 1px dashed #91d5ff;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-add-teacher:hover {
  border-color: #1890ff;
  background: #e6f7ff;
}

/* 文件上传区域 */
.file-upload-area {
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  padding: 32px 24px;
  background: #fafafa;
}

.file-upload-trigger {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.file-upload-trigger p {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.upload-hint {
  margin: 0;
  font-size: 12px;
  color: #999;
}

.btn-select-file {
  margin-top: 8px;
  padding: 8px 24px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-select-file:hover {
  background: #096dd9;
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #fafafa;
  border-radius: 4px;
}

.file-name {
  flex: 1;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-remove-file {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #ff4d4f;
  border: 1px solid #ffccc7;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-remove-file:hover {
  background: #fff1f0;
  border-color: #ff4d4f;
}

/* 开关标签 */
.toggle-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
}

.toggle-label-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.toggle-label-text span {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.toggle-label-text small {
  font-size: 12px;
  color: #999;
  font-weight: 400;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

.toggle-switch input:checked + .toggle-slider {
  background-color: #52c41a;
}

.toggle-switch input:checked + .toggle-slider:before {
  transform: translateX(20px);
}

.dialog__footer {
  padding: 16px 24px;
  border-top: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-shrink: 0;
}

.btn-cancel,
.btn-confirm {
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cancel {
  background: white;
  color: #333;
  border: 1px solid #d9d9d9;
}

.btn-cancel:hover {
  border-color: #e31e24;
  color: #e31e24;
}

.btn-confirm {
  background: #e31e24;
  color: white;
  border: none;
}

.btn-confirm:hover {
  background: #c71b20;
}

/* 预览内容 */
.preview-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.preview-cover {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
}

.preview-content h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.preview-meta {
  display: flex;
  gap: 24px;
  font-size: 14px;
  color: #666;
}

.preview-description {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
}

.preview-time {
  font-size: 14px;
  color: #999;
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #666;
}

.loading-state p {
  margin: 16px 0 0;
  font-size: 14px;
}

.loading-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 分页 */
.pagination-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  padding: 16px 0;
}

.pagination-info {
  font-size: 14px;
  color: #666;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-btn {
  min-width: 36px;
  height: 36px;
  padding: 0 12px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled) {
  border-color: #e31e24;
  color: #e31e24;
}

.pagination-btn.active {
  background: #e31e24;
  border-color: #e31e24;
  color: white;
}

.pagination-btn:disabled {
  background: #f5f5f5;
  border-color: #d9d9d9;
  color: #bbb;
  cursor: not-allowed;
}

.page-size-select {
  margin-left: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.page-size-select:hover {
  border-color: #e31e24;
}

.page-size-select:focus {
  outline: none;
  border-color: #e31e24;
}
</style>

