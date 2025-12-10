<template>
  <div class="course-card" @click="handleClick">
    <!-- 顶部图片区域 -->
    <div class="course-card__image">
      <img :src="course.cover" :alt="course.title" />
      <div class="course-card__department">
        {{ course.teacherList[0]?.department || '电气工程与自动学院' }}
      </div>
    </div>

    <!-- 底部信息区域 -->
    <div class="course-card__content">
      <h3 class="course-card__title">{{ course.title }}</h3>
      <div class="course-card__meta">
        <span class="course-card__teacher">
          教师：{{ course.teacherList[0]?.name || '刘丽军' }}
        </span>
        <div class="course-card__views">
          <svg class="course-card__eye-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 5C5.83333 5 2.27583 7.34167 1 10.8333C2.27583 14.3217 5.83333 16.6667 10 16.6667C14.1667 16.6667 17.7242 14.325 19 10.8333C17.7242 7.34167 14.1667 5 10 5ZM10 14.1667C7.7 14.1667 5.83333 12.3 5.83333 10C5.83333 7.7 7.7 5.83333 10 5.83333C12.3 5.83333 14.1667 7.7 14.1667 10C14.1667 12.3 12.3 14.1667 10 14.1667ZM10 7.5C8.61917 7.5 7.5 8.61917 7.5 10C7.5 11.3808 8.61917 12.5 10 12.5C11.3808 12.5 12.5 11.3808 12.5 10C12.5 8.61917 11.3808 7.5 10 7.5Z" fill="#333333" fill-opacity="0.5"/>
          </svg>
          <span>{{ formatCount(course.studentCount) }}人</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CourseCardProps, CourseCardEmits } from './types'

/**
 * 课程卡片组件
 */
const props = defineProps<CourseCardProps>()
const emit = defineEmits<CourseCardEmits>()

/**
 * 格式化人数显示
 */
const formatCount = (count: number): string => {
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + '万'
  }
  return count.toString()
}

/**
 * 点击卡片
 */
const handleClick = () => {
  emit('click', props.course)
}
</script>

<style scoped>
.course-card {
  width: 364px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* 顶部图片区域 */
.course-card__image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}

.course-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.course-card__department {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  font-size: 14px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 400;
  line-height: normal;
}

/* 底部信息区域 */
.course-card__content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #ffffff;
  border-radius: 0 0 8px 8px;
}

.course-card__title {
  margin: 0;
  font-size: 18px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 500;
  color: #333333;
  line-height: normal;
  min-height: 48px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.course-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.course-card__teacher {
  font-size: 14px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 400;
  color: #333333;
  opacity: 0.5;
  line-height: normal;
}

.course-card__views {
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.5;
}

.course-card__eye-icon {
  width: 20px;
  height: 20px;
}

.course-card__views span {
  font-size: 14px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 400;
  color: #333333;
  line-height: normal;
}
</style>

