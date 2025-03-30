<script setup lang="ts">
import AdvisorService from '@/services/AdvisorService' // นำเข้า service (AdvisorService)
import { ref, onMounted, computed } from 'vue' // นำเข้า utilities จาก Vue
import type { Student} from '@/types' // นำเข้า type { Student}


const students = ref<Student[]>([]) // เก็บรายชื่อนักศึกษา
const loading = ref<boolean>(true) // สถานะการโหลดข้อมูล
const error = ref<string | null>(null) // เก็บข้อความ error (ถ้ามี)

/* Student Start */
const fetchStudents = async () => {
  try {
    const id = await AdvisorService.getAdvisorIdByUserId() // ดึงข้อมูล advisor ID ก่อน แล้วจึงดึงรายชื่อนักศึกษาที่อยู่ภายใต้การดูแล
    const response = await AdvisorService.getStudentByAdvisor(id)
    students.value = response.data.students
  } catch (err) {
    error.value =
      'Error fetching students: ' + (err instanceof Error ? err.message : err)
  } finally {
    loading.value = false
  }
}

// Custom pagination Student
const currentStduentPage = ref(1) // หน้าปัจจุบัน 
const pageStudentSize = 3 // จำนวนรายการต่อหน้า

// คำนวณจำนวนหน้าทั้งหมด
const totalStudentPages = computed(() =>
  Math.ceil(students.value.length / pageStudentSize) // จำนวนนักเรียน/จำนวนรายการต่อหน้า เช่น 18/3 = 6 หน้า (หน้าละ 3 คน)
)

const currentStduentPageItems = computed(() => {
  const start = (currentStduentPage.value - 1) * pageStudentSize // คำนวณจุดเริ่มต้น (start index): ถ้าเราอยู่หน้า 1: (1 - 1) * 3 = 0 (เริ่มที่ index 0), ถ้าเราอยู่หน้า 2: (2 - 1) * 3 = 3 (เริ่มที่ index 3), ถ้าเราอยู่หน้า 3: (3 - 1) * 3 = 6 (เริ่มที่ index 6) 
  return students.value.slice(start, start + pageStudentSize) // ดึงข้อมูลด้วย .slice(), .slice() จะคัดลอกส่วนของ array จาก index start ถึง start + pageStudentSize - 1 สำหรับ pageStudentSize = 3: หน้า 1: .slice(0, 3) → index 0, 1, 2 หน้า 2: .slice(3, 6) → index 3, 4, 5
})

const prveStudent = () => {
  if (currentStduentPage.value > 1) currentStduentPage.value-- // ถ้า หน้าปัจจุบัน > 1 , ให้กลับไปหน้าก่อนหน้า เช่น 2 = 2 - 1 = 1 
}

const nextStudent = () => {
  if (currentStduentPage.value < totalStudentPages.value) // ถ้า หน้าปัจจุบัน < หนัาทั้งหมด , ให้กลับไปหน้าต่อไป เช่น 3 < 6 ให้แสดงหน้าต่อไป 
    currentStduentPage.value++
}
/* Student End */
onMounted(fetchStudents) // มันคือ การสั่งให้ Vue.js เรียกฟังก์ชัน fetchStudents เมื่อหน้าเว็บโหลดเสร็จแล้ว

</script>
<template>
<div class="card bg-white shadow-lg p-4 rounded-lg mt-5">
        <div class="card-body">
          <h2 class="text-xl font-semibold mb-4">Feedback นักศึกษา</h2>
          <div class="overflow-x-auto rounded-box border border-base-content/5">
            <table class="table">
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>รหัสนักศึกษา</th>
                  <th>ชื่อ-นามสกุล</th>
                  <th>สาขาวิชา</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                <!-- Loading State -->
                <tr v-if="loading" class="text-center p-4">
                  <td colspan="5">กำลังโหลด...</td>
                </tr>

                <!-- Error State -->
                <tr v-if="error" class="text-center p-4 text-red-500">
                  <td colspan="5">{{ error }}</td>
                </tr>

                <!-- Empty State -->
                <tr v-if="!loading && !students.length" class="text-center p-4">
                  <td colspan="5">ไม่มีข้อมูลนักศึกษา</td>
                </tr>

                <!-- v-for วนลูปแสดงข้อมูลนักศึกษาเฉพาะหน้าที่เลือก (currentStduentPageItems) :key="student.id" สำหรับการระบุ identity แต่ละแถว -->
                <tr v-for="(student, index) in currentStduentPageItems" :key="student.id"> 
                  <td>
                    <!-- การคำนวณลำดับที่: (currentStduentPage - 1) * pageStudentSize + index + 1 -->
                    {{ (currentStduentPage - 1) * pageStudentSize + index + 1 }}
                  </td>
                  <td>{{ student.student_id_card }}</td>
                  <td>{{ student.first_name }} {{ student.last_name }}</td>
                  <td>{{ student.department?.department_name }}</td> 
                  <td>
                    <!-- เป็นลิงก์ไปหน้า Feedback ของนักศึกษาแต่ละคน ใช้ conditional operator (?:) เพื่อตรวจสอบว่า student.id มีค่าหรือไม่ ถ้ามี id จะสร้าง route ไปยังหน้า feedback โดยส่ง student.id เป็น parameter -->
                    <RouterLink :to="student.id
                      ? {
                        name: 'advisor-detail-feedback-view',
                        params: { id: student.id },
                      }
                      : '#'
                      " class="btn">Feedback</RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="join p-3">
              <button class="join-item btn" @click="prveStudent()" :disabled="currentStduentPage === 1">
                «
              </button>
              <button class="join-item btn">
                Page {{ currentStduentPage }} of {{ totalStudentPages }}
              </button>
              <button class="join-item btn" @click="nextStudent()" :disabled="currentStduentPage === totalStudentPages">
                »
              </button>
            </div>
          </div>
        </div>
      </div>
</template>