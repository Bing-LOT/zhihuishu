/**
 * 门户路由配置
 */

import type { RouteRecordRaw } from 'vue-router'

const portalRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/PortalLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/portal/Home/index.vue'),
        meta: {
          title: '首页',
          requiresAuth: false,
          roles: []
        }
      },
      {
        path: 'overview',
        name: 'Overview',
        component: () => import('@/views/portal/Overview/index.vue'),
        meta: {
          title: '概览',
          requiresAuth: true,
          roles: ['student', 'teacher', 'admin']
        }
      },
      {
        path: 'care',
        name: 'Care',
        component: () => import('@/views/portal/Care/index.vue'),
        meta: {
          title: '大关怀',
          requiresAuth: true,
          roles: ['student', 'teacher', 'admin']
        }
      },
      {
        path: 'resources',
        name: 'Resources',
        component: () => import('@/views/portal/Resources/index.vue'),
        meta: {
          title: '大资源',
          requiresAuth: true,
          roles: ['student', 'teacher', 'admin']
        }
      },
      {
        path: 'topics',
        name: 'Topics',
        component: () => import('@/views/portal/Topics/index.vue'),
        meta: {
          title: '大主题',
          requiresAuth: true,
          roles: ['student', 'teacher', 'admin']
        }
      },
      {
        path: 'study',
        name: 'Study',
        redirect: '/study/courses',
        meta: {
          title: '学习中心',
          requiresAuth: true,
          roles: ['student', 'teacher', 'admin']
        },
        children: [
          {
            path: 'courses',
            name: 'StudyCourses',
            component: () => import('@/views/portal/Study/index.vue'),
            meta: {
              title: '我的课程',
              requiresAuth: true,
              roles: ['student', 'teacher', 'admin']
            }
          },
          {
            path: 'video/:id',
            name: 'VideoDetail',
            component: () => import('@/views/portal/Study/VideoDetail.vue'),
            meta: {
              title: '视频学习',
              requiresAuth: true,
              roles: ['student', 'teacher', 'admin']
            }
          }
        ]
      },
      {
        path: 'exam',
        name: 'Exam',
        redirect: '/exam/list',
        meta: {
          title: '考试中心',
          requiresAuth: true,
          roles: ['student', 'teacher', 'admin']
        },
        children: [
          {
            path: 'list',
            name: 'ExamList',
            component: () => import('@/views/portal/Exam/index.vue'),
            meta: {
              title: '考试列表',
              requiresAuth: true,
              roles: ['student', 'teacher', 'admin']
            }
          },
          {
            path: ':id',
            name: 'ExamDetail',
            component: () => import('@/views/portal/Exam/ExamDetail.vue'),
            meta: {
              title: '在线考试',
              requiresAuth: true,
              roles: ['student', 'teacher', 'admin']
            }
          }
        ]
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/portal/Profile/index.vue'),
        meta: {
          title: '个人中心',
          requiresAuth: true,
          roles: ['student', 'teacher', 'admin']
        }
      }
    ]
  }
]

export default portalRoutes
