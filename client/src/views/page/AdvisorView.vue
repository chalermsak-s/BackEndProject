<template>
  <div class="advisor-container">
    <h1>Advisor Dashboard</h1>
    <div class="advisor-content">
      <div v-if="advisor" class="advisor-info">
        <h2>{{ advisor.name }}</h2>
        <p>Department: {{ advisor.department }}</p>
        <p>Position: {{ advisor.position }}</p>
        <p>Email: {{ advisor.email }}</p>
        <p>Phone: {{ advisor.phoneNumber }}</p>
      </div>
      <div v-if="stats" class="dashboard-stats">
        <h3>Student Statistics</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">Total Students</span>
            <span class="stat-value">{{ stats.totalStudents }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Active Students</span>
            <span class="stat-value">{{ stats.activeStudents }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Inactive Students</span>
            <span class="stat-value">{{ stats.inactiveStudents }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Graduated</span>
            <span class="stat-value">{{ stats.graduatedStudents }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">On Leave</span>
            <span class="stat-value">{{ stats.studentsOnLeave }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Advisor, AdvisorDashboardStats } from '@/types/advisor'

const advisor = ref<Advisor | null>(null)
const stats = ref<AdvisorDashboardStats | null>(null)

onMounted(async () => {
  // TODO: Implement API calls to fetch advisor and stats data
  // This is where you'll make your actual API calls
})
</script>

<style scoped>
.advisor-container {
  padding: 20px;
}

.advisor-content {
  margin-top: 20px;
}

.advisor-info {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.dashboard-stats {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-item {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.9em;
  color: #666;
  margin-bottom: 5px;
}

.stat-value {
  display: block;
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
}
</style> 