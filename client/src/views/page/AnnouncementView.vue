<template>
  <div class="announcement-container">
    <div class="announcement-header">
      <h1>Announcements</h1>
      <div class="announcement-actions">
        <button class="btn-primary" @click="createAnnouncement">Create Announcement</button>
        <button class="btn-secondary" @click="refreshData">Refresh</button>
      </div>
    </div>

    <div class="announcement-content">
      <!-- Announcement Statistics -->
      <div v-if="stats" class="announcement-stats">
        <h2>Overview</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">Total Announcements</span>
            <span class="stat-value">{{ stats.totalAnnouncements }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Active Announcements</span>
            <span class="stat-value">{{ stats.activeAnnouncements }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Upcoming Announcements</span>
            <span class="stat-value">{{ stats.upcomingAnnouncements }}</span>
          </div>
        </div>
      </div>

      <!-- Announcements List -->
      <div class="announcements-list">
        <div class="announcements-header">
          <h2>Recent Announcements</h2>
          <div class="filters">
            <select v-model="selectedType" class="filter-select">
              <option value="">All Types</option>
              <option v-for="type in Object.values(AnnouncementType)" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
            <select v-model="selectedPriority" class="filter-select">
              <option value="">All Priorities</option>
              <option v-for="priority in Object.values(Priority)" :key="priority" :value="priority">
                {{ priority }}
              </option>
            </select>
          </div>
        </div>

        <div class="announcements-grid">
          <div v-for="announcement in filteredAnnouncements" :key="announcement.id" 
               class="announcement-card" :class="getPriorityClass(announcement.priority)">
            <div class="announcement-header">
              <div class="announcement-type">{{ announcement.type }}</div>
              <div class="announcement-priority">{{ announcement.priority }}</div>
            </div>
            <h3 class="announcement-title">{{ announcement.title }}</h3>
            <p class="announcement-content">{{ announcement.content }}</p>
            <div class="announcement-meta">
              <div class="meta-item">
                <span class="meta-label">Author:</span>
                <span class="meta-value">{{ announcement.author.name }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Start Date:</span>
                <span class="meta-value">{{ formatDate(announcement.startDate) }}</span>
              </div>
              <div class="meta-item" v-if="announcement.endDate">
                <span class="meta-label">End Date:</span>
                <span class="meta-value">{{ formatDate(announcement.endDate) }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Audience:</span>
                <span class="meta-value">{{ announcement.targetAudience.join(', ') }}</span>
              </div>
            </div>
            <div class="announcement-actions">
              <button class="btn-edit" @click="editAnnouncement(announcement)">Edit</button>
              <button class="btn-delete" @click="deleteAnnouncement(announcement)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Announcement, AnnouncementStats, AnnouncementType, Priority } from '@/types/announcement'

const stats = ref<AnnouncementStats | null>(null)
const announcements = ref<Announcement[]>([])
const selectedType = ref<AnnouncementType | ''>('')
const selectedPriority = ref<Priority | ''>('')

const filteredAnnouncements = computed(() => {
  return announcements.value.filter(announcement => {
    const typeMatch = !selectedType.value || announcement.type === selectedType.value
    const priorityMatch = !selectedPriority.value || announcement.priority === selectedPriority.value
    return typeMatch && priorityMatch
  })
})

const createAnnouncement = () => {
  // TODO: Implement create announcement functionality
  console.log('Creating new announcement...')
}

const editAnnouncement = (announcement: Announcement) => {
  // TODO: Implement edit announcement functionality
  console.log('Editing announcement:', announcement.id)
}

const deleteAnnouncement = (announcement: Announcement) => {
  // TODO: Implement delete announcement functionality
  console.log('Deleting announcement:', announcement.id)
}

const refreshData = async () => {
  // TODO: Implement refresh functionality
  console.log('Refreshing data...')
}

const getPriorityClass = (priority: Priority): string => {
  const classes: Record<Priority, string> = {
    LOW: 'priority-low',
    MEDIUM: 'priority-medium',
    HIGH: 'priority-high',
    URGENT: 'priority-urgent'
  }
  return classes[priority]
}

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString()
}

onMounted(async () => {
  // TODO: Implement API calls to fetch announcements and stats
  console.log('Fetching announcements data...')
})
</script>

<style scoped>
.announcement-container {
  padding: 20px;
}

.announcement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.announcement-actions {
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

.announcement-stats {
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

.announcements-list {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.announcements-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 10px;
}

.filter-select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  background: white;
}

.announcements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.announcement-card {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 20px;
  transition: transform 0.2s;
}

.announcement-card:hover {
  transform: translateY(-2px);
}

.announcement-card.priority-low {
  border-left: 4px solid #10b981;
}

.announcement-card.priority-medium {
  border-left: 4px solid #f59e0b;
}

.announcement-card.priority-high {
  border-left: 4px solid #ef4444;
}

.announcement-card.priority-urgent {
  border-left: 4px solid #7c3aed;
}

.announcement-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.announcement-type, .announcement-priority {
  font-size: 0.8em;
  padding: 4px 8px;
  border-radius: 4px;
  background: #e5e7eb;
  color: #666;
}

.announcement-title {
  margin: 0 0 10px;
  font-size: 1.2em;
  color: #333;
}

.announcement-content {
  color: #666;
  margin-bottom: 15px;
}

.announcement-meta {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.9em;
  color: #666;
  margin-bottom: 15px;
}

.meta-item {
  display: flex;
  gap: 5px;
}

.meta-label {
  font-weight: 500;
}

.announcement-actions {
  display: flex;
  gap: 10px;
}

.btn-edit, .btn-delete {
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 0.9em;
  transition: all 0.2s;
}

.btn-edit {
  background-color: #3b82f6;
  color: white;
}

.btn-delete {
  background-color: #ef4444;
  color: white;
}
</style>
