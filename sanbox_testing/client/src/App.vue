<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCirclePlay,
  faComments,
  faHouse,
  faRightToBracket,
  faUserPlus,
  faFile,
  faUsersBetweenLines,
  faUserTie,
  faCode,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import { ref, onMounted, onUnmounted } from 'vue'

import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const router = useRouter()

function logout() {
  authStore.logout()
  router.push({ name: 'login-view' })
}
const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
if (token && user) {
  authStore.reload(token, JSON.parse(user))
} else {
  authStore.logout()
}

const details = ref<HTMLElement | null>(null)

const closeDetails = (event: any) => {
  if (details.value && !details.value.contains(event.target)) {
    details.value.removeAttribute('open')
  }
}



onMounted(() => {
  document.addEventListener('click', closeDetails)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDetails)
})

// เพิ่มเฉพาะไอคอนที่ใช้ในหน้านี้
library.add(
  faCirclePlay,
  faComments,
  faHouse,
  faRightToBracket,
  faUserPlus,
  faFile,
  faUsersBetweenLines,
  faUserTie,
  faCode,
  faGithub,
  faRightFromBracket
)
</script>

<template>
  <header>
    <div class="navbar bg-base-100 shadow-sm">
      <div class="navbar-start">
        <div class="dropdown">
          <!-- ปุ่มเปิดเมนู -->
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>

          <!-- เมนู Dropdown -->
          <ul tabindex="0" class="menu menu-lg dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
            <li>
              <RouterLink :to="{ name: 'login-view' }">
                <font-awesome-icon :icon="['fas', 'house']" /> หน้าหลัก
              </RouterLink>
            </li>
            <li>
              <a> <font-awesome-icon :icon="['fas', 'file']" /> รายชื่อ </a>
              <ul class="p-2">
                <li>
                  <RouterLink :to="{ name: 'advisor-list-view' }">
                    <font-awesome-icon :icon="['fas', 'user-tie']" /> อาจารย์
                  </RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'student-list-view' }">
                    <font-awesome-icon :icon="['fas', 'users-between-lines']" />
                    นักศึกษา
                  </RouterLink>
                </li>
              </ul>
            </li>
            <li>
              <RouterLink :to="{ name: 'about-view' }">
                <font-awesome-icon :icon="['fas', 'code']" />
                เกี่ยวกับ
              </RouterLink>
            </li>
          </ul>
        </div>

        <RouterLink :to="{ name: 'login-view' }" class="btn btn-ghost text-xl">
          <font-awesome-icon :icon="['fas', 'comments']" />
          ApptCAMT
        </RouterLink>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 z-50">
          <li>
            <RouterLink :to="{ name: 'login-view' }">
              <font-awesome-icon :icon="['fas', 'house']" /> หน้าหลัก
            </RouterLink>
          </li>
          <li>
            <details ref="details">
              <summary>
                <font-awesome-icon :icon="['fas', 'file']" /> รายชื่อ
              </summary>
              <ul class="p-2">
                <li>
                  <RouterLink :to="{ name: 'advisor-list-view' }">
                    <font-awesome-icon :icon="['fas', 'user-tie']" />อาจารย์
                  </RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'student-list-view' }">
                    <font-awesome-icon :icon="['fas', 'users-between-lines']" />
                    นักศึกษา
                  </RouterLink>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <RouterLink :to="{ name: 'about-view' }">
              <font-awesome-icon :icon="['fas', 'code']" />
              เกี่ยวกับ
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <RouterLink v-if="!authStore.token" :to="{ name: 'register-view' }" class="btn btn-primary mr-0.5">
          <font-awesome-icon :icon="['fas', 'user-plus']" />
          <span class="hidden sm:block">ลงทะเบียน</span>
        </RouterLink>
        <RouterLink v-if="!authStore.token" :to="{ name: 'login-view' }" class="btn btn-neutral ml-0.5">
          <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
          <span class="hidden sm:block">เข้าสู่ระบบ</span>
        </RouterLink>

        <button v-if="authStore.token" @click="logout" class="btn btn-dark ml-0.5">
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
          <span class="hidden sm:block">ออกจากระบบ</span>
        </button>
      </div>
    </div>
  </header>

  <main class="flex-grow">
    <RouterView />
  </main>
  <footer class="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
    <aside class="grid-flow-col items-center">
      <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"
        clip-rule="evenodd" class="fill-current">
        <path
          d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z">
        </path>
      </svg>
      <p>
        ApptCAMT Copyright © {{ new Date().getFullYear() }} - All right reserved
      </p>
    </aside>
    <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      <a href="https://github.com/chalermsak-s/BackEndProject" target="_blank">
        <font-awesome-icon class="fill-current fa-2x" :icon="['fab', 'github']" />
      </a>
    </nav>
  </footer>
</template>
<style>
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* ให้เต็มหน้าจอ */
}

main {
  flex-grow: 1;
  /* ขยายให้เต็ม */
}

@media screen and (max-width: 640px) {
  .menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    width: 100%;
  }
}
</style>
