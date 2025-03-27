<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { library } from '@fortawesome/fontawesome-svg-core'
import apiClient from '@/services/AxiosClient'
import RegisterService from '@/services/RegisterService'
import AcademicpositionService from '@/services/AcademicpositionService'
import type { RegisterAdvisor, Department,AcademicPosition } from '@/types' // Ensure this type is correctly defined in your types file
import {
  faCirclePlay,
  faRightToBracket,
  faEnvelope,
  faKey,
  faComment,
  faUser,
  faUserPlus,
  faIdCard,
  faCamera,
  faBuilding,
  faGraduationCap,
  faChalkboardTeacher,
  faChalkboardUser,
  faRotateLeft
} from '@fortawesome/free-solid-svg-icons'

// Add only the icons used in this page
library.add(
  faCirclePlay,
  faRightToBracket,
  faEnvelope,
  faKey,
  faComment,
  faUser,
  faUserPlus,
  faIdCard,
  faCamera,
  faBuilding,
  faGraduationCap,
  faChalkboardTeacher,
  faChalkboardUser,
  faRotateLeft
)

// Inject SweetAlert2
const $swal = Swal
// Initialize router
const router = useRouter()


// Reactive form state
const form = ref<RegisterAdvisor>({
  username: '',
  password: '',
  first_name: '',
  last_name: '',
  file: null,
  academic_position_id: 0,
  department_id: 0
})

// Handle file upload
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    form.value.file = target.files[0] // Capture the file
  }
}

// Submit form
const submitForm = async () => {
  const formData = new FormData()
  Object.entries(form.value).forEach(([key, value]) => {
    if (value !== null) {
      formData.append(key, value as string | Blob)
    }
  })
  try {
    const response = await apiClient.post('/advisors', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    console.log('Success:', response.data)

    // Show success alert
    $swal.fire({
      icon: 'success',
      title: 'บันทึกข้อมูลสำเร็จ',
      showConfirmButton: false,
      timer: 1500,
    })

    form.value = {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      file: null,
      academic_position_id: 0,
      department_id: 0,
    }
    router.push('/admin')
  } catch (error: any) {
    console.error('Error:', error.response?.data || error.message)

    // Show error alert
    $swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: error.response?.data ? 'ชื่อผู้ใช้นี้ถูกใช้งานแล้ว' : error.response?.data || error.message,
    })
  }
}


const departments = ref<Department[]>([])
const academicpositions = ref<AcademicPosition[]>([])
const loading = ref<boolean>(true)
const error = ref<string | null>(null)

const fetchAcademicPosition = async () => {
  try {
    const response = await AcademicpositionService.getAcademicpositions()
    academicpositions.value = response.data
  } catch (err) {
    error.value =
      'Error fetching Academicpositions : ' +
      (err instanceof Error ? err.message : err)
  } finally {
    loading.value = false
  }
}

const fetchDepartment = async () => {
  try {
    const response = await RegisterService.getDepartments()
    departments.value = response.data
  } catch (err) {
    error.value =
      'Error fetching Departments : ' +
      (err instanceof Error ? err.message : err)
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.go(-1) // กลับไปหน้าก่อนหน้า
}

onMounted(() => {
  fetchDepartment()
  fetchAcademicPosition()
})
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="sm:w-1/3 md:w-4/12 lg:w-8/12 max-w-xl m-auto py-20">
      <div class="card-actions justify-start mb-3">
        <button @click="goBack" class="btn">
          <font-awesome-icon :icon="['fas', 'rotate-left']" /> ถอยกลับ
        </button>
      </div>
      <div class="card card-border border-base-300 card-sm overflow-hidden">
        <div class="border-base-300 border-b border-dashed">
          <div class="flex items-center gap-2 p-4">
            <div class="grow">
              <div class="flex items-center gap-2 text-sm font-medium">
                <font-awesome-icon :icon="['fas', 'user-plus']" class="size-5 opacity-40" />
                ลงทะเบียนอาจารย์ที่ปรึกษา
              </div>
            </div>
          </div>
        </div>

        <div class="card-body gap-4">
          <!-- Username -->
          <div class="flex flex-col gap-1">
            <label class="input input-border flex max-w-none items-center gap-2 w-full">
              <font-awesome-icon :icon="['fas', 'user']" class="h-4 w-4 opacity-70" />
              <input v-model="form.username" type="text" class="grow" placeholder="Username" required
                autocomplete="off" />
            </label>
          </div>

          <!-- Password -->
          <div class="flex flex-col gap-1">
            <label class="input input-border flex max-w-none items-center gap-2 w-full">
              <font-awesome-icon :icon="['fas', 'key']" class="h-4 w-4 opacity-70" />
              <input v-model="form.password" type="password" class="grow" placeholder="Password" required
                autocomplete="off" />
            </label>
          </div>

          <!-- First & Last Name -->
          <div class="flex flex-col gap-1">
            <label class="input input-border flex max-w-none items-center gap-2 w-full mb-2">
              <font-awesome-icon :icon="['fas', 'user']" class="h-4 w-4 opacity-70" />
              <input v-model="form.first_name" type="text" class="grow" placeholder="First Name" required
                autocomplete="off" />
            </label>
            <label class="input input-border flex max-w-none items-center gap-2 w-full">
              <font-awesome-icon :icon="['fas', 'user']" class="h-4 w-4 opacity-70" />
              <input v-model="form.last_name" type="text" class="grow" placeholder="Last Name" required
                autocomplete="off" />
            </label>
          </div>

          <!-- Picture Upload -->
          <div class="flex flex-col gap-1">
            <label class="input input-border flex max-w-none items-center gap-2 w-full">
              <font-awesome-icon :icon="['fas', 'camera']" class="h-4 w-4 opacity-70" />
              <input class="pt-2" type="file" @change="handleFileUpload" required />
            </label>
          </div>

          <!-- Academic Position -->
          <label class="input input-border flex max-w-none items-center gap-2 w-full mb-2">
            <font-awesome-icon :icon="['fas', 'chalkboard-user']" class="h-4 w-4 opacity-70" />
            <select v-model="form.academic_position_id" class="grow">
              <option value="" disabled>เลือกตำแหน่งทางวิชาการ</option>
              <option v-for="academicposition in academicpositions" :key="academicposition.id" :value="academicposition.id">
                {{ academicposition.academic_position_name }}
              </option>
            </select>
          </label>

          <!-- Department, Degree, Advisor -->
          <div class="flex flex-col gap-1">
            <label class="input input-border flex max-w-none items-center gap-2 w-full mb-2">
              <font-awesome-icon :icon="['fas', 'building']" class="h-4 w-4 opacity-70" />
              <select v-model="form.department_id" class="grow">
                <option value="" disabled>เลือกสาขาวิชา</option>
                <option v-for="department in departments" :key="department.id" :value="department.id">
                  {{ department.department_name }}
                </option>
              </select>
            </label>

          </div>

          <!-- Submit Button -->
          <div class="card-actions items-center gap-6">
            <button type="submit" class="btn btn-primary btn-block">
              ลงทะเบียนอาจารที่ปรึกษา
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<style lang=""></style>
