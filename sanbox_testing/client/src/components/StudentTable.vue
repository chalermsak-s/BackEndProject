<script setup lang="ts">
import StudentService from '@/services/StudentService'
import { ref, onMounted, computed } from 'vue'
import type { Student } from '@/types'

const students = ref<Student[]>([])

const loading = ref<boolean>(true) // Track loading state
const error = ref<string | null>(null) // Track any error that occurs
const searchQuery = ref<string>(""); // เพิ่มตัวแปรสำหรับค้นหา

/* Student Start */
const fetchStudents = async () => {
  try {
    const response = await StudentService.getStudentList()
    students.value = response.data
  } catch (err) {
    error.value =
      'Error fetching students: ' + (err instanceof Error ? err.message : err)
  } finally {
    loading.value = false
  }
}

// ฟังก์ชันกรองข้อมูลนักศึกษาตามค่าค้นหา
const filteredStudents = computed(() => {
  if (!searchQuery.value) return students.value;
  const query = searchQuery.value.toLowerCase();
  return students.value.filter(
    (student) =>
      student.student_id_card.includes(query) ||
      student.first_name.toLowerCase().includes(query) ||
      student.last_name.toLowerCase().includes(query)
  );
});

// Custom pagination Student
const currentStduentPage = ref(1)
const pageStudentSize = 3

const totalStudentPages = computed(() =>
  Math.ceil(filteredStudents.value.length / pageStudentSize)
)

const currentStduentPageItems = computed(() => {
  const start = (currentStduentPage.value - 1) * pageStudentSize
  return filteredStudents.value.slice(start, start + pageStudentSize)
})

const prveStudent = () => {
  if (currentStduentPage.value > 1) currentStduentPage.value--
}

const nextStudent = () => {
  if (currentStduentPage.value < totalStudentPages.value)
    currentStduentPage.value++
}
/* Student End */
onMounted(fetchStudents)
</script>
<template>
  <div class="card bg-white shadow-lg p-4 rounded-lg">
    <div class="card-body">
      <h2 class="text-xl font-semibold mb-4">ข้อมูลนักศึกษา</h2>
      <!-- ช่องค้นหา -->
      <div class="mb-4">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="ค้นหาด้วยชื่อ นามสกุล หรือรหัสนักศึกษา"
          class="input input-bordered w-full"
        />
      </div>
      
      <div class="overflow-x-auto rounded-box border border-base-content/5">
        <table class="table">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>รหัสนักศึกษา</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>สาขาวิชา</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <!-- Loading State -->
            <tr v-if="loading" class="text-center p-4">
              <td colspan="6">กำลังโหลด...</td>
            </tr>

            <!-- Error State -->
            <tr v-if="error" class="text-center p-4 text-red-500">
              <td colspan="6">{{ error }}</td>
            </tr>

            <!-- Empty State -->
            <tr v-if="!loading && !filteredStudents.length" class="text-center p-4">
              <td colspan="6">ไม่มีข้อมูลนักศึกษา</td>
            </tr>
            <tr v-for="(student, index) in currentStduentPageItems" :key="student.id">
              <td>
                {{ (currentStduentPage - 1) * pageStudentSize + index + 1 }}
              </td>
              <td>{{ student.student_id_card }}</td>
              <td class="whitespace-nowrap">{{ student.first_name }} </td>
              <td>{{ student.last_name }}</td>
              <td>{{ student.department?.department_name }}</td>
              <td>
                <RouterLink :to="student.id
                  ? {
                    name: 'admin-student-detail-view',
                    params: { id: student.id },
                  }
                  : '#'
                  " class="btn">ละเอียด</RouterLink>
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