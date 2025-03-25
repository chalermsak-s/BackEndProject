<script setup lang="ts">
import AppointmentService from '@/services/AppointmentService'
import { ref, onMounted, computed } from 'vue'
import type { Appointment } from '@/types'
import { useAuthStore } from '@/stores/auth'
import Swal from 'sweetalert2'


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
      const response = await AppointmentService.getAppointmentsByStudentId(authStore.user.id)
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
        updatingAppointment.value = appointmentId
        await AppointmentService.confirmAppointment(appointmentId)
        
        // อัพเดตข้อมูลในรายการ
        const index = appointments.value.findIndex(a => a.id === appointmentId)
        if (index !== -1) {
            appointments.value[index].student_confirmation = true
            appointments.value[index].status = 'approved'
        }
        
        $swal.fire({
            title: 'ยืนยันการนัดหมาย',
            text: 'ยืนยันการนัดหมายสำเร็จ',
            icon: 'success',
            confirmButtonText: 'ตกลง'
        })
    } catch (err) {
        // toast.error('เกิดข้อผิดพลาดในการยืนยันการนัดหมาย: ' + 
      // (err instanceof Error ? err.message : String(err)))
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

// ฟังก์ชันยกเลิกนัดหมาย
const cancelAppointment = async (appointmentId: number) => {
    try {
        updatingAppointment.value = appointmentId
        await AppointmentService.cancelAppointment(appointmentId)
        
        // อัพเดตข้อมูลในรายการ
        const index = appointments.value.findIndex(a => a.id === appointmentId)
        if (index !== -1) {
            appointments.value[index].status = 'rejected'
        }
        
      // toast.success('ยกเลิกการนัดหมายสำเร็จ')
        $swal.fire({
            title: 'ยกเลิกการนัดหมาย',
            text: 'คุณต้องการยกเลิกการนัดหมายนี้หรือไม่?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
              // toast.success('ยกเลิกการนัดหมายสำเร็จ')
                $swal.fire({
                    title: 'ยกเลิกการนัดหมาย',
                    text: 'ยกเลิกการนัดหมายสำเร็จ',
                    icon: 'success',
                    confirmButtonText: 'ตกลง'
                })
            } else {
                $swal.fire({
                    title: 'ยกเลิกการยกเลิกการนัดหมาย',
                    text: 'ยกเลิกการยกเลิกการนัดหมาย',
                    icon: 'error',
                    confirmButtonText: 'ตกลง'
                })
            }
        })
    } catch (err) {
        $swal.fire({
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถยกเลิกการนัดหมายได้',
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

// Format date and time
const formatDateTime = (date: Date | string): string => {
    if (!date) {
        return '-'
    }
    const dateTime = new Date(date)
    if (isNaN(dateTime.getTime())) {
        return '-'
    }
    return dateTime.toLocaleString('th-TH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })
}

// Format status to HTML
const statusToHtml = (status: string | undefined) => {
    if (!status) {
        return '<span class="badge badge-xs badge-neutral whitespace-nowrap">ไม่ระบุ</span>'
    }
    
    switch (status) {
        case 'approved':
            return '<span class="badge badge-xs badge-success whitespace-nowrap">อนุมัติ</span>'
        case 'pending':
            return '<span class="badge badge-xs badge-warning whitespace-nowrap">รอดำเนินการ</span>'
        case 'rejected':
            return '<span class="badge badge-xs badge-error whitespace-nowrap">ปฏิเสธ</span>'
        default:
            return '<span class="badge badge-xs badge-neutral whitespace-nowrap">ไม่ระบุ</span>'
    }
}

// ตรวจสอบว่านักศึกษาสามารถยืนยันการนัดหมายได้หรือไม่
const canConfirm = (appointment: Appointment): boolean => {
    return (
        appointment.status === 'pending' && 
        !appointment.student_confirmation
    )
}

// ตรวจสอบว่านักศึกษาสามารถยกเลิกการนัดหมายได้หรือไม่
const canCancel = (appointment: Appointment): boolean => {
    return (
        appointment.status !== 'rejected' &&
        appointment.status !== 'completed'
    )
}

onMounted(fetchAppointments)
</script>

<template>
  <div class="card bg-white shadow-lg p-4 rounded-lg">
    <div class="card-body">
      <h2 class="text-xl font-semibold mb-4">รายการนัดหมาย</h2>
      
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
              <th>รายละเอียด</th>
              <!-- <th>อาจารย์</th> -->
              <th>สถานะ</th>
              <th>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in currentPageItems" :key="appointment.id">
              <td class="w-30 whitespace-nowrap">{{ formatDateTime(appointment.requested_date) }}</td>
              <td class="w-30 whitespace-nowrap">{{ appointment.topic }}</td>
              <td class="w-auto">{{ appointment.description }}</td>
              <!-- <td class="w-30 whitespace-nowrap">{{ appointment.advisor?.first_name }} {{ appointment.advisor?.last_name }}</td> -->
              <td class="w-30 whitespace-nowrap" v-html="statusToHtml(appointment.status)"></td>
              <td class="w-40">
                <!-- แสดง loading เมื่อกำลังอัพเดต -->
                <div v-if="updatingAppointment === appointment.id" class="flex justify-center">
                  <span class="loading loading-spinner loading-sm"></span>
                </div>
                <div v-else class="flex gap-2">
                  <!-- ปุ่มยืนยันการนัดหมาย -->
                  <button 
                    v-if="canConfirm(appointment)" 
                    @click="confirmAppointment(appointment.id)"
                    class="btn btn-xs btn-success"
                  >
                    ยืนยัน
                  </button>
                  
                  <!-- แสดงสถานะเมื่อยืนยันแล้ว -->
                  <span v-else-if="appointment.student_confirmation" class="text-success text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    ยืนยันแล้ว
                  </span>
                  
                  <!-- ปุ่มยกเลิกการนัดหมาย -->
                  <button 
                    v-if="canCancel(appointment)" 
                    @click="cancelAppointment(appointment.id)"
                    class="btn btn-xs btn-error"
                  >
                    ยกเลิก
                  </button>
                </div>
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