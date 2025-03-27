<script setup lang="ts">
import AdvisorFeedbackTable from '@/components/AdvisorFeedbackTable.vue'
import AdvisorProfile from '@/components/AdvisorProfile.vue';
import AdvisorPost from '@/components/AdvisorPost.vue';
import AnnouncementAdvisorTable from '@/components/AnnouncementAdvisorTable.vue';
import AppointmentStatusAdvisor from '@/components/AppointmentStatusAdvisor.vue';
import AppointmentAdvisorTable from '@/components/AppointmentAdvisorTable.vue';
</script>
<template>
  <div class="container mx-auto p-4 m-5">
    <div class="flex flex-col md:flex-row gap-4">
      <!-- Profile Sidebar -->
      <AdvisorProfile/>
      <!-- Profile Content -->
      <div class="w-full md:w-2/3">
        <AdvisorPost/>
        <AnnouncementAdvisorTable />
        <AppointmentStatusAdvisor/>
        <AppointmentAdvisorTable/>
        <AdvisorFeedbackTable />
      </div>
    </div>
  </div>

</template>