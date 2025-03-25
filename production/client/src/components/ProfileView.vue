<script setup lang="ts">
import StudentService from '@/services/StudentService'
import { ref, onMounted } from 'vue'
import type { Student } from '@/types'
import { useAuthStore } from '@/stores/auth'

const student = ref<Student | null>(null) // เก็บข้อมูลนักศึกษาเพียงคนเดียว
const loading = ref<boolean>(true)
const authStore = useAuthStore()
const error = ref<string | null>(null) // To store error messages
const fetchStudent = async () => {
  try {
    if (authStore.user?.id !== null && authStore.user?.id !== undefined) {
      const response = await StudentService.getStudent(authStore.user.id)
      console.log('Response data:', response.data)
      if (response.data && Object.keys(response.data).length > 0) {
        student.value = response.data 
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

onMounted(fetchStudent)
</script>

<template>
  <div class="mx-auto p-3">
    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center my-3">
      <div class="loading loading-spinner text-primary"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="alert alert-error text-sm my-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>{{ error }}</span>
    </div>

    <!-- Student data -->
    <div v-else-if="student" class="card compact bg-base-100 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center space-x-3">
          <!-- Profile image -->
          <div class="avatar">
            <div class="w-16 h-16 rounded-full">
              <img :src="student.picture ? student.picture : 'https://bootdey.com/img/Content/avatar/avatar3.png'" 
                   :alt="`${student.first_name} ${student.last_name}`" />
            </div>
          </div>
          
          <!-- Name and ID -->
          <div>
            <h2 class="text-lg font-bold">{{ student.first_name }} {{ student.last_name }}</h2>
            <p class="text-xs text-gray-500">{{ student.student_id_card }}</p>
            <div class="badge badge-sm badge-primary mt-1">{{ student.department?.department_name || 'ไม่ระบุภาควิชา' }}</div>
          </div>
        </div>
        
        <div class="divider my-2"></div>
        
        <!-- Student details -->
        <div class="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span class="font-bold">ระดับการศึกษา:</span>
            <span class="ml-1">{{ student.degree?.degree_name || 'ไม่ระบุ' }}</span>
          </div>
          <div>
            <span class="font-bold">อาจารย์ที่ปรึกษา:</span>
            <span class="ml-1">{{ student.advisor ? `${student.advisor.first_name} ${student.advisor.last_name}` : 'ไม่ระบุ' }}</span>
          </div>
        </div>
        
        <!-- Latest activity -->
        <div class="mt-3">
          <h3 class="text-sm font-bold mb-1">กิจกรรมล่าสุด</h3>
          <div class="overflow-x-auto">
            <table class="table table-xs w-full">
              <thead>
                <tr class="text-xs">
                  <th>วันที่</th>
                  <th>รายการ</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="student.appointments && student.appointments.length > 0">
                  <td>{{ new Date(student.appointments[0].appointment_request_date).toLocaleDateString('th-TH') }}</td>
                  <td>{{ student.appointments[0].topic }}</td>
                  <td><div class="badge badge-xs badge-info">{{ student.appointments[0].status?.status || 'รอดำเนินการ' }}</div></td>
                </tr>
                <tr v-else>
                  <td colspan="3" class="text-center text-xs py-2">ไม่มีกิจกรรมล่าสุด</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="card-actions justify-end mt-2">
          <button class="btn btn-xs btn-outline">ข้อมูลเพิ่มเติม</button>
          <button class="btn btn-xs btn-primary">แก้ไขข้อมูล</button>
        </div>
      </div>
    </div>

    <!-- No data state -->
    <div v-else class="alert alert-warning text-sm">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      <span>ไม่พบข้อมูลนักศึกษา</span>
    </div>
  </div>
</template>
