<template>
  <div class="feedback-container">
    <div class="feedback-header">
      <h1>Feedback Management</h1>
      <div class="feedback-actions">
        <button class="btn-primary" @click="createFeedback">New Feedback</button>
        <button class="btn-secondary" @click="refreshData">Refresh</button>
      </div>
    </div>

    <div class="feedback-content">
      <!-- Feedback Statistics -->
      <div v-if="stats" class="feedback-stats">
        <h2>Overview</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">Total Feedback</span>
            <span class="stat-value">{{ stats.totalFeedback }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Average Rating</span>
            <span class="stat-value">{{ formatRating(stats.averageRating) }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Response Rate</span>
            <span class="stat-value">{{ formatPercentage(stats.responseRate) }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Resolution Time</span>
            <span class="stat-value">{{ formatDuration(stats.resolutionTime) }}</span>
          </div>
        </div>

        <!-- Feedback Distribution -->
        <div class="feedback-distribution">
          <div class="distribution-section">
            <h3>By Type</h3>
            <div class="distribution-bars">
              <div v-for="(count, type) in stats.feedbackByType" 
                   :key="type" 
                   class="distribution-bar-item">
                <div class="bar-label">{{ type }}</div>
                <div class="bar">
                  <div class="bar-fill" 
                       :style="{ width: `${(count / stats.totalFeedback) * 100}%` }"
                       :class="getTypeClass(type)">
                  </div>
                </div>
                <div class="bar-count">{{ count }}</div>
              </div>
            </div>
          </div>

          <div class="distribution-section">
            <h3>By Status</h3>
            <div class="distribution-bars">
              <div v-for="(count, status) in stats.feedbackByStatus" 
                   :key="status" 
                   class="distribution-bar-item">
                <div class="bar-label">{{ status }}</div>
                <div class="bar">
                  <div class="bar-fill" 
                       :style="{ width: `${(count / stats.totalFeedback) * 100}%` }"
                       :class="getStatusClass(status)">
                  </div>
                </div>
                <div class="bar-count">{{ count }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feedback List -->
      <div class="feedback-list">
        <div class="feedback-header">
          <h2>Feedback Items</h2>
          <div class="filters">
            <select v-model="selectedType" class="filter-select">
              <option value="">All Types</option>
              <option v-for="type in Object.values(FeedbackType)" 
                      :key="type" 
                      :value="type">
                {{ type }}
              </option>
            </select>
            <select v-model="selectedStatus" class="filter-select">
              <option value="">All Statuses</option>
              <option v-for="status in Object.values(FeedbackStatus)" 
                      :key="status" 
                      :value="status">
                {{ status }}
              </option>
            </select>
            <select v-model="selectedPriority" class="filter-select">
              <option value="">All Priorities</option>
              <option v-for="priority in Object.values(FeedbackPriority)" 
                      :key="priority" 
                      :value="priority">
                {{ priority }}
              </option>
            </select>
            <input type="text" 
                   v-model="searchQuery" 
                   placeholder="Search feedback..." 
                   class="search-input">
          </div>
        </div>

        <div class="feedback-grid">
          <div v-for="feedback in filteredFeedback" 
               :key="feedback.id" 
               class="feedback-card"
               :class="[getStatusClass(feedback.status), getPriorityClass(feedback.priority)]">
            <div class="feedback-header">
              <div class="feedback-type">{{ feedback.type }}</div>
              <div class="feedback-status">{{ feedback.status }}</div>
            </div>
            <div class="feedback-priority">{{ feedback.priority }}</div>
            <h3 class="feedback-title">{{ feedback.title }}</h3>
            <p class="feedback-description">{{ feedback.description }}</p>
            <div v-if="feedback.rating" class="feedback-rating">
              <span class="rating-label">Rating:</span>
              <span class="rating-value">{{ formatRating(feedback.rating) }}</span>
            </div>
            <div class="feedback-meta">
              <div class="meta-item">
                <span class="meta-label">Created:</span>
                <span class="meta-value">{{ formatDate(feedback.createdAt) }}</span>
              </div>
              <div v-if="feedback.resolvedAt" class="meta-item">
                <span class="meta-label">Resolved:</span>
                <span class="meta-value">{{ formatDate(feedback.resolvedAt) }}</span>
              </div>
            </div>
            <div class="feedback-actions">
              <button class="btn-edit" @click="editFeedback(feedback)">Edit</button>
              <button class="btn-delete" @click="deleteFeedback(feedback)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Feedback, FeedbackStats, FeedbackType, FeedbackStatus, FeedbackPriority } from '@/types/feedback'

const stats = ref<FeedbackStats | null>(null)
const feedback = ref<Feedback[]>([])
const selectedType = ref<FeedbackType | ''>('')
const selectedStatus = ref<FeedbackStatus | ''>('')
const selectedPriority = ref<FeedbackPriority | ''>('')
const searchQuery = ref('')

const filteredFeedback = computed(() => {
  return feedback.value.filter(item => {
    const typeMatch = !selectedType.value || item.type === selectedType.value
    const statusMatch = !selectedStatus.value || item.status === selectedStatus.value
    const priorityMatch = !selectedPriority.value || item.priority === selectedPriority.value
    const searchMatch = !searchQuery.value || 
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    return typeMatch && statusMatch && priorityMatch && searchMatch
  })
})

const createFeedback = () => {
  // TODO: Implement create feedback functionality
  console.log('Creating new feedback...')
}

const editFeedback = (feedback: Feedback) => {
  // TODO: Implement edit feedback functionality
  console.log('Editing feedback:', feedback.id)
}

const deleteFeedback = (feedback: Feedback) => {
  // TODO: Implement delete feedback functionality
  console.log('Deleting feedback:', feedback.id)
}

const refreshData = async () => {
  // TODO: Implement refresh functionality
  console.log('Refreshing data...')
}

const getTypeClass = (type: FeedbackType): string => {
  const classes: Record<FeedbackType, string> = {
    APPOINTMENT: 'type-appointment',
    COURSE: 'type-course',
    ADVISOR: 'type-advisor',
    SYSTEM: 'type-system',
    OTHER: 'type-other'
  }
  return classes[type]
}

const getStatusClass = (status: FeedbackStatus): string => {
  const classes: Record<FeedbackStatus, string> = {
    PENDING: 'status-pending',
    REVIEWED: 'status-reviewed',
    RESOLVED: 'status-resolved',
    CLOSED: 'status-closed'
  }
  return classes[status]
}

const getPriorityClass = (priority: FeedbackPriority): string => {
  const classes: Record<FeedbackPriority, string> = {
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

const formatRating = (rating: number): string => {
  return rating.toFixed(1)
}

const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`
}

const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`
  } else if (minutes < 1440) {
    return `${Math.floor(minutes / 60)}h`
  } else {
    return `${Math.floor(minutes / 1440)}d`
  }
}

onMounted(async () => {
  // TODO: Implement API calls to fetch feedback and stats
  console.log('Fetching feedback data...')
})
</script>

<style scoped>
.feedback-container {
  padding: 20px;
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.feedback-actions {
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

.feedback-stats {
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

.feedback-distribution {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.distribution-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 6px;
}

.distribution-bars {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}

.distribution-bar-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bar-label {
  width: 100px;
  font-size: 0.9em;
  color: #666;
}

.bar {
  flex: 1;
  height: 20px;
  background: #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.bar-count {
  width: 40px;
  text-align: right;
  font-size: 0.9em;
  color: #666;
}

/* Type Classes */
.type-appointment { background-color: #3b82f6; }
.type-course { background-color: #10b981; }
.type-advisor { background-color: #f59e0b; }
.type-system { background-color: #8b5cf6; }
.type-other { background-color: #6b7280; }

/* Status Classes */
.status-pending { border-left-color: #f59e0b; }
.status-reviewed { border-left-color: #3b82f6; }
.status-resolved { border-left-color: #10b981; }
.status-closed { border-left-color: #6b7280; }

/* Priority Classes */
.priority-low { border-top: 2px solid #10b981; }
.priority-medium { border-top: 2px solid #f59e0b; }
.priority-high { border-top: 2px solid #ef4444; }
.priority-urgent { border-top: 2px solid #7c3aed; }

.feedback-list {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.feedback-header {
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

.search-input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  min-width: 200px;
}

.feedback-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.feedback-card {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 20px;
  transition: transform 0.2s;
  border-left: 4px solid transparent;
}

.feedback-card:hover {
  transform: translateY(-2px);
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.feedback-type, .feedback-status {
  font-size: 0.8em;
  padding: 4px 8px;
  border-radius: 4px;
  background: #e5e7eb;
  color: #666;
}

.feedback-priority {
  display: inline-block;
  font-size: 0.8em;
  padding: 4px 8px;
  border-radius: 4px;
  background: #e5e7eb;
  color: #666;
  margin-bottom: 10px;
}

.feedback-title {
  margin: 0 0 10px;
  font-size: 1.2em;
  color: #333;
}

.feedback-description {
  color: #666;
  margin-bottom: 15px;
}

.feedback-rating {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 15px;
  font-size: 0.9em;
  color: #666;
}

.rating-label {
  font-weight: 500;
}

.feedback-meta {
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

.feedback-actions {
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