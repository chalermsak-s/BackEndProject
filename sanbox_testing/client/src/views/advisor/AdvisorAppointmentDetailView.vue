<script setup lang="ts">
import { useRouter } from 'vue-router'
import UtilService from '@/services/UtilService'
import { ref, onMounted } from 'vue'
import AppointmentService from '@/services/AppointmentService'
import type { Appointment } from '@/types'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

const router = useRouter()

// const { appointment } = storeToRefs(store)

const appointment = ref<Appointment | null>(null)
const loading = ref<boolean>(true)
const error = ref<string | null>(null)

const goBack = () => {
  router.go(-1) // กลับไปหน้าก่อนหน้า
}

// // ฟังก์ชันดึงข้อมูลประกาศตาม ID
const fetchAppointmentById = async () => {
  try {
    const appointmentById = parseInt(router.currentRoute.value.params.id as string)
    const response = await AppointmentService.getAppointment(appointmentById) // เรียก API ตาม ID ที่เลือก
    appointment.value = response.data
  } catch (err) {
    error.value = 'Error fetching appointment: ' + (err instanceof Error ? err.message : err)
  } finally {
    loading.value = false
  }
}

// ตรวจสอบข้อมูลใน store
onMounted(fetchAppointmentById)

</script>

<template>
  <div class="max-w-6xl mx-auto p-5">
    <div class="card bg-white shadow-lg p-4 rounded-lg mt-10">
      <div class="card-body gap-4">
        <h2 class="flex items-center justify-between">
          <span class="flex items-center gap-2 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-5 opacity-40">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941">
              </path>
            </svg>
            รายละเอียดการนัดหมาย
          </span>
        </h2>
        <div class="flex flex-col">
          <div class="border-t-base-content/5 flex items-center justify-between gap-2 border-t border-dashed py-2">
            นักศึกษา
            <span>{{ appointment?.student?.first_name || 'ไม่มีข้อมูล' }}
              {{ appointment?.student?.last_name || 'ไม่มีข้อมูล' }}</span>
          </div>
          <div class="border-t-base-content/5 flex items-center justify-between gap-2 border-t border-dashed py-2">
            อาจารย์ที่ปรึกษา
            <span>{{ appointment?.advisor?.first_name || 'ไม่มีข้อมูล' }}
              {{ appointment?.advisor?.last_name || 'ไม่มีข้อมูล' }}</span>
          </div>
          <div class="border-t-base-content/5 flex items-center justify-between gap-2 border-t border-dashed py-2">
            หัวข้อ
            <span>{{ appointment?.topic || 'ไม่มีข้อมูล' }}</span>
          </div>
          <div class="border-t-base-content/5 flex items-center justify-between gap-2 border-t border-dashed py-2">
            คำอธิบาย
            <span>{{ appointment?.description || 'ไม่มีข้อมูล' }}</span>
          </div>
          <div class="border-t-base-content/5 flex items-center justify-between gap-2 border-t border-dashed py-2">
            วันที่ส่งคำขอนัดหมาย
            <span>{{
              UtilService.formatDateTime(appointment?.requested_date ?? '')
            }}</span>
          </div>
          <div class="border-t-base-content/5 flex items-center justify-between gap-2 border-t border-dashed py-2">
            วันและเวลาทีต้องการนัดหมาย
            <span>{{
              UtilService.formatDateTime(
                appointment?.appointment_request_date ?? ''
              )
            }}</span>
          </div>
          <div class="border-t-base-content/5 flex items-center justify-between gap-2 border-t border-dashed py-2">
            นักศึกษาได้กดยืนยันการนัดหมาย
            <span v-html="UtilService.statusToHtmlStudent(
              appointment?.student_confirmation
            )
              "></span>
          </div>
          <div class="border-t-base-content/5 flex items-center justify-between gap-2 border-t border-dashed py-2">
            สถานะ
            <span v-html="UtilService.statusToHtml(appointment?.status?.status)"></span>
          </div>
        </div>
      </div>
      <button class="btn btn-start" @click="goBack">
        <font-awesome-icon :icon="['fas', 'rotate-left']" /> ถอยกลับ
      </button>
    </div>
  </div>
</template>
