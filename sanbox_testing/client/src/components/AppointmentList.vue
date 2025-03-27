<script setup lang="ts">
import AppointmentService from '@/services/AppointmentService'
import { ref, onMounted, computed } from 'vue'
// import type { Appointment } from '@/types'
import { useAuthStore } from '@/stores/auth'
import Swal from 'sweetalert2'
import { RouterLink } from 'vue-router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faRotateLeft, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import StudentService from '@/services/StudentService'
import UtilService from '@/services/UtilService'


library.add(faRotateLeft, faPlus, faCheck)

interface Appointment {
  id: number
  topic: string
  description: string
  requested_date: string | Date
  appointment_request_date: string | Date
  status_appointment_id: number
  student_confirmation: boolean
  status?: {
    status: string
  },
  student: {
    first_name: string
    last_name: string
  },
  advisor?: {
    first_name: string
    last_name: string
  }
}

const appointments = ref<Appointment[]>([])
const loading = ref<boolean>(true) // Track loading state
const error = ref<string | null>(null) // Track any error that occurs
const updatingAppointment = ref<number | null>(null) // Track which appointment is being updated
const authStore = useAuthStore()
const $swal = Swal

/* Appointment Start */
const fetchAppointments = async () => {
  try {
    if (authStore.user?.id) {
      const id = await StudentService.getStudentIdByUserId()
      const response = await AppointmentService.getAppointmentsByStudentId(id)
      appointments.value = response.data
    } else {
      throw new Error('ไม่พบรหัสผู้ใช้งาน (User ID)')
    }
  } catch (err) {
    error.value =
      'Error fetching appointments: ' +
      (err instanceof Error ? err.message : String(err))
  } finally {
    loading.value = false
  }
}

// ฟังก์ชันยืนยันนัดหมาย
const confirmAppointment = async (appointmentId: number) => {
  try {
    await AppointmentService.confirmAppointment(appointmentId)
    // อัพเดตข้อมูลในรายการ FetchData ใหม่
    fetchAppointments();
    $swal.fire({
      title: 'ยืนยันการนัดหมาย',
      text: 'ยืนยันการนัดหมายสำเร็จ',
      icon: 'success',
      confirmButtonText: 'ตกลง'
    })
  } catch (err) {
    $swal.fire({
      title: 'เกิดข้อผิดพลาด',
      text: 'ไม่สามารถยืนยันการนัดหมายได้',
      icon: 'error',
      confirmButtonText: 'ตกลง'
    })
  } finally {
    updatingAppointment.value = null
  }
}

const currentPage = ref(1)
const pageSize = 5 // Number of appointments per page

const totalPages = computed(() =>
  Math.ceil(appointments.value.length / pageSize)
)

const currentPageItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return appointments.value.slice(start, start + pageSize)
})

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value)
    currentPage.value++
}

onMounted(fetchAppointments)
</script>

<template>
  <div class="card bg-white shadow-lg p-4 rounded-lg">
    <div class="card-body">
      <h2 class="text-xl font-semibold mb-4">รายการนัดหมาย</h2>
      <div class="card-actions justify-start m-3">
        <RouterLink :to="{ name: 'student-add-appointment-view' }" class="btn">
          <font-awesome-icon :icon="['fas', 'plus']" /> เพิ่มรายการนัดหมาย
        </RouterLink>
      </div>


      <div v-if="loading" class="flex justify-center items-center py-8">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>

      <div v-else-if="error" class="alert alert-error">{{ error }}</div>

      <div v-else-if="appointments.length === 0" class="alert alert-info">
        ไม่พบรายการนัดหมาย
      </div>

      <div v-else class="overflow-x-auto rounded-box border border-base-content/5 mt-3">
        <table class="table w-full">
          <thead>
            <tr>
              <th>วันที่นัดหมาย</th>
              <th>หัวข้อ</th>
              <th>สถานะ</th>
              <th>นักศึกษายืนยันคำขอ</th>
              <th>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in currentPageItems" :key="appointment.id">
              <td class="w-30 whitespace-nowrap">{{ UtilService.formatDateTime(appointment.appointment_request_date) }}</td>
              <td class="w-auto">{{ appointment.topic }}</td>
              <td class="w-30 whitespace-nowrap" v-html="UtilService.statusToHtml(appointment.status?.status)">
              </td>
              <td class="w-40">
                <!-- แสดง loading เมื่อกำลังอัพเดต -->
                <div v-if="updatingAppointment === appointment.id" class="flex justify-center">
                  <span class="loading loading-spinner loading-sm"></span>
                </div>
                <div v-else class="flex gap-2">
                  <span v-if="appointment.student_confirmation == true" class="text-success text-xs">
                    <font-awesome-icon :icon="['fas', 'check']" /> ยืนยันแล้ว
                  </span>
                  <button v-if="appointment.status?.status == 'approved' && appointment.student_confirmation == false" @click="confirmAppointment(appointment.id)" class="btn btn-xs btn-success">
                    ยืนยัน
                  </button>
                </div>
              </td>
              <td>
                <RouterLink :to="appointment.id
                  ? {
                    name: 'student-appointment-detail-view',
                    params: { id: appointment.id },
                  }
                  : '#'
                  " class="btn btn-sm btn-dash btn-outline"><font-awesome-icon :icon="['far', 'rectangle-list']" />
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="appointments.length > 0" class="join p-3">
        <button class="join-item btn" @click="prevPage()" :disabled="currentPage === 1">
          «
        </button>
        <button class="join-item btn">
          หน้า {{ currentPage }} จาก {{ totalPages }}
        </button>
        <button class="join-item btn" @click="nextPage()" :disabled="currentPage === totalPages">
          »
        </button>
      </div>
    </div>
  </div>
</template>