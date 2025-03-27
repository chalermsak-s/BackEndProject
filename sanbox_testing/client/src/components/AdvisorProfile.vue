<script setup lang="ts">
import AdvisorService from '@/services/AdvisorService'
import AnnouncementService from '@/services/AnnouncementService'
import AppointmentService from '@/services/AppointmentService'
import { ref, onMounted } from 'vue'
import type { AcademicPosition, Department, Appointment } from '@/types'

interface Advisor {
  id: number
  first_name: string
  last_name: string
  picture:string
  academic_position: AcademicPosition
  department_id: number
  department: Department
}

const advisors = ref<Advisor[]>([])
const loading = ref<boolean>(true) // Track loading state
const error = ref<string | null>(null) // Track any error that occurs

/* Advisor Start */
const typedAdvisorProfile = ref<Advisor | null>(null);
const fetchAdvisors = async () => {
  try {
    const id = await AdvisorService.getAdvisorIdByUserId()
    const response = await AdvisorService.getAdvisor(id)
    advisors.value = response.data
    typedAdvisorProfile.value = Array.isArray(response.data) // ✔ ถ้า response.data เป็น อาร์เรย์ → ใช้ตัวแรก (response.data[0]) ✔ ถ้า response.data เป็น อ็อบเจ็กต์เดี่ยว → ใช้ค่าทั้งหมดเลย
      ? (response.data.length > 0 ? response.data[0] : null)
      : response.data

  } catch (err) {
    error.value =
      'Error fetching advisors: ' + (err instanceof Error ? err.message : err)
  } finally {
    loading.value = false
  }
}

interface Announcement {
  id: number
  topic: string
  description?: string
  file?: string
  posted_date: Date
  advisor_id?: number
  advisor?: Advisor
}

const announcements = ref<Announcement[]>([])
const loadingAnnouncements = ref(false)
const announcementError = ref<string | null>(null)

const fetchAnnouncements = async () => {
  try {
    loadingAnnouncements.value = true
    const advisorId = await AdvisorService.getAdvisorIdByUserId()
    const response = await AnnouncementService.getAnnouncementByAdvisorId(advisorId)
    announcements.value = response.data
  } catch (err) {
    announcementError.value = 'Error fetching announcements: ' +
      (err instanceof Error ? err.message : 'Unknown error')
  } finally {
    loadingAnnouncements.value = false
  }
}

const appointments = ref<Appointment[]>([])
const loadingAppointments = ref(false)
const appointmentError = ref<string | null>(null)

const fetchAppointments = async () => {
  try {
    loadingAppointments.value = true
    const advisorId = await AdvisorService.getAdvisorIdByUserId()
    const response = await AppointmentService.getAppointmentByAdvisorId(advisorId)
    // appointments.value = response.data
    // กรองเฉพาะนัดหมายที่มี status.id === 2 (Pending)
    appointments.value = response.data.filter(
      (appt: Appointment) => appt.status_appointment_id === 2
    )
  } catch (err) {
    appointmentError.value = 'Error fetching appointments: ' +
      (err instanceof Error ? err.message : 'Unknown error')
  } finally {
    loadingAppointments.value = false
  }
}

onMounted(async () => {
  await fetchAdvisors()
  await fetchAnnouncements()
  await fetchAppointments()
})

/* Advisor End */
</script>
<template>
  <div class="w-full md:w-1/3">
    <div class="card bg-base-100 shadow-xl p-4 ">
      <figure class="px-10 pt-10">
        <img :src="typedAdvisorProfile?.picture || 'https://img.freepik.com/free-photo/view-3d-male-teacher_23-2150710024.jpg'"
        :alt="typedAdvisorProfile?.picture ? 'รูปอาจารย์ที่ปรึกษา' : 'Profile'" class="rounded-full w-24 h-24 object-cover" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title"> {{ typedAdvisorProfile ? `${typedAdvisorProfile.first_name}
          ${typedAdvisorProfile.last_name}` : "ไม่พบข้อมูล" }} </h2>
        <div class="divider"></div>
        <ul class="menu bg-base-200 w-full rounded-box">
          <li class="bg-primary text-white rounded-lg"><a><i class="fa fa-user"></i> profile </a></li>
          <li><a><i class="fa fa-calendar"></i> All Announcements <span class="badge badge-warning">{{
                announcements.length }}</span></a></li>
          <li><a><i class="fa fa-calendar"></i> All Request <span class="badge badge-warning">{{ appointments.length
                }}</span></a></li>
        </ul>

        <div class="card bg-base-100 w-full shadow-xl p-4 mt-1 text-left">
          <div class="card-body">
            <h2 class="card-title">Bio Graph</h2>
            <div class="grid grid-cols-1 gap-1">
              <p><span class="font-bold">Position:</span> {{
                typedAdvisorProfile?.academic_position?.academic_position_name || "ไม่พบข้อมูล" }} </p>
              <p><span class="font-bold">First Name:</span> {{ typedAdvisorProfile?.first_name || "ไม่พบข้อมูล" }} </p>
              <p><span class="font-bold">Last Name:</span> {{ typedAdvisorProfile?.last_name || "ไม่พบข้อมูล" }}</p>
              <p><span class="font-bold">Department:</span> {{ typedAdvisorProfile?.department ?
                `${typedAdvisorProfile.department.department_name} (${typedAdvisorProfile.department.initials})` :
                "ไม่พบข้อมูล" }} </p>
              <p><span class="font-bold">Mobile Phone:</span> (66) 11-222-3333</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>