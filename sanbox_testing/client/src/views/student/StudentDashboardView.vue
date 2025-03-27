<script setup lang="ts">
import { ref, onMounted } from 'vue';
import StudentProfile from '@/components/StudentProfile.vue';
import AnnouncementList from '@/components/AnnouncementList.vue';
import AppointmentList from '@/components/AppointmentList.vue';
import FeedbackStudentView from '@/components/FeedbackStudentView.vue';
import StudentService from '@/services/StudentService';

const advisorId = ref<number | null>(null); // Explicitly typed as number or null

const fetchStudentAdvisor = async () => {
  try {
    advisorId.value = await StudentService.getAdvisorIdByUserId(); // Fetch advisor ID
  } catch (error) {
    advisorId.value = null; // Set to null on error
    console.error('Error fetching advisor:', error instanceof Error ? error.message : error);
  }
};

onMounted(fetchStudentAdvisor);
</script>

<template>
  <h1>ค่า advisorID{{ advisorId }}</h1>
  <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 m-4">
    <div class="lg:col-span-1">
      <StudentProfile />
    </div>

    <!-- Check if advisorId is not null -->
    <div v-if="advisorId != null" class="lg:col-span-2">
      <AnnouncementList />
    </div>
  </div>

  <div v-if="advisorId != null" class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 m-4">
    <div class="lg:col-span-1">
      <AppointmentList />
    </div>
    <div v-if="advisorId != null" class="lg:col-span-1">
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