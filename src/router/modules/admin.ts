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
        path: 'resources/practice-achievement',
        name: 'AdminResourcesPracticeAchievement',
        component: () => import('@/views/admin/Resources/PracticeAchievement.vue'),
        meta: {
          title: '习思想融入成果'
        }
      },
      {
        path: 'resources/practice-video',
        name: 'AdminResourcesPracticeVideo',
        component: () => import('@/views/admin/Resources/PracticeVideo.vue'),
        meta: {
          title: '习思想优秀视频展播'
        }
      },
      {
        path: 'resources/practice-case',
        name: 'AdminResourcesPracticeCase',
        component: () => import('@/views/admin/Resources/PracticeCase.vue'),
        meta: {
          title: '习思想融入学科教学实践示范案例展播'
        }
      },
      {
        path: 'resources/practice-footprint',
        name: 'AdminResourcesPracticeFootprint',
        component: () => import('@/views/admin/Resources/PracticeFootprint.vue'),
        meta: {
          title: '总书记的福建足迹'
        }
      },
      {
        path: 'resources/list',
        name: 'AdminResourcesList',
        component: () => import('@/views/admin/Resources/ResourceList.vue'),
        meta: {
          title: '思政资源'
        }
      },
      {
        path: 'resources/excellent-class',
        name: 'AdminResourcesExcellentClass',
        component: () => import('@/views/admin/Resources/ExcellentClass.vue'),
        meta: {
          title: '优秀思政课堂'
        }
      },
      {
        path: 'resources/college-special',
        name: 'AdminResourcesCollegeSpecial',
        component: () => import('@/views/admin/Resources/CollegeSpecial.vue'),
        meta: {
          title: '一院一品'
        }
      },
      {
        path: 'resources/culture-map',
        name: 'AdminResourcesCultureMap',
        component: () => import('@/views/admin/Resources/CultureMap.vue'),
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
          requiresAuth: false,
          roles: [],
          icon: 'setting'
        }
      }
    ]
  }
]

export default adminRoutes

