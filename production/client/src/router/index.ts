import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nprogress'
import { useAuthStore } from '@/stores/auth'
import LoginView from '@/views/page/LoginView.vue'
import AboutView from '@/views/page/AboutView.vue'
import RegisterView from '@/views/page/RegisterView.vue'

import NotFoundView from '@/views/other/NotFoundView.vue'
import NetworkErrorView from '@/views/other/NetworkErrorView.vue'

import { useStudentStore } from '@/stores/student'
import { useAdvisorStore } from '@/stores/advisor'
import { useAppointmentStore } from '@/stores/appointment'
import { useAnnouncementStore } from '@/stores/announcement'

import adminDashboardView from '@/views/admin/adminDashboardView.vue'
import adminStudentDetailView from '@/views/admin/adminStudentDetailView.vue'
import adminAdvisorDetailView from '@/views/admin/adminAdvisorDetailView.vue'
import adminAddAdvisorView from '@/views/admin/adminAddAdvisorView.vue'
import adminAppointmentDetailView from '@/views/admin/adminAppointmentDetailView.vue'
import adminAnnouncementsDetailView from '@/views/admin/adminAnnouncementsDetailView.vue'

import AdvisorListView from '@/views/advisor/AdvisorListView.vue'
import advisorDashboardView from '@/views/advisor/advisorDashboardView.vue'

import studentService from '@/services/StudentService'
import StudentListView from '@/views/student/StudentListView.vue'
import StudentDetailView from '@/views/student/StudentDetailView.vue'
import StudentDashboardView from '@/views/student/StudentDashboardView.vue'
import AdvisorService from '@/services/AdvisorService'
import AppointmentService from '@/services/AppointmentService'
import AnnouncementService from '@/services/AnnouncementService'

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
    {
      path: '/admin/detail/student/:id',
      name: 'admin-student-detail-view',
      component: adminStudentDetailView,
      props: true,
      beforeEnter: async (to: any) => {
        const authStore = useAuthStore()
        if (!authStore.isAdmin) {
          return {
            name: '404-resource-view',
            params: { resource: 'you-are-not-allowed-to-access' },
          }
        } else {
          const id = Number(to.params.id) // ป้องกัน NaN
          if (isNaN(id)) {
            return {
              name: '404-resource-view',
              params: { resource: 'student' },
            }
          }

          const studentStore = useStudentStore()

          try {
            const response = await studentService.getStudent(id)
            studentStore.setStore(response.data)
            return true // อนุญาตให้ไปต่อ
          } catch (error: any) {
            console.error('Fetch Student Error:', error) // เพิ่ม log สำหรับ debug
            const status = error.response?.status
            return status === 404
              ? { name: '404-resource-view', params: { resource: 'student' } }
              : { name: 'network-error-view' }
          }
        }
      },
    },
    {
      path: '/admin/detail/advisor/:id',
      name: 'admin-advisor-detail-view',
      component: adminAdvisorDetailView,
      props: true,
      beforeEnter: async (to: any) => {
        const authStore = useAuthStore()
        if (!authStore.isAdmin) {
          return {
            name: '404-resource-view',
            params: { resource: 'you-are-not-allowed-to-access' },
          }
        } else {
          const id = Number(to.params.id) // ป้องกัน NaN
          if (isNaN(id)) {
            return {
              name: '404-resource-view',
              params: { resource: 'advisor' },
            }
          }
          const advisorStore = useAdvisorStore()
          try {
            const response = await AdvisorService.getAdvisor(id)
            advisorStore.setStore(response.data)
            return true // อนุญาตให้ไปต่อ
          } catch (error: any) {
            console.error('Fetch Student Error:', error) // เพิ่ม log สำหรับ debug
            const status = error.response?.status
            return status === 404
              ? { name: '404-resource-view', params: { resource: 'advisor' } }
              : { name: 'network-error-view' }
          }
        }
      },
    },
    {
      path: '/admin/add/advisor',
      name: 'admin-add-advisor',
      component: adminAddAdvisorView,
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
    {
      path: '/admin/detail/appointment/:id',
      name: 'admin-appointment-detail-view',
      component: adminAppointmentDetailView,
      props: true,
      beforeEnter: async (to: any) => {
        const authStore = useAuthStore()
        if (!authStore.isAdmin) {
          return {
            name: '404-resource-view',
            params: { resource: 'you-are-not-allowed-to-access' },
          }
        } else {
          const id = Number(to.params.id) // ป้องกัน NaN
          if (isNaN(id)) {
            return {
              name: '404-resource-view',
              params: { resource: 'appointment' },
            }
          }
          const appointmentStore = useAppointmentStore()
          try {
            const response = await AppointmentService.getAppointment(id)
            appointmentStore.setStore(response.data)
            return true // อนุญาตให้ไปต่อ
          } catch (error: any) {
            console.error('Fetch Appointment Error:', error) // เพิ่ม log สำหรับ debug
            const status = error.response?.status
            return status === 404
              ? { name: '404-resource-view', params: { resource: 'appointment' } }
              : { name: 'network-error-view' }
          }
        }
      },
    },
    {
      path: '/admin/detail/announcement/:id',
      name: 'admin-announcement-detail-view',
      component: adminAnnouncementsDetailView,
      props: true,
      beforeEnter: async (to: any) => {
        const authStore = useAuthStore()
        if (!authStore.isAdmin) {
          return {
            name: '404-resource-view',
            params: { resource: 'you-are-not-allowed-to-access' },
          }
        } else {
          const id = Number(to.params.id) // ป้องกัน NaN
          if (isNaN(id)) {
            return {
              name: '404-resource-view',
              params: { resource: 'appointment' },
            }
          }
          const announcementStore = useAnnouncementStore()
          try {
            const response = await AnnouncementService.getAnnouncement(id)
            announcementStore.setStore(response.data)
            return true // อนุญาตให้ไปต่อ
          } catch (error: any) {
            console.error('Fetch Announcement Error:', error) // เพิ่ม log สำหรับ debug
            const status = error.response?.status
            return status === 404
              ? { name: '404-resource-view', params: { resource: 'announcement' } }
              : { name: 'network-error-view' }
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
