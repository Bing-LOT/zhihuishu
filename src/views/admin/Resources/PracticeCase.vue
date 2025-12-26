<template>
  <div class="practice-case">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="page-title">
        <h2>习思想融入学科教学实践示范案例展播</h2>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style="margin-left: 8px;"
        >
          <path
            d="M12 5.33333L6.66667 10.6667L4 8"
            stroke="#999"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <p class="page-desc">
        管理习思想融入学科教学实践示范案例
      </p>
    </div>

    <!-- 搜索和筛选栏 -->
    <div class="page-toolbar">
      <div class="toolbar-left">
        <div class="search-box">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle
              cx="7"
              cy="7"
              r="5"
              stroke="#999"
              stroke-width="1.5"
            />
            <path
              d="M11 11L14 14"
              stroke="#999"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="搜索标题..."
            class="search-input"
            @input="handleSearch"
          >
        </div>
        
        <select
          v-model="statusFilter"
          class="filter-select"
          @change="handleFilter"
        >
          <option value="all">
            全部状态
          </option>
          <option value="active">
            显示中
          </option>
          <option value="inactive">
            已隐藏
          </option>
        </select>
      </div>

      <button
        class="btn-add"
        @click="showAddDialog = true"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M7 2.33333V11.6667M2.33333 7H11.6667"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        新增
      </button>
    </div>

    <!-- 数据统计 -->
    <div class="data-stats">
      共 {{ totalCount }} 条
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
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle
              cx="5"
              cy="3"
              r="1"
              fill="#999"
            />
            <circle
              cx="11"
              cy="3"
              r="1"
              fill="#999"
            />
            <circle
              cx="5"
              cy="8"
              r="1"
              fill="#999"
            />
            <circle
              cx="11"
              cy="8"
              r="1"
              fill="#999"
            />
            <circle
              cx="5"
              cy="13"
              r="1"
              fill="#999"
            />
            <circle
              cx="11"
              cy="13"
              r="1"
              fill="#999"
            />
          </svg>
        </div>

        <!-- 缩略图 -->
        <div class="item-thumbnail">
          <img
            :src="item.cover || '/images/home/video-1.jpg'"
            :alt="item.title"
          >
        </div>

        <!-- 内容信息 -->
        <div class="item-content">
          <h3 class="item-title">
            {{ item.title }}
            <span
              v-if="item.status === 'inactive'"
              class="status-badge status-badge--hidden"
            >前台隐藏</span>
          </h3>
          
          <div class="item-meta">
            <div class="meta-item">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M7 7C8.38071 7 9.5 5.88071 9.5 4.5C9.5 3.11929 8.38071 2 7 2C5.61929 2 4.5 3.11929 4.5 4.5C4.5 5.88071 5.61929 7 7 7Z"
                  fill="#666"
                />
                <path
                  d="M7 8.5C4.51472 8.5 2.5 10.0147 2.5 11.9V12.5H11.5V11.9C11.5 10.0147 9.48528 8.5 7 8.5Z"
                  fill="#666"
                />
              </svg>
              <span>{{ item.teacher }}</span>
            </div>

            <div class="meta-item">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M12 5.5L7 2L2 5.5V11C2 11.2652 2.10536 11.5196 2.29289 11.7071C2.48043 11.8946 2.73478 12 3 12H11C11.2652 12 11.5196 11.8946 11.7071 11.7071C11.8946 11.5196 12 11.2652 12 11V5.5Z"
                  stroke="#d4a574"
                  stroke-width="1.2"
                  fill="none"
                />
              </svg>
              <span style="color: #d4a574;">{{ item.college }}</span>
            </div>

            <span class="category-tag">{{ item.category }}</span>
          </div>

          <p class="item-description">
            {{ item.description }}
          </p>

          <div class="item-footer">
            <div class="footer-info">
              <span class="sort-info">排序：第 {{ index + 1 }} 位</span>
              <span class="time-info">发布时间：{{ item.publishTime }}</span>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="item-actions">
          <button
            class="action-btn action-btn--edit"
            title="编辑"
            @click="editItem(item)"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L5.33301 13.3334L1.99967 14.3334L2.99967 11L11.6663 2.33337L11.333 2.00004Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button 
            class="action-btn" 
            :class="item.status === 'active' ? 'action-btn--hide' : 'action-btn--show'"
            :title="item.status === 'active' ? '隐藏' : '显示'" 
            @click="toggleVisibility(item)"
          >
            <svg
              v-if="item.status === 'active'"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <!-- 眼睛打开图标 -->
              <path
                d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <circle
                cx="8"
                cy="8"
                r="2"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
            <svg
              v-else
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <!-- 眼睛关闭图标 -->
              <path
                d="M13.5 2.5L2.5 13.5M5.5 5.5C4.6 6.2 4 7 4 8C4 8 5.5 11 8 11C8.5 11 9 10.9 9.5 10.7M10.5 10.5C11.4 9.8 12 9 12 8C12 8 10.5 5 8 5C7.5 5 7 5.1 6.5 5.3"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M9.5 6.5L6.5 9.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <button
            class="action-btn action-btn--delete"
            title="删除"
            @click="deleteItem(item.id)"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M2 4H3.33333H14"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.33301 4.00004V2.66671C5.33301 2.31309 5.47348 1.97395 5.72353 1.7239C5.97358 1.47385 6.31272 1.33337 6.66634 1.33337H9.33301C9.68663 1.33337 10.0258 1.47385 10.2758 1.7239C10.5259 1.97395 10.6663 2.31309 10.6663 2.66671V4.00004M12.6663 4.00004V13.3334C12.6663 13.687 12.5259 14.0261 12.2758 14.2762C12.0258 14.5262 11.6866 14.6667 11.333 14.6667H4.66634C4.31272 14.6667 3.97358 14.5262 3.72353 14.2762C3.47348 14.0261 3.33301 13.687 3.33301 13.3334V4.00004H12.6663Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- 空状态 -->
      <div
        v-if="filteredItems.length === 0 && !loading"
        class="empty-state"
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
        >
          <circle
            cx="32"
            cy="32"
            r="30"
            stroke="#d9d9d9"
            stroke-width="2"
          />
          <path
            d="M32 20V36M32 44H32.02"
            stroke="#d9d9d9"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <p>暂无数据</p>
      </div>

      <!-- 加载状态 -->
      <div
        v-if="loading"
        class="loading-state"
      >
        <div class="loading-spinner" />
        <p>加载中...</p>
      </div>
    </div>

    <!-- 分页组件 -->
    <div
      v-if="totalCount > 0"
      class="pagination"
    >
      <div class="pagination-info">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style="display: inline-block; vertical-align: middle; margin-right: 6px;"
        >
          <path
            d="M8 2V8L12 10"
            stroke="#666"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle
            cx="8"
            cy="8"
            r="6"
            stroke="#666"
            stroke-width="1.5"
          />
        </svg>
        显示第 <strong>{{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, totalCount) }}</strong> 条，共 <strong>{{ totalCount }}</strong> 条
      </div>
      <div class="pagination-controls">
        <button 
          class="pagination-btn pagination-btn--prev" 
          :disabled="currentPage === 1"
          title="上一页"
          @click="handlePageChange(currentPage - 1)"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M9 11L5 7L9 3"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          上一页
        </button>
        
        <button
          v-for="page in visiblePages"
          :key="page"
          class="pagination-btn pagination-btn--page"
          :class="{ 'pagination-btn--active': page === currentPage }"
          @click="handlePageChange(page)"
        >
          {{ page }}
        </button>
        
        <button 
          class="pagination-btn pagination-btn--next" 
          :disabled="currentPage === totalPages"
          title="下一页"
          @click="handlePageChange(currentPage + 1)"
        >
          下一页
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M5 3L9 7L5 11"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        
        <div class="pagination-divider" />
        
        <select
          v-model="pageSize"
          class="pagination-size"
          title="每页显示条数"
          @change="handlePageSizeChange"
        >
          <option :value="10">
            10 条/页
          </option>
          <option :value="20">
            20 条/页
          </option>
          <option :value="50">
            50 条/页
          </option>
          <option :value="100">
            100 条/页
          </option>
        </select>
      </div>
    </div>

    <!-- 新增/编辑对话框 -->
    <div
      v-if="showAddDialog || showEditDialog"
      class="dialog-overlay"
      @click.self="closeDialog"
    >
      <div class="dialog">
        <div class="dialog__header">
          <h3>{{ showEditDialog ? '编辑案例' : '新增案例' }}</h3>
          <button
            class="dialog__close"
            @click="closeDialog"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="#666"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
        
        <div class="dialog__body">
          <div class="form-group">
            <label>标题 <span class="required">*</span></label>
            <input
              v-model="formData.title"
              type="text"
              placeholder="请输入标题"
              class="form-input"
            >
          </div>

          <div class="form-group">
            <label>封面图片 <span class="required">*</span></label>
            <div class="image-upload-box">
              <input
                ref="coverInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="handleCoverChange"
              >
              <div
                v-if="formData.cover"
                class="image-preview-box"
              >
                <img
                  :src="formData.cover"
                  alt="预览"
                >
                <button
                  class="btn-remove-image"
                  @click="removeCover"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M12 4L4 12M4 4L12 12"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>
              <div
                v-else
                class="image-upload-empty"
              >
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                >
                  <rect
                    x="10"
                    y="15"
                    width="60"
                    height="50"
                    rx="4"
                    stroke="#999"
                    stroke-width="2"
                    fill="none"
                  />
                  <circle
                    cx="30"
                    cy="32"
                    r="6"
                    stroke="#999"
                    stroke-width="2"
                    fill="none"
                  />
                  <path
                    d="M10 55L25 40L35 50L50 35L70 55"
                    stroke="#999"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p class="upload-hint">
                  上传封面图片
                </p>
                <button
                  class="btn-upload-blue"
                  type="button"
                  @click="triggerCoverUpload"
                >
                  选择图片
                </button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>教师姓名 <span class="required">*</span></label>
            <input
              v-model="formData.teacherName"
              type="text"
              placeholder="请输入教师姓名"
              class="form-input"
            >
          </div>

          <div class="form-group">
            <label>教师职称 <span class="required">*</span></label>
            <input
              v-model="formData.teacherTitle"
              type="text"
              placeholder="请输入教师职称，如：教授、副教授、讲师等"
              class="form-input"
            >
          </div>

          <div class="form-group">
            <label>所属单位 <span class="required">*</span></label>
            <select
              v-model="formData.unit"
              class="form-input"
            >
              <option value="">
                请选择学院
              </option>
              <option value="计算机与大数据学院">
                计算机与大数据学院
              </option>
              <option value="机械工程学院">
                机械工程学院
              </option>
              <option value="材料科学与工程学院">
                材料科学与工程学院
              </option>
              <option value="化学化工学院">
                化学化工学院
              </option>
              <option value="土木工程学院">
                土木工程学院
              </option>
              <option value="经济与管理学院">
                经济与管理学院
              </option>
              <option value="法学院">
                法学院
              </option>
              <option value="外国语学院">
                外国语学院
              </option>
              <option value="数学与统计学院">
                数学与统计学院
              </option>
              <option value="物理与信息工程学院">
                物理与信息工程学院
              </option>
              <option value="生物科学与工程学院">
                生物科学与工程学院
              </option>
              <option value="环境与安全工程学院">
                环境与安全工程学院
              </option>
              <option value="建筑与城乡规划学院">
                建筑与城乡规划学院
              </option>
              <option value="紫金矿业学院">
                紫金矿业学院
              </option>
              <option value="海洋学院">
                海洋学院
              </option>
              <option value="石油化工学院">
                石油化工学院
              </option>
              <option value="交通运输学院">
                交通运输学院
              </option>
              <option value="马克思主义学院">
                马克思主义学院
              </option>
              <option value="人文社会科学学院">
                人文社会科学学院
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>课程分类 <span class="required">*</span></label>
            <select
              v-model="formData.category"
              class="form-input"
            >
              <option value="">
                请选择课程分类
              </option>
              <option value="专业必修课程">
                专业必修课程
              </option>
              <option value="通识教育课程">
                通识教育课程
              </option>
              <option value="专业选修课程">
                专业选修课程
              </option>
              <option value="实践课程">
                实践课程
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>入选方向 <span class="required">*</span></label>
            <select
              v-model="formData.direction"
              class="form-input"
            >
              <option value="">
                请选择入选方向
              </option>
              <option value="面向产出">
                面向产出
              </option>
              <option value="教学有道">
                教学有道
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>思政元素 <span class="required">*</span></label>
            <textarea
              v-model="formData.content"
              class="form-textarea"
              placeholder="请输入思政元素内容"
              rows="6"
            />
            <small class="field-hint">提示：请输入课程相关的思政元素内容</small>
          </div>

          <div class="form-group">
            <label>教学视频 <span class="required">*</span></label>
            <input
              v-model="formData.videoUrl"
              type="text"
              placeholder="请输入教学视频URL地址"
              class="form-input"
            >
            <small class="field-hint">提示：请输入完整的视频URL地址</small>
          </div>

          <div class="form-group">
            <label>显示顺序</label>
            <input
              v-model.number="formData.displayOrder"
              type="number"
              min="1"
              class="form-input"
              placeholder="1"
            >
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input
                v-model="formData.showOnFrontend"
                type="checkbox"
              >
              <span>前台显示</span>
            </label>
          </div>
        </div>

        <div class="dialog__footer">
          <button
            class="btn-cancel"
            @click="closeDialog"
          >
            取消
          </button>
          <button
            class="btn-confirm"
            @click="saveItem"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M11.6667 6.33333V11.6667C11.6667 12.0203 11.5262 12.3594 11.2762 12.6095C11.0261 12.8595 10.687 13 10.3333 13H3.66667C3.31304 13 2.97391 12.8595 2.72386 12.6095C2.47381 12.3594 2.33333 12.0203 2.33333 11.6667V2.33333C2.33333 1.97971 2.47381 1.64057 2.72386 1.39052C2.97391 1.14048 3.31304 1 3.66667 1H9L11.6667 3.66667V6.33333Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.66667 13V8.33333H4.33333V13"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            保存
          </button>
        </div>
      </div>
    </div>

    <!-- 预览对话框 -->
    <div
      v-if="showPreviewDialog"
      class="dialog-overlay"
      @click.self="showPreviewDialog = false"
    >
      <div class="dialog dialog--large">
        <div class="dialog__header">
          <h3>案例预览</h3>
          <button
            class="dialog__close"
            @click="showPreviewDialog = false"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="#666"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
        
        <div class="dialog__body">
          <div
            v-if="previewData"
            class="preview-content"
          >
            <div
              v-if="previewData.cover"
              class="preview-cover"
            >
              <img
                :src="previewData.cover"
                alt="封面"
              >
            </div>
            <h2>{{ previewData.title }}</h2>
            <div class="preview-meta">
              <span>教师：{{ previewData.teacher }}</span>
              <span>学院：{{ previewData.college }}</span>
              <span>类别：{{ previewData.category }}</span>
            </div>
            <div class="preview-section">
              <h3>思政元素</h3>
              <p class="preview-description">
                {{ previewData.description }}
              </p>
            </div>
            <div class="preview-time">
              发布时间：{{ previewData.publishTime }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { 
  getExampleExpoList, 
  addExampleExpo, 
  editExampleExpo, 
  deleteExampleExpo,
  type ExampleExpoListItem,
  type ExampleExpoItem,
  type ExampleExpoEditItem
} from '@/api/banner'
import { uploadFile } from '@/api/banner'

interface CaseItem {
  id: number
  title: string
  teacher: string
  teacherTitle?: string  // 教师职称
  college: string
  category: string
  property?: string  // 课程性质（原始值）
  direction?: string  // 入选方向（原始值）
  description: string  // 摘要文本（用于列表显示）
  fullContent: string  // 完整的思政元素内容（用于编辑和预览）
  videoUrl?: string  // 教学视频URL
  status: 'active' | 'inactive'
  publishTime: string
  cover?: string
  sort: number
}

// 数据列表
const items = ref<CaseItem[]>([])

// 加载状态
const loading = ref(false)

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const totalCount = ref(0)

// 搜索和筛选
const searchKeyword = ref('')
const statusFilter = ref('all')

// 对话框状态
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const showPreviewDialog = ref(false)
const coverInput = ref<HTMLInputElement | null>(null)

// 表单数据
const formData = ref({
  id: 0,
  title: '',
  cover: '',
  teacherName: '',
  teacherTitle: '',  // 教师职称
  unit: '',
  category: '',
  direction: '',  // 入选方向
  content: '',
  videoUrl: '',  // 教学视频
  displayOrder: 1,
  showOnFrontend: true
})

// 预览数据
const previewData = ref<CaseItem | null>(null)

// 拖拽相关
const draggedIndex = ref<number | null>(null)

// 计算总页数
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize.value))

// 计算可见的页码
const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 5
  const half = Math.floor(maxVisible / 2)
  
  let start = Math.max(1, currentPage.value - half)
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// 过滤后的列表
const filteredItems = computed(() => items.value)

// 转换 API 数据为组件数据格式
const convertApiToItem = (apiItem: ExampleExpoListItem): CaseItem => {
  // 提取第一个教师的信息
  const teacherName = apiItem.teachers && apiItem.teachers.length > 0 
    ? apiItem.teachers[0].name 
    : ''
  const teacherTitle = apiItem.teachers && apiItem.teachers.length > 0 
    ? apiItem.teachers[0].title 
    : ''
  
  // 组合显示分类信息
  const categoryDisplay = [apiItem.direction, apiItem.property].filter(Boolean).join(' / ') || '未分类'
  
  // 截取思政元素内容用于列表显示
  const content = apiItem.content || ''
  const description = content.length > 120 ? content.substring(0, 120) + '...' : content
  
  return {
    id: apiItem.id,
    title: apiItem.name || '',  // API字段是name
    teacher: teacherName,
    teacherTitle: teacherTitle,  // 保存教师职称用于编辑回显
    college: apiItem.college || '',
    category: categoryDisplay,
    property: apiItem.property,  // 保存原始值
    direction: apiItem.direction,  // 保存原始值
    description: description,
    fullContent: content,
    videoUrl: apiItem.videoUrl || '',  // 保存视频URL
    status: apiItem.showFront === 1 ? 'active' : 'inactive',
    publishTime: apiItem.createTime ? apiItem.createTime.split(' ')[0] : '',
    cover: apiItem.coverUrl || '',
    sort: 0
  }
}

// 获取列表数据
const fetchList = async () => {
  try {
    loading.value = true
    
    const params = {
      pageIndex: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchKeyword.value || undefined,
      showFront: statusFilter.value === 'all' ? undefined : (statusFilter.value === 'active' ? 1 : 0)
    }
    
    console.log('📤 请求参数:', params)
    const response = await getExampleExpoList(params)
    console.log('📥 API响应数据:', response)
    
    // 安全检查：确保响应数据结构正确（API返回的是records字段）
    if (response && Array.isArray(response.records)) {
      items.value = response.records.map(convertApiToItem)
      totalCount.value = response.total || 0
      console.log('✅ 数据加载成功，共', totalCount.value, '条')
    } else {
      console.error('❌ 响应数据格式错误:', response)
      items.value = []
      totalCount.value = 0
      alert('数据格式错误，请联系管理员')
    }
  } catch (error) {
    console.error('获取列表失败:', error)
    alert('获取列表失败，请稍后重试')
    items.value = []
    totalCount.value = 0
  } finally {
    loading.value = false
  }
}

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1
  fetchList()
}

// 筛选处理
const handleFilter = () => {
  currentPage.value = 1
  fetchList()
}

// 页码改变
const handlePageChange = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  fetchList()
}

// 每页条数改变
const handlePageSizeChange = () => {
  currentPage.value = 1
  fetchList()
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

// 触发封面上传
const triggerCoverUpload = () => {
  coverInput.value?.click()
}

// 处理封面选择
const handleCoverChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    try {
      loading.value = true
      const result = await uploadFile(file)
      formData.value.cover = result.url
      alert('图片上传成功')
    } catch (error) {
      console.error('图片上传失败:', error)
      alert('图片上传失败，请重试')
    } finally {
      loading.value = false
    }
  }
}

// 移除封面
const removeCover = () => {
  formData.value.cover = ''
  if (coverInput.value) {
    coverInput.value.value = ''
  }
}

// 编辑项目
const editItem = (item: CaseItem) => {
  formData.value = {
    id: item.id,
    title: item.title,
    cover: item.cover || '',
    teacherName: item.teacher,
    teacherTitle: item.teacherTitle || '',  // 回显教师职称
    unit: item.college,
    category: item.property || item.category,  // 使用原始的property值
    direction: item.direction || '',  // 回显入选方向
    content: item.fullContent, // 使用完整的思政元素内容
    videoUrl: item.videoUrl || '',  // 回显视频URL
    displayOrder: item.sort,
    showOnFrontend: item.status === 'active'
  }
  showEditDialog.value = true
}

// 预览项目
const previewItem = (item: CaseItem) => {
  // 预览时使用完整的思政元素内容
  previewData.value = {
    ...item,
    description: item.fullContent
  }
  showPreviewDialog.value = true
}

// 删除项目
const deleteItem = async (id: number) => {
  if (confirm('确定要删除这个案例吗？')) {
    try {
      loading.value = true
      await deleteExampleExpo(id)
      alert('删除成功')
      // 重新获取列表
      await fetchList()
    } catch (error) {
      console.error('删除失败:', error)
      alert('删除失败，请重试')
    } finally {
      loading.value = false
    }
  }
}

// 切换显示/隐藏状态
const toggleVisibility = async (item: CaseItem) => {
  const newStatus = item.status === 'active' ? 0 : 1
  const statusText = newStatus === 1 ? '显示' : '隐藏'
  
  if (confirm(`确定要${statusText}这个案例吗？`)) {
    try {
      loading.value = true
      
      // 构建API数据
      const apiData: ExampleExpoItem = {
        name: item.title,
        coverUrl: item.cover || '',
        teachers: [{
          name: item.teacher,
          title: item.teacherTitle || '教师'
        }],
        property: item.property || '其他',
        direction: item.direction || '面向产出',
        college: item.college,
        content: item.fullContent,
        videoUrl: item.videoUrl || '',
        showFront: newStatus  // 切换状态
      }
      
      // 调用编辑API
      await editExampleExpo({
        ...apiData,
        id: item.id
      } as ExampleExpoEditItem)
      
      alert(`已${statusText}`)
      // 重新获取列表
      await fetchList()
    } catch (error) {
      console.error('切换状态失败:', error)
      alert('操作失败，请重试')
    } finally {
      loading.value = false
    }
  }
}

// 保存项目
const saveItem = async () => {
  // 验证必填项
  if (!formData.value.title) {
    alert('请输入标题')
    return
  }
  if (!formData.value.cover) {
    alert('请上传封面图片')
    return
  }
  if (!formData.value.teacherName) {
    alert('请输入教师姓名')
    return
  }
  if (!formData.value.teacherTitle) {
    alert('请输入教师职称')
    return
  }
  if (!formData.value.unit) {
    alert('请选择所属单位')
    return
  }
  if (!formData.value.category) {
    alert('请选择课程分类')
    return
  }
  if (!formData.value.direction) {
    alert('请选择入选方向')
    return
  }
  if (!formData.value.content) {
    alert('请输入思政元素')
    return
  }
  if (!formData.value.videoUrl) {
    alert('请输入教学视频URL')
    return
  }

  try {
    loading.value = true
    
    // 将表单数据转换为API需要的格式
    const apiData: ExampleExpoItem = {
      name: formData.value.title,  // 标题字段是name
      coverUrl: formData.value.cover,
      teachers: [{  // 教师数组格式
        name: formData.value.teacherName,
        title: formData.value.teacherTitle  // 使用表单的教师职称
      }],
      property: formData.value.category || '其他',  // 课程性质
      direction: formData.value.direction,  // 使用表单的入选方向
      college: formData.value.unit,
      content: formData.value.content,
      videoUrl: formData.value.videoUrl,  // 使用表单的视频URL
      showFront: formData.value.showOnFrontend ? 1 : 0
    }

    console.log('💾 保存API数据:', apiData)

    if (showEditDialog.value) {
      // 编辑
      await editExampleExpo({
        ...apiData,
        id: formData.value.id
      } as ExampleExpoEditItem)
      alert('编辑成功')
    } else {
      // 新增
      await addExampleExpo(apiData)
      alert('新增成功')
    }

    closeDialog()
    // 重新获取列表
    await fetchList()
  } catch (error) {
    console.error('保存失败:', error)
    alert('保存失败，请重试')
  } finally {
    loading.value = false
  }
}

// 关闭对话框
const closeDialog = () => {
  showAddDialog.value = false
  showEditDialog.value = false
  formData.value = {
    id: 0,
    title: '',
    cover: '',
    teacherName: '',
    teacherTitle: '',  // 重置教师职称
    unit: '',
    category: '',
    direction: '',  // 重置入选方向
    content: '',
    videoUrl: '',  // 重置视频URL
    displayOrder: 1,
    showOnFrontend: true
  }
}

// 组件挂载时获取数据
onMounted(() => {
  fetchList()
})
</script>

<style scoped>
.practice-case {
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
  margin-bottom: 16px;
  gap: 16px;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  min-width: 280px;
  transition: all 0.3s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.search-box:focus-within {
  border-color: #e31e24;
  box-shadow: 0 0 0 3px rgba(227, 30, 36, 0.1);
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
}

.search-input::placeholder {
  color: #999;
}

.filter-select {
  padding: 10px 14px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  min-width: 130px;
  transition: all 0.3s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  color: #333;
}

.filter-select:hover {
  border-color: #e31e24;
}

.filter-select:focus {
  outline: none;
  border-color: #e31e24;
  box-shadow: 0 0 0 3px rgba(227, 30, 36, 0.1);
}

.btn-add {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: linear-gradient(135deg, #e31e24 0%, #c71b20 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(227, 30, 36, 0.3);
}

.btn-add:hover {
  background: linear-gradient(135deg, #c71b20 0%, #a81619 100%);
  box-shadow: 0 4px 16px rgba(227, 30, 36, 0.4);
  transform: translateY(-2px);
}

.btn-add:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(227, 30, 36, 0.3);
}

/* 数据统计 */
.data-stats {
  margin-bottom: 16px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-left: 3px solid #e31e24;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
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
  padding: 20px;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: move;
  position: relative;
}

.content-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #e31e24;
  border-radius: 8px 0 0 8px;
  opacity: 0;
  transition: opacity 0.3s;
}

.content-item:hover {
  box-shadow: 0 6px 20px rgba(227, 30, 36, 0.08);
  border-color: #e31e24;
  transform: translateY(-2px);
}

.content-item:hover::before {
  opacity: 1;
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
  width: 180px;
  height: 110px;
  flex-shrink: 0;
  border-radius: 6px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s;
}

.content-item:hover .item-thumbnail {
  transform: scale(1.03);
}

.item-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.content-item:hover .item-thumbnail img {
  transform: scale(1.05);
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-title {
  margin: 0 0 12px;
  font-size: 17px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.5;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 12px;
}

.content-item:hover .item-title {
  color: #e31e24;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
}

.status-badge--hidden {
  background: #fff1f0;
  color: #ff4d4f;
  border: 1px solid #ffccc7;
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
  padding: 4px 14px;
  background: linear-gradient(135deg, #fff7e6 0%, #fffaf0 100%);
  color: #d48806;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #ffe7ba;
  box-shadow: 0 1px 3px rgba(212, 136, 6, 0.1);
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
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.action-btn--edit {
  color: #1890ff;
}

.action-btn--edit:hover {
  background: #e6f7ff;
  border-color: #91d5ff;
}

.action-btn--show {
  color: #52c41a;
}

.action-btn--show:hover {
  background: #f6ffed;
  border-color: #b7eb8f;
}

.action-btn--hide {
  color: #faad14;
}

.action-btn--hide:hover {
  background: #fffbe6;
  border-color: #ffe58f;
}

.action-btn--delete {
  color: #ff4d4f;
}

.action-btn--delete:hover {
  background: #fff1f0;
  border-color: #ffa39e;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  background: white;
  border-radius: 8px;
  color: #999;
}

.empty-state svg {
  opacity: 0.6;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.05));
}

.empty-state p {
  margin: 20px 0 0;
  font-size: 15px;
  font-weight: 500;
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

.form-textarea {
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.8;
  resize: vertical;
  transition: border-color 0.3s;
}

.form-textarea:focus {
  outline: none;
  border-color: #e31e24;
  box-shadow: 0 0 0 2px rgba(227, 30, 36, 0.1);
}

.field-hint {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: #999;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #1890ff;
}

/* 图片上传区域 */
.image-upload-box {
  border: 2px dashed #d9d9d9;
  border-radius: 4px;
  padding: 24px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-preview-box {
  position: relative;
  width: 100%;
}

.image-preview-box img {
  width: 100%;
  max-height: 200px;
  object-fit: contain;
}

.btn-remove-image {
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

.btn-remove-image:hover {
  background: rgba(0, 0, 0, 0.8);
}

.image-upload-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.upload-hint {
  margin: 0;
  font-size: 14px;
  color: #999;
}

.upload-title {
  margin: 0;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.btn-upload-blue {
  padding: 8px 24px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-upload-blue:hover {
  background: #096dd9;
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
  display: inline-flex;
  align-items: center;
  gap: 8px;
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
  border-radius: 8px;
  overflow: hidden;
}

.preview-cover img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
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

.preview-section {
  margin: 24px 0;
}

.preview-section h3 {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.preview-description {
  font-size: 15px;
  line-height: 1.8;
  color: #666;
  white-space: pre-wrap;
  word-break: break-word;
}

.preview-time {
  font-size: 14px;
  color: #999;
}

/* 分页样式 */
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
  padding: 20px 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.pagination-info {
  font-size: 14px;
  color: #666;
}

.pagination-info strong {
  color: #333;
  font-weight: 600;
}

.pagination-controls {
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  color: #e31e24;
  border-color: #e31e24;
}

.pagination-btn:disabled {
  color: #d9d9d9;
  background: #f5f5f5;
  cursor: not-allowed;
  border-color: #d9d9d9;
}

.pagination-btn--page {
  min-width: 36px;
  padding: 0;
}

.pagination-btn--active {
  background: #e31e24;
  color: white;
  border-color: #e31e24;
  font-weight: 600;
}

.pagination-btn--active:hover {
  background: #c71b20;
  border-color: #c71b20;
}

.pagination-btn--prev,
.pagination-btn--next {
  padding: 0 16px;
  gap: 6px;
}

.pagination-btn--prev svg {
  margin-right: 4px;
}

.pagination-btn--next svg {
  margin-left: 4px;
}

.pagination-divider {
  width: 1px;
  height: 20px;
  background: #d9d9d9;
  margin: 0 4px;
}

.pagination-size {
  height: 36px;
  padding: 0 12px;
  margin-left: 8px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-size:hover {
  border-color: #e31e24;
}

.pagination-size:focus {
  outline: none;
  border-color: #e31e24;
  box-shadow: 0 0 0 2px rgba(227, 30, 36, 0.1);
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

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f0f0f0;
  border-top-color: #e31e24;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 响应式优化 */
@media (max-width: 768px) {
  .pagination {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .pagination-info {
    text-align: center;
  }

  .pagination-controls {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>

