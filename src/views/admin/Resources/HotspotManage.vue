<template>
  <div class="hotspot-manage">
    <!-- 页面标题 -->
    <div class="hotspot-manage__header">
      <h2 class="hotspot-manage__title">思政热点</h2>
      <p class="hotspot-manage__desc">管理思政热点内容</p>
    </div>

    <!-- 搜索和操作栏 -->
    <div class="hotspot-manage__toolbar">
      <el-input
        v-model="searchKeyword"
        placeholder="标题搜索"
        style="width: 240px"
        clearable
        @clear="handleSearch"
        @keyup.enter="handleSearch"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>

    <!-- 数据表格 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      style="width: 100%"
      class="hotspot-table"
    >
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
      <el-table-column prop="createTime" label="发布时间" width="180" align="center" />
      <el-table-column prop="source" label="来源" width="120" align="center" />
      <el-table-column prop="statPv" label="浏览人数" width="100" align="center">
        <template #default="{ row }">
          {{ formatNumber(row.statPv) }}
        </template>
      </el-table-column>
      <el-table-column prop="showFront" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="row.showFront === 1 ? 'success' : 'danger'" size="small">
            {{ row.showFront === 1 ? '显示' : '隐藏' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center" fixed="right">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            link
            @click="handleEdit(row)"
          >
            编辑
          </el-button>
          <el-button
            :type="row.showFront === 1 ? 'warning' : 'success'"
            size="small"
            link
            @click="handleToggleShow(row)"
          >
            {{ row.showFront === 1 ? '隐藏' : '显示' }}
          </el-button>
          <el-button
            type="danger"
            size="small"
            link
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="pagination.current"
      v-model:page-size="pagination.pageSize"
      :total="pagination.total"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      class="hotspot-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 新增/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="900px"
      :close-on-click-modal="false"
      @close="handleDialogClose"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="formData.title"
            placeholder="请输入标题"
            maxlength="100"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="来源" prop="source">
          <el-input
            v-model="formData.source"
            placeholder="请输入来源"
            maxlength="50"
          />
        </el-form-item>

        <el-form-item label="热点内容" prop="content">
          <div class="editor-container">
            <Toolbar
              :editor="editorRef"
              :default-config="toolbarConfig"
              :mode="mode"
              class="editor-toolbar"
            />
            <Editor
              v-model="formData.content"
              :default-config="editorConfig"
              :mode="mode"
              class="editor-content"
              @onCreated="handleCreated"
            />
          </div>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" :loading="saveLoading" @click="handleSave">
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, shallowRef, onBeforeUnmount } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import {
  getHotspotList,
  addHotspot,
  editHotspot,
  removeHotspot,
  toggleHotspotShowFront,
  type HotspotItem,
  type HotspotAddItem,
  type HotspotEditItem
} from '@/api/hotspot'

// 表格数据
const tableData = ref<HotspotItem[]>([])
const loading = ref(false)
const saveLoading = ref(false)

// 搜索关键词
const searchKeyword = ref('')

// 分页
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 对话框
const dialogVisible = ref(false)
const dialogTitle = ref('新增')
const formRef = ref<FormInstance>()

// 富文本编辑器
const editorRef = shallowRef<IDomEditor>()
const mode = 'default' // 或 'simple'

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
  toolbarKeys: [
    'headerSelect',
    'bold',
    'italic',
    'underline',
    'color',
    'bgColor',
    '|',
    'fontSize',
    'fontFamily',
    'lineHeight',
    '|',
    'bulletedList',
    'numberedList',
    'todo',
    '|',
    'emotion',
    'insertLink',
    'insertImage',
    'insertVideo',
    'insertTable',
    'codeBlock',
    '|',
    'undo',
    'redo',
    '|',
    'fullScreen'
  ]
}

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      // 自定义上传图片
      async customUpload(file: File, insertFn: any) {
        // TODO: 这里需要实现图片上传逻辑
        // 暂时使用 base64
        const reader = new FileReader()
        reader.onload = (e) => {
          const url = e.target?.result as string
          insertFn(url, '', '')
        }
        reader.readAsDataURL(file)
      }
    }
  }
}

// 编辑器创建回调
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor
}

// 组件销毁前，销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor) {
    editor.destroy()
  }
})

// 表单数据
const formData = reactive<HotspotAddItem & { id?: number }>({
  title: '',
  source: '',
  content: '',
  showFront: 1
})

// 表单验证规则
const formRules: FormRules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入内容', trigger: 'change' }
  ]
}

// 格式化数字
const formatNumber = (num: number) => {
  if (!num) return '0'
  return num.toLocaleString()
}

// 加载列表
const loadList = async () => {
  try {
    loading.value = true
    const result = await getHotspotList({
      pageIndex: pagination.current,
      pageSize: pagination.pageSize,
      keyword: searchKeyword.value || undefined
    })
    tableData.value = result.records
    pagination.total = result.total
  } catch (error: any) {
    console.error('加载列表失败:', error)
    ElMessage.error(error.response?.data?.msg || error.message || '加载失败')
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadList()
}

// 分页大小变化
const handleSizeChange = (val: number) => {
  pagination.pageSize = val
  pagination.current = 1
  loadList()
}

// 分页页码变化
const handleCurrentChange = (val: number) => {
  pagination.current = val
  loadList()
}

// 新增
const handleAdd = () => {
  dialogTitle.value = '新增'
  dialogVisible.value = true
}

// 编辑
const handleEdit = (row: HotspotItem) => {
  dialogTitle.value = '编辑'
  formData.id = row.id
  formData.title = row.title
  formData.source = (row.source || '') as string
  formData.content = row.content
  formData.showFront = row.showFront
  dialogVisible.value = true
}

// 切换显示状态
const handleToggleShow = async (row: HotspotItem) => {
  try {
    const newShowFront = row.showFront === 1 ? 0 : 1
    await toggleHotspotShowFront({
      id: row.id,
      showFront: newShowFront
    })
    ElMessage.success('操作成功')
    loadList()
  } catch (error: any) {
    console.error('操作失败:', error)
    ElMessage.error(error.response?.data?.msg || error.message || '操作失败')
  }
}

// 删除
const handleDelete = async (row: HotspotItem) => {
  try {
    await ElMessageBox.confirm(
      '确定要删除这条记录吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    await removeHotspot(row.id)
    ElMessage.success('删除成功')
    loadList()
  } catch (error: any) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
      ElMessage.error(error.response?.data?.msg || error.message || '删除失败')
    }
  }
}

// 保存
const handleSave = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    saveLoading.value = true

    if (formData.id) {
      // 编辑
      const editData: HotspotEditItem = {
        id: formData.id,
        title: formData.title,
        source: formData.source,
        content: formData.content,
        showFront: formData.showFront
      }
      await editHotspot(editData)
      ElMessage.success('更新成功')
    } else {
      // 新增
      const addData: HotspotAddItem = {
        title: formData.title,
        source: formData.source,
        content: formData.content,
        showFront: formData.showFront
      }
      await addHotspot(addData)
      ElMessage.success('添加成功')
    }

    dialogVisible.value = false
    loadList()
  } catch (error: any) {
    if (error !== false) {
      console.error('保存失败:', error)
      ElMessage.error(error.response?.data?.msg || error.message || '保存失败')
    }
  } finally {
    saveLoading.value = false
  }
}

// 对话框关闭
const handleDialogClose = () => {
  formRef.value?.resetFields()
  formData.id = undefined
  formData.title = ''
  formData.source = ''
  formData.content = ''
  formData.showFront = 1
  
  // 清空编辑器内容
  if (editorRef.value) {
    editorRef.value.clear()
  }
}

// 页面加载
onMounted(() => {
  loadList()
})
</script>

<style scoped>
.hotspot-manage {
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;
}

.hotspot-manage__header {
  margin-bottom: 24px;
  padding: 24px;
  background: white;
  border-radius: 8px;
}

.hotspot-manage__title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.hotspot-manage__desc {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.hotspot-manage__toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 16px 24px;
  background: white;
  border-radius: 8px;
}

.hotspot-table {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.hotspot-pagination {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px;
  background: white;
  border-radius: 8px;
}

:deep(.el-table) {
  font-size: 14px;
}

:deep(.el-table th.el-table__cell) {
  background-color: #fef2f2;
  color: #333;
  font-weight: 600;
}

:deep(.el-pagination) {
  font-weight: normal;
}

/* 富文本编辑器样式 */
.editor-container {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
}

.editor-toolbar {
  border-bottom: 1px solid #d9d9d9;
}

.editor-content {
  height: 400px;
  overflow-y: auto;
}

:deep(.w-e-text-container) {
  background-color: #fff;
}

:deep(.w-e-text-placeholder) {
  color: #c0c4cc;
  font-style: normal;
}
</style>

