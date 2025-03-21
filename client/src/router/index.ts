import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nprogress'
import LoginView from '@/views/page/LoginView.vue'
import AboutView from '@/views/page/AboutView.vue'
import AdvisorView from '@/views/page/AdvisorView.vue'
import AdminView from '@/views/page/AdminView.vue'
import StudentView from '@/views/page/StudentView.vue'

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
