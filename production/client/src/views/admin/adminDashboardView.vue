<script setup lang="ts">
import StudentTable from '@/components/StudentTable.vue'
import AdvisorTable from '@/components/AdvisorTable.vue'
import AnnouncementTable from '@/components/AnnouncementTable.vue'
import AppointmentTable1Admin from '@/components/AppointmentTable1Admin.vue';
import AppointmentTable2Admin from '@/components/AppointmentTable2Admin.vue';
import AppointmentTable3Admin from '@/components/AppointmentTable3Admin.vue';
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

      <!-- Appointment Table All-->
      <AppointmentTable />

      <!-- Appointment Table Status 1-->
      <AppointmentTable1Admin />

      <!-- Appointment Table Status 2-->
      <AppointmentTable2Admin />

      <!-- Appointment Table Status 3-->
      <AppointmentTable3Admin />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mt-5">
      <!-- Announcement Table -->
      <AnnouncementTable />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mt-5">
      <!-- FeedbackTable -->
      <FeedbackTable />
    </div>
  </div>
</template>
