<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import AdvisorService from '@/services/AdvisorService'
import type { Advisor } from '@/types'
import apiClient from '@/services/AxiosClient'
import Swal from 'sweetalert2'
const $swal = Swal
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
  faChalkboardTeacher
)
const store = useStudentStore()
const router = useRouter()
const { student } = storeToRefs(store)
const goBack = () => {
  router.go(-1) // กลับไปหน้าก่อนหน้า
}
library.add(faRotateLeft)

const imageExists = ref(false)


const form = ref<any>({
  advisor_id: '',
})

const loading = ref<boolean>(true)
const error = ref<string | null>(null)


const submitForm = async () => {
  const formData = new FormData()
  const url = window.location.pathname;
  const parts = url.split("/");
  const studentId = parts[parts.length - 1]; // Get last 
  try {
    const response = await apiClient.put(`/students/update/advisor/${studentId}`, formData)
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
    router.push('/')
  } catch (error: any) {
    console.error('Error:', error.response?.data || error.message)

    // Show error alert
    $swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: error.response?.data ? 'รหัสนักศึกษาถูกใช้งานแล้ว': error.response?.data || error.message,
    })
  }
}


const fetchAdvisors = async () => {
  try {
    const response = await AdvisorService.getAdvisors()
    advisors.value = response.data
  } catch (err: any) {
    error.value =
      'Error fetching advisors: ' + (err instanceof Error ? err.message : err)
  } finally {
    loading.value = false
  }
}

const advisors = ref<Advisor[]>([])
onMounted(() => {
  fetchAdvisors()
})

</script>
<template>
  <div class="card card-border bg-base-100 w-96 m-auto my-10">
    <figure class="px-10 pt-10">
      <img v-if="imageExists" :src="student?.picture ?? ''" alt="รูปนักศึกษา" />
      <img v-else src="https://www.svgrepo.com/show/520490/student.svg" alt="Profile" class="rounded-xl" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">รหัสนักศึกษา {{ student?.student_id_card }}</h2>
      <p>ชื่อ {{ student?.first_name }} นามสกุล {{ student?.last_name }}</p>
      <p>
        {{ student?.degree?.degree_name }}
      </p>
      <p>หลักสูตร {{ student?.department?.initials }}</p>
      <p>สาขาวิชา {{ student?.department?.department_name }}</p>
      <p>
        อาจารย์ที่ปรึกษา {{ student?.advisor?.first_name }}
        {{ student?.advisor?.last_name }}
      </p>
      <form @submit.prevent="submitForm">
        <label class="input input-border flex max-w-none items-center gap-2 w-full require">
          <font-awesome-icon :icon="['fas', 'chalkboard-teacher']" class="h-4 w-4 opacity-70" />
          <select class="grow" v-model="form.advisor_id">
            <option value="">เลือกที่ปรึกษา</option>
            <option v-for="advisor in advisors" :key="advisor.id" :value="advisor.id">
              {{ advisor.first_name }} {{ advisor.last_name }}
            </option>
          </select>
        </label>
        <div class="card-actions items-center gap-6 mt-3">
          <button type="submit" class="btn btn-primary btn-block">
            บันทึก
          </button>
        </div>
      </form>
      <div class="card-actions justify-end">
        <button @click="goBack" class="btn">
          <font-awesome-icon :icon="['fas', 'rotate-left']" /> ถอยกลับ
        </button>
      </div>

    </div>
  </div>
</template>
