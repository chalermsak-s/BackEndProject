<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Advisor } from '@/types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import AdvisorService from '@/services/AdvisorService';

library.add(faUserCircle, faChevronLeft, faChevronRight);

const advisors = ref<Advisor[]>([]);
const loading = ref<boolean>(true); // Track loading state
const error = ref<string | null>(null); // Track any error that occurs

const fetchAdvisors = async () => {
  try {
    const response = await AdvisorService.getAdvisors();
    advisors.value = response.data;
  } catch (err) {
    error.value = 'Error fetching advisors: ' + (err instanceof Error ? err.message : err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchAdvisors);
</script>

<template>
  <div class="max-w-xl mx-auto mt-10">
    <ul class="list bg-base-100 rounded-box shadow-md">
      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">รายชื่ออาจารย์</li>
      
      <!-- Loading State -->
      <li v-if="loading" class="text-center p-4">กำลังโหลด...</li>
      
      <!-- Error State -->
      <li v-if="error" class="text-center p-4 text-red-500">{{ error }}</li>

      <!-- Empty State -->
      <li v-if="!loading && !advisors.length" class="text-center p-4">ไม่มีข้อมูลอาจารย์</li>

      <!-- Advisors List -->
      <li v-for="advisor in advisors" :key="advisor.id" class="list-row">
        <div>
          <font-awesome-icon
            class="rounded-box fa-2x opacity-80"
            :icon="['far', 'circle-user']"
          />
        </div>
        <div>
          <div>{{ advisor.first_name }} {{ advisor.last_name }}</div>
          <div class="text-xs uppercase font-semibold opacity-60">
            {{ advisor.academic_position?.academic_position_name || 'ไม่มีตำแหน่ง' }}
          </div>
          <div class="text-xs uppercase font-semibold opacity-60">
            {{ advisor.department?.department_name || 'ไม่มีแผนก' }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
