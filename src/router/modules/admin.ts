/**
 * 管理后台路由配置
 */

import type { RouteRecordRaw } from 'vue-router'

const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/resources/home',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: {
      title: '管理后台',
      requiresAuth: false,
      roles: []
    },
    children: [
      {
        path: 'resources/home',
        name: 'AdminResourcesHome',
        component: () => import('@/views/admin/Resources/index.vue'),
        meta: {
          title: '首页Banner配置',
          requiresAuth: false,
          roles: []
        }
      },
      {
        path: 'resources/party-course',
        name: 'AdminResourcesPartyCourse',
        component: () => import('@/views/admin/Resources/PartyCourse.vue'),
        meta: {
          title: '党建+课程思政'
        }
      },
      {
        path: 'resources/model-display',
        name: 'AdminResourcesModelDisplay',
        component: () => import('@/views/admin/Resources/ModelDisplay.vue'),
        meta: {
          title: '示范展播'
        }
      },
      {
        path: 'resources/great-practice',
        name: 'AdminResourcesGreatPractice',
        component: () => import('@/views/admin/Resources/index.vue'),
        meta: {
          title: '伟大实践'
        }
      },
      {
        path: 'resources/list',
        name: 'AdminResourcesList',
        component: () => import('@/views/admin/Resources/index.vue'),
        meta: {
          title: '思政资源'
        }
      },
      {
        path: 'resources/excellent-class',
        name: 'AdminResourcesExcellentClass',
        component: () => import('@/views/admin/Resources/index.vue'),
        meta: {
          title: '优秀思政课堂'
        }
      },
      {
        path: 'resources/college-special',
        name: 'AdminResourcesCollegeSpecial',
        component: () => import('@/views/admin/Resources/index.vue'),
        meta: {
          title: '一院一品'
        }
      },
      {
        path: 'resources/culture-map',
        name: 'AdminResourcesCultureMap',
        component: () => import('@/views/admin/Resources/index.vue'),
        meta: {
          title: '红色文化资源地图'
        }
      },
      {
        path: 'questions',
        name: 'AdminQuestions',
        component: () => import('@/views/admin/Questions/index.vue'),
        meta: {
          title: '题库管理',
          requiresAuth: true,
          roles: ['admin', 'teacher'],
          icon: 'question'
        }
      },
      {
        path: 'analysis',
        name: 'AdminAnalysis',
        component: () => import('@/views/admin/Analysis/index.vue'),
        meta: {
          title: '数据分析',
          requiresAuth: true,
          roles: ['admin'],
          icon: 'chart'
        }
      },
      {
        path: 'ai',
        name: 'AdminAI',
        component: () => import('@/views/admin/AI/index.vue'),
        meta: {
          title: 'AI 助手',
          requiresAuth: true,
          roles: ['admin', 'teacher'],
          icon: 'robot'
        }
      },
      {
        path: 'system',
        name: 'AdminSystem',
        component: () => import('@/views/admin/System/index.vue'),
        meta: {
          title: '系统配置',
          requiresAuth: true,
          roles: ['admin'],
          icon: 'setting'
        }
      }
    ]
  }
]

export default adminRoutes

