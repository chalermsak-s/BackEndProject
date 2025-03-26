<script setup lang="ts">
import StudentService from '@/services/StudentService'
import { ref, onMounted } from 'vue'
import type { Student } from '@/types'
import { useAuthStore } from '@/stores/auth'
import { library } from '@fortawesome/fontawesome-svg-core'
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
  faBook,
  faEdit,
  faCircleCheck
} from '@fortawesome/free-solid-svg-icons'

import { faPenToSquare, faSchool } from '@fortawesome/free-solid-svg-icons'
import { RouterLink } from 'vue-router'

// Add only the icons used in this page

const student = ref<Student | null>(null) // เก็บข้อมูลนักศึกษาเพียงคนเดียว
const loading = ref<boolean>(true)
const authStore = useAuthStore()
const error = ref<string | null>(null) // To store error messages

const fetchStudent = async () => {
  try {
    if (authStore.user?.id !== null && authStore.user?.id !== undefined) {
      const idResponse = await StudentService.getStudentIdByUserId()
      const response = await StudentService.getStudent(idResponse)
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
  faBook,
  faEdit,
  faCircleCheck,
  faPenToSquare,
  faSchool
)
onMounted(fetchStudent)

</script>

<template>
  <div class="card bg-white shadow-lg p-4 rounded-lg">
    <figure class="px-10 pt-10">
      <img :src="student?.picture || 'https://www.svgrepo.com/show/520490/student.svg'"
        :alt="student?.picture ? 'รูปนักศึกษา' : 'Profile'" class="rounded-md w-30" />
    </figure>
    <div class="card-body">
      <h2 class="card-title text-xl font-bold text-primary mb-4">
        <font-awesome-icon :icon="['fas', 'id-card']" class="mr-2" />
        รหัสนักศึกษา {{ student?.student_id_card }}
      </h2>

      <div class="divider my-2"></div>

      <div class="space-y-3">
        <div class="flex items-center">
          <font-awesome-icon :icon="['fas', 'user']" class="w-5 text-secondary mr-3" />
          <span class="font-medium min-w-[130px]">ชื่อ-นามสกุล</span>
          <span>{{ student?.first_name }} {{ student?.last_name }}</span>
        </div>

        <div class="flex items-center">
          <font-awesome-icon :icon="['fas', 'graduation-cap']" class="w-5 text-secondary mr-3" />
          <span class="font-medium min-w-[130px]">ระดับการศึกษา</span>
          <span>{{ student?.degree?.degree_name }}</span>
        </div>

        <div class="flex items-center">
          <font-awesome-icon :icon="['fas', 'book']" class="w-5 text-secondary mr-3" />
          <span class="font-medium min-w-[130px]">หลักสูตร</span>
          <span>{{ student?.department?.initials }}</span>
        </div>

        <div class="flex items-center">
          <font-awesome-icon :icon="['fas', 'school']" class="w-5 text-secondary mr-3"/>
          <span class="font-medium min-w-[130px]">สาขาวิชา</span>
          <span>{{ student?.department?.department_name }}</span>
        </div>

        <div class="flex items-center">
          <font-awesome-icon :icon="['fas', 'chalkboard-teacher']" class="w-5 text-secondary mr-3" />
          <span class="font-medium min-w-[130px]">อาจารย์ที่ปรึกษา</span>
          <span>{{ student?.advisor?.first_name }} {{ student?.advisor?.last_name }}</span>
        </div>
      </div>

      <div class="divider my-3"></div>

      <div class="card-actions justify-end mt-2">
        <RouterLink :to="{ name: 'student-profile-edit' }" class="btn btn-primary btn-outline gap-2">
          <font-awesome-icon :icon="['fas', 'pen-to-square']" />
          แก้ไขข้อมูล
        </RouterLink>
      </div>
    </div>
  </div>
</template>
