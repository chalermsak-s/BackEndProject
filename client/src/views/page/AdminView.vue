<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1>Admin Dashboard</h1>
      <div class="admin-actions">
        <button class="btn-primary" @click="refreshData">Refresh</button>
        <button class="btn-secondary" @click="exportData">Export Data</button>
      </div>
    </div>

    <div class="admin-content">
      <!-- Stats Overview -->
      <div v-if="stats" class="dashboard-stats">
        <h2>System Overview</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">Total Users</span>
            <span class="stat-value">{{ stats.totalUsers }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Total Advisors</span>
            <span class="stat-value">{{ stats.totalAdvisors }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Total Students</span>
            <span class="stat-value">{{ stats.totalStudents }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Active Users</span>
            <span class="stat-value">{{ stats.activeUsers }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Inactive Users</span>
            <span class="stat-value">{{ stats.inactiveUsers }}</span>
          </div>
        </div>
      </div>

      <!-- Recent Activities -->
      <div class="recent-activities">
        <h2>Recent Activities</h2>
        <div class="activity-list">
          <div v-for="activity in stats?.recentActivities" :key="activity.id" class="activity-item">
            <div class="activity-icon" :class="getActivityTypeClass(activity.type)">
              {{ getActivityIcon(activity.type) }}
            </div>
            <div class="activity-details">
              <p class="activity-description">{{ activity.description }}</p>
              <p class="activity-meta">
                By {{ activity.userName }} • {{ formatDate(activity.timestamp) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { AdminDashboardStats, ActivityType } from '@/types/admin'

const stats = ref<AdminDashboardStats | null>(null)

const refreshData = async () => {
  // TODO: Implement refresh functionality
  console.log('Refreshing data...')
}

const exportData = async () => {
  // TODO: Implement export functionality
  console.log('Exporting data...')
}

const getActivityTypeClass = (type: ActivityType): string => {
  const classes: Record<ActivityType, string> = {
    USER_CREATED: 'bg-green-100 text-green-800',
    USER_UPDATED: 'bg-blue-100 text-blue-800',
    USER_DELETED: 'bg-red-100 text-red-800',
    SYSTEM_CONFIG_UPDATED: 'bg-purple-100 text-purple-800',
    LOGIN: 'bg-yellow-100 text-yellow-800',
    LOGOUT: 'bg-gray-100 text-gray-800'
  }
  return classes[type]
}

const getActivityIcon = (type: ActivityType): string => {
  const icons: Record<ActivityType, string> = {
    USER_CREATED: '➕',
    USER_UPDATED: '✏️',
    USER_DELETED: '🗑️',
    SYSTEM_CONFIG_UPDATED: '⚙️',
    LOGIN: '🔑',
    LOGOUT: '🚪'
  }
  return icons[type]
}

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleString()
}

onMounted(async () => {
  // TODO: Implement API calls to fetch admin dashboard data
  console.log('Fetching admin dashboard data...')
})
</script>

<style scoped>
.admin-container {
  padding: 20px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.admin-actions {
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

.dashboard-stats {
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

.recent-activities {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.activity-list {
  margin-top: 20px;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  border-bottom: 1px solid #e5e7eb;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 1.2em;
}

.activity-details {
  flex: 1;
}

.activity-description {
  margin: 0;
  color: #333;
}

.activity-meta {
  margin: 5px 0 0;
  font-size: 0.9em;
  color: #666;
}
</style> 