<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { library } from '@fortawesome/fontawesome-svg-core'
import apiClient from '@/services/AxiosClient'
import AdvisorService from '@/services/AdvisorService'
import RegisterService from '@/services/RegisterService'
import type { RegisterForm, Advisor, Degree, Department } from '@/types' // Ensure this type is correctly defined in your types file
import type { Student } from '@/types'
import { useAuthStore } from '@/stores/auth'
import StudentService from '@/services/StudentService'
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
  faRotateLeft
)

// Inject SweetAlert2
const $swal = Swal
// Initialize router
const router = useRouter()

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
    const idResponse = await StudentService.getStudentIdByUserId()
    const response = await apiClient.put('/students/'+idResponse, formData, {
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
      student_id_card: '',
      first_name: '',
      last_name: '',
      file: null,
      department_id: '',
      degree_id: '',
      advisor_id: '',
    }
    router.push('/student-dashboard')
  } catch (error: any) {
    console.error('Error:', error.response?.data || error.message)

    // Show error alert
    $swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: error.response?.data ? 'รหัสนักศึกษาถูกใช้งานแล้ว' : error.response?.data || error.message,
    })
  }
}

const advisors = ref<Advisor[]>([])
const deegrees = ref<Degree[]>([])
const departments = ref<Department[]>([])
const loading = ref<boolean>(true)
const error = ref<string | null>(null)
const fetchAdvisors = async () => {
  try {
    const response = await AdvisorService.getAdvisors()
    advisors.value = response.data
  } catch (err) {
    error.value =
      'Error fetching advisors: ' + (err instanceof Error ? err.message : err)
  } finally {
    loading.value = false
  }
}

const fetchDegrees = async () => {
  try {
    const response = await RegisterService.getDegrees()
    deegrees.value = response.data
  } catch (err) {
    error.value =
      'Error fetching degrees : ' + (err instanceof Error ? err.message : err)
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


/* Select Student Profile Start */
const student = ref<Student | null>(null) // เก็บข้อมูลนักศึกษาเพียงคนเดียว
const authStore = useAuthStore()

const fetchStudent = async () => {
  try {
    if (authStore.user?.id !== null && authStore.user?.id !== undefined) {
      const idResponse = await StudentService.getStudentIdByUserId()
      const response = await StudentService.getStudent(idResponse)
      if (response.data && Object.keys(response.data).length > 0) {
        student.value = response.data
        Object.assign(form.value, {
          username: student.value?.users[0].username || '',
          password: '',
          student_id_card: student.value?.student_id_card || '',
          first_name: student.value?.first_name || '',
          last_name: student.value?.last_name || '',
          file: null, // ไฟล์ควรปล่อยว่าง
          department_id: student.value?.department?.id || '',
          degree_id: student.value?.degree?.id || '',
          advisor_id: student.value?.advisor?.id || '',
        })
      } else {
        console.log('ไม่พบข้อมูลนักศึกษาสำหรับผู้ใช้นี้')
        error.value = 'ไม่พบข้อมูลโปรไฟล์นักศึกษาสำหรับผู้ใช้ปัจจุบัน'
      }
    } else {
      throw new Error('ไม่พบรหัสผู้ใช้งาน (User ID)')
    }
  } catch (err) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลนักศึกษา:', err)
    error.value =
      'เกิดข้อผิดพลาดในการดึงข้อมูลนักศึกษา: ' + (err instanceof Error ? err.message : String(err))
  } finally {
    loading.value = false
  }
}
// Reactive form state
onMounted(fetchStudent)

const form = ref<RegisterForm>({
  username: '',
  password: '',
  student_id_card: '',
  first_name: '',
  last_name: '',
  file: null,
  department_id: '',
  degree_id: '',
  advisor_id: '',
})

/* Select Student Profile End */

onMounted(() => {
  fetchAdvisors()
  fetchDegrees()
  fetchDepartment()
})
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="sm:w-1/3 md:w-6/12 lg:w-10/12 max-w-xl m-auto py-20">
      <div class="card card-border border-base-300 card-sm overflow-hidden">
        <div class="card-actions justify-start m-3">
          <button class="btn w-xs" @click="goBack">
            <font-awesome-icon :icon="['fas', 'rotate-left']" /> ถอยกลับ
          </button>
        </div>
        <div class="border-base-300 border-b border-dashed">
          <div class="flex items-center gap-2 p-4">
            <div class="grow">
              <div class="flex items-center gap-2 text-sm font-medium">
                <font-awesome-icon :icon="['fas', 'user-plus']" class="size-5 opacity-40" />
                แก้ไขโปรไฟล์สำหรับนักศึกษา
              </div>
            </div>
          </div>
        </div>

        <div class="card-body gap-4">

           <!-- Username -->
           <div class="flex flex-col gap-1">
            <label
              class="input input-border flex max-w-none items-center gap-2 w-full"
            >
              <font-awesome-icon
                :icon="['fas', 'user']"
                class="h-4 w-4 opacity-70"
              />
              <input
                v-model="form.username"
                type="text"
                class="grow"
                placeholder="Username"
                required
                autocomplete="off"
              />
            </label>
          </div>

          <!-- Password -->
          <div class="flex flex-col gap-1">
            <label
              class="input input-border flex max-w-none items-center gap-2 w-full"
            >
              <font-awesome-icon
                :icon="['fas', 'key']"
                class="h-4 w-4 opacity-70"
              />
              <input
                v-model="form.password"
                type="password"
                class="grow"
                placeholder="Password"
                required
                autocomplete="off"
              />
            </label>
          </div>

          <!-- Student ID -->
          <div class="flex flex-col gap-1">
            <label class="input input-border flex max-w-none items-center gap-2 w-full">
              <font-awesome-icon :icon="['fas', 'id-card']" class="h-4 w-4 opacity-70" />
              <input v-model="form.student_id_card" type="text" class="grow" placeholder="Student ID" required />
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
            <label class="input input-border flex max-w-none items-center gap-2 w-full mb-2">
              <font-awesome-icon :icon="['fas', 'graduation-cap']" class="h-4 w-4 opacity-70" />
              <select v-model="form.degree_id" class="grow">
                <option value="" disabled>เลือกระดับการศึกษา</option>
                <option v-for="deegree in deegrees" :key="deegree.id" :value="deegree.id">
                  {{ deegree.degree_name }}
                </option>
              </select>
            </label>
            <label class="input input-border flex max-w-none items-center gap-2 w-full required">
              <font-awesome-icon :icon="['fas', 'chalkboard-teacher']" class="h-4 w-4 opacity-70" />
              <select v-model="form.advisor_id" class="grow">
                <option value="" disabled>เลือกที่ปรึกษา</option>
                <option v-for="advisor in advisors" :key="advisor.id" :value="advisor.id">
                  {{ advisor.first_name }} {{ advisor.last_name }}
                </option>
              </select>
            </label>
          </div>

          <!-- Submit Button -->
          <div class="card-actions items-center gap-6">
            <button type="submit" class="btn btn-primary btn-block">
              แก้ไขโปรไฟล์
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
