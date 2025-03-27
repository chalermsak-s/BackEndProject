<script setup lang="ts">
import StudentProfile from '@/components/StudentProfile.vue';
import AnnouncementList from '@/components/AnnouncementList.vue';
import AppointmentList from '@/components/AppointmentList.vue';
import FeedbackStudentView from '@/components/FeedbackStudentView.vue';
</script>

<template>

  <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 m-4">
    <div class="lg:col-span-1">
      <StudentProfile />
    </div>
    <div class="lg:col-span-2">
      <AnnouncementList />
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 m-4">
    <div class="lg:col-span-1">
      <AppointmentList />
    </div>
    <div class="lg:col-span-1">
      <Suspense>
        <template #default>
          <FeedbackStudentView />
        </template>
        <template #fallback>
          <div>Loading feedback...</div>
        </template>
      </Suspense>
    </div>
  </div>

</template>