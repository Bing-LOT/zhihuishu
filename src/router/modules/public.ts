/**
 * 前台公开页面路由配置
 */

import type { RouteRecordRaw } from 'vue-router'

const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      title: '首页',
      requiresAuth: false
    }
  },
  {
    path: '/hotspot',
    name: 'Hotspot',
    component: () => import('@/views/Hotspot/index.vue'),
    meta: {
      title: '思政热点',
      requiresAuth: false
    }
  },
  {
    path: '/hotspot/detail/:id',
    name: 'HotspotDetail',
    component: () => import('@/views/Hotspot/Detail.vue'),
    meta: {
      title: '热点详情',
      requiresAuth: false
    }
  },
  {
    path: '/topic/detail/:id',
    name: 'TopicDetail',
    component: () => import('@/views/Hotspot/TopicDetail.vue'),
    meta: {
      title: '专题详情',
      requiresAuth: false
    }
  },
  {
    path: '/teaching',
    name: 'Teaching',
    component: () => import('@/views/Teaching/index.vue'),
    meta: {
      title: '教学有道',
      requiresAuth: false
    }
  },
  {
    path: '/teaching/detail/:id',
    name: 'TeachingDetail',
    component: () => import('@/views/Teaching/Detail.vue'),
    meta: {
      title: '教学案例详情',
      requiresAuth: false
    }
  },
  {
    path: '/classroom',
    name: 'Classroom',
    component: () => import('@/views/Classroom/index.vue'),
    meta: {
      title: '精彩课堂',
      requiresAuth: false
    }
  },
  {
    path: '/classroom/detail/:id',
    name: 'ClassroomDetail',
    component: () => import('@/views/Classroom/Detail.vue'),
    meta: {
      title: '课程详情',
      requiresAuth: false
    }
  },
  {
    path: '/special',
    name: 'SpecialTopic',
    component: () => import('@/views/SpecialTopic/index.vue'),
    meta: {
      title: '特色专题',
      requiresAuth: false
    }
  }
]

export default publicRoutes

