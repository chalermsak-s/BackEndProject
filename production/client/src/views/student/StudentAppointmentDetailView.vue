<script setup lang="ts">
import { useAppointmentStore } from '@/stores/appointment'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import UtilService from '@/services/UtilService'
const store = useAppointmentStore()
const router = useRouter()
const { appointment } = storeToRefs(store)
const goBack = () => {
  router.go(-1) // กลับไปหน้าก่อนหน้า
}
library.add(faRotateLeft)
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
            <span>{{ appointment?.student?.first_name }}
              {{ appointment?.student?.last_name }}</span>
          </div>
          <div class="border-t-base-content/5 flex items-center justify-between gap-2 border-t border-dashed py-2">
            อาจารย์ที่ปรึกษา
            <span>{{ appointment?.advisor?.first_name }}
              {{ appointment?.advisor?.last_name }}</span>
          </div>
          <div class="border-t-base-content/5 flex items-center justify-between gap-2 border-t border-dashed py-2">
            หัวข้อ
            <span>{{ appointment?.topic }}</span>
          </div>
          <div class="border-t-base-content/5 flex items-center justify-between gap-2 border-t border-dashed py-2">
            คำอธิบาย
            <span>{{ appointment?.description }}</span>
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
      <button class="btn w-lg" @click="goBack">
        <font-awesome-icon :icon="['fas', 'rotate-left']" /> ถอยกลับ
      </button>
    </div>
  </div>
</template>
