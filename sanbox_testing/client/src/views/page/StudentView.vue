<template>
  <div class="student-container">
    <div class="student-header">
      <h1>Student Dashboard</h1>
      <div class="student-actions">
        <button class="btn-primary" @click="refreshData">Refresh</button>
        <button class="btn-secondary" @click="downloadSchedule">Download Schedule</button>
      </div>
    </div>

    <div class="student-content">
      <!-- Academic Progress -->
      <div v-if="stats" class="academic-progress">
        <h2>Academic Progress</h2>
        <div class="progress-grid">
          <div class="progress-item">
            <span class="progress-label">Total Credits</span>
            <span class="progress-value">{{ stats.totalCredits }}</span>
          </div>
          <div class="progress-item">
            <span class="progress-label">Completed Credits</span>
            <span class="progress-value">{{ stats.completedCredits }}</span>
          </div>
          <div class="progress-item">
            <span class="progress-label">Remaining Credits</span>
            <span class="progress-value">{{ stats.remainingCredits }}</span>
          </div>
          <div class="progress-item">
            <span class="progress-label">Current GPA</span>
            <span class="progress-value">{{ stats.currentGPA.toFixed(2) }}</span>
          </div>
          <div class="progress-item">
            <span class="progress-label">Attendance Rate</span>
            <span class="progress-value">{{ stats.attendanceRate }}%</span>
          </div>
        </div>
      </div>

      <!-- Upcoming Events -->
      <div class="upcoming-events">
        <h2>Upcoming Events</h2>
        <div class="event-list">
          <div v-for="event in stats?.upcomingEvents" :key="event.id" class="event-item">
            <div class="event-icon" :class="getEventTypeClass(event.type)">
              {{ getEventIcon(event.type) }}
            </div>
            <div class="event-details">
              <h3 class="event-title">{{ event.title }}</h3>
              <p class="event-description">{{ event.description }}</p>
              <div class="event-meta">
                <span class="event-date">{{ formatDate(event.date) }}</span>
                <span v-if="event.location" class="event-location">📍 {{ event.location }}</span>
                <span v-if="event.isRequired" class="event-required">Required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { StudentDashboardStats, EventType } from '@/types/student'

const stats = ref<StudentDashboardStats | null>(null)

const refreshData = async () => {
  // TODO: Implement refresh functionality
  console.log('Refreshing data...')
}

const downloadSchedule = async () => {
  // TODO: Implement schedule download functionality
  console.log('Downloading schedule...')
}

const getEventTypeClass = (type: EventType): string => {
  const classes: Record<EventType, string> = {
    CLASS: 'bg-blue-100 text-blue-800',
    EXAM: 'bg-red-100 text-red-800',
    MEETING: 'bg-green-100 text-green-800',
    ASSIGNMENT: 'bg-yellow-100 text-yellow-800',
    OTHER: 'bg-gray-100 text-gray-800'
  }
  return classes[type]
}

const getEventIcon = (type: EventType): string => {
  const icons: Record<EventType, string> = {
    CLASS: '📚',
    EXAM: '✍️',
    MEETING: '👥',
    ASSIGNMENT: '📝',
    OTHER: '📌'
  }
  return icons[type]
}

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleString()
}

onMounted(async () => {
  // TODO: Implement API calls to fetch student dashboard data
  console.log('Fetching student dashboard data...')
})
</script>

<style scoped>
.student-container {
  padding: 20px;
}

.student-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.student-actions {
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

.academic-progress {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.progress-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.progress-item {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  text-align: center;
}

.progress-label {
  display: block;
  font-size: 0.9em;
  color: #666;
  margin-bottom: 5px;
}

.progress-value {
  display: block;
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
}

.upcoming-events {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.event-list {
  margin-top: 20px;
}

.event-item {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  border-bottom: 1px solid #e5e7eb;
}

.event-item:last-child {
  border-bottom: none;
}

.event-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 1.2em;
}

.event-details {
  flex: 1;
}

.event-title {
  margin: 0;
  font-size: 1.1em;
  color: #333;
}

.event-description {
  margin: 5px 0;
  color: #666;
}

.event-meta {
  display: flex;
  gap: 15px;
  font-size: 0.9em;
  color: #666;
}

.event-required {
  color: #dc2626;
  font-weight: 500;
}
</style> 