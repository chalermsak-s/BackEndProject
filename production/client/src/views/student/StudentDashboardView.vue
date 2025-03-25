<script setup lang="ts">
import StudentProfile from '@/components/StudentProfile.vue';
// import AnnouncementTable from '@/components/AnnouncementTable.vue';
import AnnouncementList from '@/components/AnnouncementList.vue';
import AppointmentList from '@/components/AppointmentList.vue';
</script>

<template>
  <div class="p-6">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
    <StudentProfile />

    <AnnouncementList />

    <AppointmentList />
    </div>
  </div>
</template>