import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import LoginView from '@/views/page/LoginView.vue'
import AboutView from '@/views/page/AboutView.vue'
import AdvisorView from '@/views/page/AdvisorView.vue'
import AdminView from '@/views/page/AdminView.vue'
import StudentView from '@/views/page/StudentView.vue'
import DegreeView from '@/views/page/DegreeView.vue'
import AppointmentView from '@/views/page/AppointmentView.vue'
import AppointmentStatusView from '@/views/page/AppointmentStatusView.vue'
import AnnouncementView from '@/views/page/AnnouncementView.vue'
import DepartmentView from '@/views/page/DepartmentView.vue'
import FeedbackView from '@/views/page/FeedbackView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        name: "login-view",
        component: LoginView,
        props: (route) => ({
          page: parseInt(route.query.page as string) || 1,
        }),
      },
      {
        path: "/about",
        name: "about-view",
        component: AboutView,
        props: (route) => ({
          page: parseInt(route.query.page as string) || 1,
        }),
      },
      {
        path: "/advisor",
        name: "advisor-view",
        component: AdvisorView,
        props: (route) => ({
          page: parseInt(route.query.page as string) || 1,
        }),
      },
      {
        path: "/admin",
        name: "admin-view",
        component: AdminView,
        props: (route) => ({
          page: parseInt(route.query.page as string) || 1,
        }),
      },
      {
        path: "/student",
        name: "student-view",
        component: StudentView,
        props: (route) => ({
          page: parseInt(route.query.page as string) || 1,
        }),
      },
      {
        path: "/degree",
        name: "degree-view",
        component: DegreeView,
        props: (route) => ({
          page: parseInt(route.query.page as string) || 1,
        }),
      },
      {
        path: '/appointment',
        name: 'appointment-view',
        component: AppointmentView
      },
      {
        path: '/appointment-status',
        name: 'appointment-status-view',
        component: AppointmentStatusView,
        props: (route) => ({
          page: parseInt(route.query.page as string) || 1,
        }),
      },
      {
        path: '/announcement',
        name: 'announcement-view',
        component: AnnouncementView
      },
      {
        path: '/department',
        name: 'department-view',
        component: DepartmentView,
        props: (route) => ({
          page: parseInt(route.query.page as string) || 1,
        }),
      },
      {
        path: '/feedback',
        name: 'feedback-view',
        component: FeedbackView
      }
    ],
    scrollBehavior(_to, _from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { top: 0 };
      }
    },
  });

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
