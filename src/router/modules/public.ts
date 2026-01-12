/**
 * 前台公开页面路由配置
 */

import type { RouteRecordRaw } from 'vue-router'

const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '/hotspot',
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
  }
]

export default publicRoutes

