<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCirclePlay,
  faRightToBracket,
  faEnvelope,
  faKey,
  faComment,
  faUser,
} from '@fortawesome/free-solid-svg-icons'

import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'

import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

// Define validation schema
const loginSchema = zod.object({
  username: zod.string().min(5, { message: 'กรุณากรอกชื่อผู้ใช้ 5 ตัว ขึ้นไป' }),
  password: zod.string().min(6, { message: 'กรุณากรอกรหัสผ่าน 5 ตัว ขึ้นไป' }),
})

// Add only the icons used in this page
library.add(
  faCirclePlay,
  faRightToBracket,
  faEnvelope,
  faKey,
  faComment,
  faUser
)

// const authStore = useAuthStore()
// const messageStore = useMessageStore()
// const router = useRouter()

// Initialize form with validation schema
const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const { value: username } = useField('username')
const { value: password } = useField('password')

// Handle form submission
import apiClient from '@/services/AxiosClient'
const onSubmit = handleSubmit(async (values) => {
  try {
    //await authStore.login(values.username, values.password)
    //router.push({ name: 'about-view' })
    const response = await apiClient.post('/auth/authenticate', {
        username: values.username,
        password: values.password,
      })
      console.log(response.data)
  } catch (error) {
    // messageStore.updateMessage('Could not login')
    // setTimeout(() => {
    //   messageStore.resetMessage()
    // }, 3000)
    alert('Fail');
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div
        class="card card-xl card-border border-base-300 overflow-hidden m-auto sm:w-1/3 md:w-4/12 lg:w-1/4 max-w-lg"
      >
        <div class="border-base-300 border-b border-dashed">
          <div class="flex items-center gap-2 p-4">
            <div class="grow">
              <div class="flex items-center gap-2 text-sm font-medium">
                <font-awesome-icon :icon="['fas', 'comments']" />
                เข้าสู่ระบบ ApptCamt
              </div>
            </div>
          </div>
        </div>
        <div class="card-body gap-4">
          <!-- Username Input -->
          <div class="flex flex-col gap-1 mb-3 w-full">
            <label
              class="input input-border flex max-w-none items-center gap-2 w-full"
            >
              <font-awesome-icon :icon="['fas', 'user']" />
              <input
                v-model="username"
                type="number"
                class="grow text-base"
                placeholder="Username"
                autocomplete="off"
                name="username"
              />
            </label>
            <span class="text-danger text-sm">{{ errors.username }}</span>
          </div>

          <!-- Password Input -->
          <div class="flex flex-col gap-1 mb-3 w-full">
            <label
              class="input input-border flex max-w-none items-center gap-2 w-full"
            >
              <font-awesome-icon :icon="['fas', 'key']" />
              <input
                v-model="password"
                type="password"
                class="grow text-base"
                placeholder="Password"
                autocomplete="current-password"
                name="password"
              />
            </label>
            <span class="text-danger text-sm">{{ errors.password }}</span>
          </div>

          <!-- Submit Button -->
          <div class="card-actions items-center gap-6">
            <button type="submit" class="btn btn-primary btn-block">
              <font-awesome-icon :icon="['fas', 'right-to-bracket']" /> Login
            </button>
            <div class="relative w-full">
              <RouterLink
                :to="{ name: 'register-view' }"
                class="link text-sm absolute right-0"
                >ลงทะเบียน</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
