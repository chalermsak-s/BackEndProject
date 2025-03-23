import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nprogress'
import { useAuthStore } from '@/stores/auth'
import LoginView from '@/views/page/LoginView.vue'
import AboutView from '@/views/page/AboutView.vue'
import RegisterView from '@/views/page/RegisterView.vue'

import NotFoundView from '@/views/other/NotFoundView.vue'
import NetworkErrorView from '@/views/other/NetworkErrorView.vue'

import { useStudentStore } from '@/stores/student'

import adminDashboardView from '@/views/admin/adminDashboardView.vue'

import AdvisorListView from '@/views/advisor/AdvisorListView.vue'
import advisorDashboardView from '@/views/advisor/advisorDashboardView.vue'


import studentService from '@/services/StudentService'
import StudentListView from '@/views/student/StudentListView.vue'
import StudentDetailView from '@/views/student/StudentDetailView.vue'
import StudentDashboardView from '@/views/student/StudentDashboardView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login-view',
      component: LoginView,
      props: (route) => ({
        page: parseInt(route.query.page as string) || 1,
      }),
    },
    {
      path: '/about',
      name: 'about-view',
      component: AboutView,
      props: (route) => ({
        page: parseInt(route.query.page as string) || 1,
      }),
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView,
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
    {
      path: '/register',
      name: 'register-view',
      component: RegisterView,
      props: (route) => ({
        page: parseInt(route.query.page as string) || 1,
      }),
    },
    {
      path: '/student',
      name: 'student-list-view',
      component: StudentListView,
      props: (route) => ({
        page: parseInt(route.query.page as string) || 1,
      }),
    },
    {
      path: '/student/detail/:id',
      name: 'student-detail-view',
      component: StudentDetailView,
      props: true,
      beforeEnter: async (to) => {
        const id = Number(to.params.id) // ป้องกัน NaN
        if (isNaN(id)) {
          return { name: '404-resource-view', params: { resource: 'student' } }
        }

        const studentStore = useStudentStore()

        try {
          const response = await studentService.getStudent(id)
          studentStore.setStore(response.data)
          return true // อนุญาตให้ไปต่อ
        } catch (error: any) {
          if (error.response?.status === 404) {
            return {
              name: '404-resource-view',
              params: { resource: 'student' },
            }
          } else {
            return { name: 'network-error-view' }
          }
        }
      },
    },
    {
      path: '/advisor',
      name: 'advisor-list-view',
      component: AdvisorListView,
      props: true,
    },
    /* Admin Start */
    {
      path: '/admin',
      name: 'admin-dashboard-view',
      component: adminDashboardView,
      props: true,
      beforeEnter: () => {
        const authStore = useAuthStore()
        if (!authStore.isAdmin) {
          return {
            name: '404-resource-view',
            params: { resource: 'you-are-not-allowed-to-access' },
          }
        }
      },
    },
    /* Admin End */
    
    /* Advisor Start */
    {
      path: '/advisor-dashboard',
      name: 'advisor-dashboard-view',
      component: advisorDashboardView,
      props: true,
      beforeEnter: () => {
        const authStore = useAuthStore()
        if (!authStore.isAdvisor) {
          return {
            name: '404-resource-view',
            params: { resource: 'you-are-not-allowed-to-access' },
          }
        }
      },
    },
    /* Advisor End */
     
    /* Student Start */
    {
      path: '/student-dashboard',
      name: 'student-dashboard-view',
      component: StudentDashboardView,
      props: true,
      beforeEnter: () => {
        const authStore = useAuthStore()
        if (!authStore.isStudent) {
          return {
            name: '404-resource-view',
            params: { resource: 'you-are-not-allowed-to-access' },
          }
        }
      },
    },
    /* Student End */
  ],

  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
