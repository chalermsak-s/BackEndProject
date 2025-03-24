<script setup lang="ts">
import StudentService from '@/services/StudentService'
import AdvisorService from '@/services/AdvisorService'
import { ref, onMounted } from 'vue'
import type { Student, Advisor } from '@/types'

const students = ref<Student[]>([])
const advisors = ref<Advisor[]>([])
const loading = ref<boolean>(true) // Track loading state
const error = ref<string | null>(null) // Track any error that occurs

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

const fetchAdvisors = async () => {
  try {
    const response = await AdvisorService.getAdvisors()
    advisors.value = response.data
  } catch (err) {
    error.value =
      'Error fetching advisors: ' + (err instanceof Error ? err.message : err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchStudents)
onMounted(fetchAdvisors)
</script>
<template>
  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <!-- Student Table -->
      <div class="card bg-white shadow-lg p-4 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">ตารางนักศึกษา</h2>
        <table class="table w-full">
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
            <tr v-for="(student, index) in students" :key="student.id">
              <td>{{ index + 1 }}</td>
              <td>{{ student.student_id_card }}</td>
              <td>{{ student.first_name }} {{ student.first_name }}</td>
              <td>{{ student.department?.department_name }}</td>
              <td><a class="btn" href="">ละเอียด</a></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Faculty Table -->
      <div class="card bg-white shadow-lg p-4 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">ตารางอาจารย์</h2>
        <table class="table w-full">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>ชื่อ-นามสกุล</th>
              <th>ภาควิชา</th>
              <th>ตำแหน่ง</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(advisor, index) in advisors" :key="advisor.id">
              <td>{{ index+1 }}</td>
              <td>{{ advisor.first_name }} {{ advisor.last_name }}</td>
              <td>{{ advisor.department?.department_name }}</td>
              <td>{{ advisor.academic_position?.academic_position_name }}</td>
              <td><a class="btn" href="">ละเอียด</a></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Appointment Table -->
      <div class="card bg-white shadow-lg p-4 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">ตารางนัดหมาย</h2>
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Student</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-03-24</td>
              <td>10:00 AM</td>
              <td>John Doe</td>
              <td>Mathematics</td>
            </tr>
            <tr>
              <td>2025-03-25</td>
              <td>2:00 PM</td>
              <td>Jane Smith</td>
              <td>Computer Science</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- News Table -->
      <div class="card bg-white shadow-lg p-4 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">ตารางข่าวสาร</h2>
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-03-24</td>
              <td>New Semester Announcement</td>
              <td>Details about the new semester schedule.</td>
            </tr>
            <tr>
              <td>2025-03-23</td>
              <td>University Event</td>
              <td>Upcoming event details and invitation.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Log Table -->
      <div class="card bg-white shadow-lg p-4 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">ตารางคอมเมนต์</h2>
        <div class=""></div>
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-03-24</td>
              <td>New Semester Announcement</td>
              <td>Details about the new semester schedule.</td>
            </tr>
            <tr>
              <td>2025-03-23</td>
              <td>University Event</td>
              <td>Upcoming event details and invitation.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Log Table -->
      <div class="card bg-white shadow-lg p-4 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">ตารางประวัติการใช้งาน</h2>
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2025-03-24</td>
                <td>New Semester Announcement</td>
                <td>Details about the new semester schedule.</td>
              </tr>
              <tr>
                <td>2025-03-23</td>
                <td>University Event</td>
                <td>Upcoming event details and invitation.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
