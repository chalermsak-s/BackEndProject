<script setup lang="ts">
import StudentProfile from '@/components/StudentProfile.vue';
import AnnouncementList from '@/components/AnnouncementList.vue';
import AppointmentList from '@/components/AppointmentList.vue';
import FeedbackStudentView from '@/components/FeedbackStudentView.vue';
</script>

<template>
  <div class="container mx-auto p-4 m-5">
    <div class="flex flex-col md:flex-row gap-4">
      <!-- Profile Sidebar -->
      <StudentProfile />
      <!-- Profile Content -->
      <div class="w-full md:w-2/3 lg:w-3/4">
      <AnnouncementList />
      <AppointmentList />
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
  </div>
</template>