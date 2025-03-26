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
      <AppointmentTable />

      <!-- Announcement Table -->
      <AnnouncementTable />

    </div>
    <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mt-5">
      <!-- FeedbackTable -->
      <FeedbackTable />
    </div>
  </div>
</template>
