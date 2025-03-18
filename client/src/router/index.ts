import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nprogress'
import LoginView from '@/views/page/LoginView.vue'
import AboutView from '@/views/page/AboutView.vue'

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
