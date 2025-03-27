<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import StudentProfile from '@/components/StudentProfile.vue';
import AnnouncementList from '@/components/AnnouncementList.vue';
import AppointmentList from '@/components/AppointmentList.vue';
import FeedbackStudentView from '@/components/FeedbackStudentView.vue';
import StudentService from '@/services/StudentService';

const advisorId = ref<number | null>(null);
const statusAdvisor = ref<boolean>(false);
let fetchInterval: number | null = null; // ใช้เก็บตัว interval

const fetchStudentAdvisor = async () => {
  try {
    const newAdvisorId = await StudentService.getAdvisorIdByUserId(); // ดึงข้อมูลใหม่
    statusAdvisor.value = newAdvisorId !== null;
    
    // เช็คว่า advisorId เปลี่ยนแปลงหรือไม่
    if (newAdvisorId !== advisorId.value) {
      console.log(`Advisor ID changed from ${advisorId.value} to ${newAdvisorId}`);
      advisorId.value = newAdvisorId;
    }
  } catch (error) {
    advisorId.value = null;
    statusAdvisor.value = false;
    console.error('Error fetching advisor:', error instanceof Error ? error.message : error);
  }
};

onMounted(() => {
  fetchStudentAdvisor(); // โหลดข้อมูลครั้งแรก

  // ตั้งค่า interval ให้ดึงข้อมูลใหม่ทุก 10 วินาที
  fetchInterval = setInterval(fetchStudentAdvisor, 10000);
});

onUnmounted(() => {
  // ลบ interval เมื่อออกจากหน้าจอเพื่อป้องกันการโหลดซ้ำเกินจำเป็น
  if (fetchInterval) {
    clearInterval(fetchInterval);
  }
});

// Watch การเปลี่ยนแปลงของ statusAdvisor
watch(statusAdvisor, (newValue, oldValue) => {
  console.log(`statusAdvisor changed from ${oldValue} to ${newValue}`);
});
</script>


<template>
  <div class="container mx-auto p-4 m-5">
    <div class="flex flex-col md:flex-row gap-4">
      <!-- Profile Sidebar -->
      <StudentProfile />
      <!-- Profile Content -->
      <div class="w-full md:w-2/3 lg:w-3/4">
        <AnnouncementList v-if="statusAdvisor" />
        <AppointmentList v-if="statusAdvisor" />
        <Suspense v-if="statusAdvisor">
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
