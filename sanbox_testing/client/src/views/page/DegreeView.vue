<template>
  <div class="degree-container">
    <div class="degree-header">
      <h1>Degree Programs</h1>
      <div class="degree-actions">
        <button class="btn-primary" @click="refreshData">Refresh</button>
        <button class="btn-secondary" @click="exportPrograms">Export Programs</button>
      </div>
    </div>

    <div class="degree-content">
      <!-- Degree Statistics -->
      <div v-if="stats" class="degree-stats">
        <h2>Program Overview</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">Total Programs</span>
            <span class="stat-value">{{ stats.totalPrograms }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Total Students</span>
            <span class="stat-value">{{ stats.totalStudents }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Average Duration</span>
            <span class="stat-value">{{ stats.averageDuration }} years</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Completion Rate</span>
            <span class="stat-value">{{ stats.completionRate }}%</span>
          </div>
        </div>
      </div>

      <!-- Popular Majors -->
      <div class="popular-majors">
        <h2>Popular Majors</h2>
        <div class="majors-list">
          <div v-for="major in stats?.popularMajors" :key="major.name" class="major-item">
            <div class="major-info">
              <span class="major-name">{{ major.name }}</span>
              <span class="major-count">{{ major.studentCount }} students</span>
            </div>
            <div class="major-progress">
              <div class="progress-bar">
                <div 
                  class="progress-fill"
                  :style="{ width: `${(major.studentCount / stats.totalStudents) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Degree Programs List -->
      <div class="programs-list">
        <h2>Available Programs</h2>
        <div class="programs-grid">
          <div v-for="program in programs" :key="program.id" class="program-card">
            <div class="program-header">
              <h3>{{ program.name }}</h3>
              <span class="program-code">{{ program.code }}</span>
            </div>
            <div class="program-details">
              <p class="program-description">{{ program.description }}</p>
              <div class="program-meta">
                <span>Department: {{ program.department }}</span>
                <span>Credits: {{ program.totalCredits }}</span>
                <span>Duration: {{ program.duration }} years</span>
              </div>
            </div>
            <div class="program-requirements">
              <h4>Requirements</h4>
              <ul>
                <li v-for="req in program.requirements" :key="req.id">
                  {{ req.type }}: {{ req.credits }} credits
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Degree, DegreeStats } from '@/types/degree'

const stats = ref<DegreeStats | null>(null)
const programs = ref<Degree[]>([])

const refreshData = async () => {
  // TODO: Implement refresh functionality
  console.log('Refreshing data...')
}

const exportPrograms = async () => {
  // TODO: Implement export functionality
  console.log('Exporting programs...')
}

onMounted(async () => {
  // TODO: Implement API calls to fetch degree programs and stats
  console.log('Fetching degree programs data...')
})
</script>

<style scoped>
.degree-container {
  padding: 20px;
}

.degree-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.degree-actions {
  display: flex;
  gap: 10px;
}

.btn-primary, .btn-secondary {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #4f46e5;
  color: white;
}

.btn-secondary {
  background-color: #e5e7eb;
  color: #374151;
}

.degree-stats {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 30px;
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

.popular-majors {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.majors-list {
  margin-top: 20px;
}

.major-item {
  margin-bottom: 15px;
}

.major-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.major-name {
  font-weight: 500;
  color: #333;
}

.major-count {
  color: #666;
}

.major-progress {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #e5e7eb;
}

.progress-fill {
  height: 100%;
  background: #4f46e5;
  transition: width 0.3s ease;
}

.programs-list {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.program-card {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 20px;
  transition: transform 0.2s;
}

.program-card:hover {
  transform: translateY(-2px);
}

.program-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.program-code {
  background: #e5e7eb;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  color: #666;
}

.program-description {
  color: #666;
  margin-bottom: 15px;
}

.program-meta {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.9em;
  color: #666;
  margin-bottom: 15px;
}

.program-requirements h4 {
  margin-bottom: 10px;
  color: #333;
}

.program-requirements ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.program-requirements li {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 5px;
}
</style> 