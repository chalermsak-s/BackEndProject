<script setup lang="ts">
import StudentTable from '@/components/StudentTable.vue'
import AdvisorTable from '@/components/AdvisorTable.vue'
import AnnouncementTable from '@/components/AnnouncementTable.vue'
import AppointmentTable from '@/components/AppointmentTable.vue'
import FeedbackTable from '@/components/FeedbackTable.vue'
</script>
<template>
  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <!-- Student Table -->
      <StudentTable />

      <!-- Faculty Table -->
      <AdvisorTable />

      <!-- Appointment Table -->
      <AppointmentTable/>

      <!-- Announcement Table -->
      <AnnouncementTable />

      <!-- FeedbackTable -->
      <FeedbackTable/>

      <!-- AdminLog Table -->
      <div class="card bg-white shadow-lg p-4 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">ข้อมูลประวัติการใช้งาน</h2>
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
