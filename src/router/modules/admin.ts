/**
 * 管理后台路由配置
 */

import type { RouteRecordRaw } from 'vue-router'

const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/resources',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: {
      title: '管理后台',
      requiresAuth: true,
      roles: ['admin', 'teacher']
    },
    children: [
      {
        path: 'resources',
        name: 'AdminResources',
        component: () => import('@/views/admin/Resources/index.vue'),
        meta: {
          title: '资源管理',
          requiresAuth: true,
          roles: ['admin', 'teacher'],
          icon: 'folder'
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

