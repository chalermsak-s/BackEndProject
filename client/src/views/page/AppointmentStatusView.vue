<template>
  <div class="appointment-status-container">
    <div class="appointment-status-header">
      <h1>Appointment Status</h1>
      <div class="appointment-status-actions">
        <button class="btn-primary" @click="createAppointment">New Appointment</button>
        <button class="btn-secondary" @click="refreshData">Refresh</button>
      </div>
    </div>

    <div class="appointment-status-content">
      <!-- Appointment Statistics -->
      <div v-if="stats" class="appointment-stats">
        <h2>Overview</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">Total Appointments</span>
            <span class="stat-value">{{ stats.totalAppointments }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Upcoming</span>
            <span class="stat-value">{{ stats.upcomingAppointments }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Completed</span>
            <span class="stat-value">{{ stats.completedAppointments }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Cancellation Rate</span>
            <span class="stat-value">{{ formatPercentage(stats.cancellationRate) }}</span>
          </div>
        </div>

        <!-- Status Distribution -->
        <div class="status-distribution">
          <h3>Status Distribution</h3>
          <div class="status-bars">
            <div v-for="(count, status) in stats.appointmentsByStatus" 
                 :key="status" 
                 class="status-bar-item">
              <div class="status-label">{{ status }}</div>
              <div class="status-bar">
                <div class="status-bar-fill" 
                     :style="{ width: `${(count / stats.totalAppointments) * 100}%` }"
                     :class="getStatusClass(status)">
                </div>
              </div>
              <div class="status-count">{{ count }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Appointments List -->
      <div class="appointments-list">
        <div class="appointments-header">
          <h2>Appointments</h2>
          <div class="filters">
            <select v-model="selectedStatus" class="filter-select">
              <option value="">All Statuses</option>
              <option v-for="status in Object.values(AppointmentStatus)" 
                      :key="status" 
                      :value="status">
                {{ status }}
              </option>
            </select>
            <select v-model="selectedType" class="filter-select">
              <option value="">All Types</option>
              <option v-for="type in Object.values(AppointmentType)" 
                      :key="type" 
                      :value="type">
                {{ type }}
              </option>
            </select>
            <input type="text" 
                   v-model="searchQuery" 
                   placeholder="Search appointments..." 
                   class="search-input">
          </div>
        </div>

        <div class="appointments-grid">
          <div v-for="appointment in filteredAppointments" 
               :key="appointment.id" 
               class="appointment-card"
               :class="getStatusClass(appointment.status)">
            <div class="appointment-header">
              <div class="appointment-type">{{ appointment.type }}</div>
              <div class="appointment-status">{{ appointment.status }}</div>
            </div>
            <h3 class="appointment-title">{{ appointment.title }}</h3>
            <p class="appointment-description">{{ appointment.description }}</p>
            <div class="appointment-meta">
              <div class="meta-item">
                <span class="meta-label">Date:</span>
                <span class="meta-value">{{ formatDate(appointment.startTime) }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Time:</span>
                <span class="meta-value">{{ formatTime(appointment.startTime) }} - {{ formatTime(appointment.endTime) }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Location:</span>
                <span class="meta-value">{{ appointment.location }}</span>
              </div>
            </div>
            <div class="appointment-actions">
              <button class="btn-edit" @click="editAppointment(appointment)">Edit</button>
              <button class="btn-delete" @click="deleteAppointment(appointment)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Appointment, AppointmentStats, AppointmentStatus, AppointmentType } from '@/types/appointment'

const stats = ref<AppointmentStats | null>(null)
const appointments = ref<Appointment[]>([])
const selectedStatus = ref<AppointmentStatus | ''>('')
const selectedType = ref<AppointmentType | ''>('')
const searchQuery = ref('')

const filteredAppointments = computed(() => {
  return appointments.value.filter(appointment => {
    const statusMatch = !selectedStatus.value || appointment.status === selectedStatus.value
    const typeMatch = !selectedType.value || appointment.type === selectedType.value
    const searchMatch = !searchQuery.value || 
      appointment.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      appointment.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    return statusMatch && typeMatch && searchMatch
  })
})

const createAppointment = () => {
  // TODO: Implement create appointment functionality
  console.log('Creating new appointment...')
}

const editAppointment = (appointment: Appointment) => {
  // TODO: Implement edit appointment functionality
  console.log('Editing appointment:', appointment.id)
}

const deleteAppointment = (appointment: Appointment) => {
  // TODO: Implement delete appointment functionality
  console.log('Deleting appointment:', appointment.id)
}

const refreshData = async () => {
  // TODO: Implement refresh functionality
  console.log('Refreshing data...')
}

const getStatusClass = (status: AppointmentStatus): string => {
  const classes: Record<AppointmentStatus, string> = {
    PENDING: 'status-pending',
    CONFIRMED: 'status-confirmed',
    CANCELLED: 'status-cancelled',
    COMPLETED: 'status-completed',
    NO_SHOW: 'status-no-show'
  }
  return classes[status]
}

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString()
}

const formatTime = (date: Date): string => {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`
}

onMounted(async () => {
  // TODO: Implement API calls to fetch appointments and stats
  console.log('Fetching appointments data...')
})
</script>

<style scoped>
.appointment-status-container {
  padding: 20px;
}

.appointment-status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.appointment-status-actions {
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

.appointment-stats {
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

.status-distribution {
  margin-top: 30px;
}

.status-bars {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}

.status-bar-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-label {
  width: 100px;
  font-size: 0.9em;
  color: #666;
}

.status-bar {
  flex: 1;
  height: 20px;
  background: #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
}

.status-bar-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.status-count {
  width: 40px;
  text-align: right;
  font-size: 0.9em;
  color: #666;
}

.status-pending {
  background-color: #f59e0b;
}

.status-confirmed {
  background-color: #10b981;
}

.status-cancelled {
  background-color: #ef4444;
}

.status-completed {
  background-color: #3b82f6;
}

.status-no-show {
  background-color: #6b7280;
}

.appointments-list {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.appointments-header {
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

.appointments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.appointment-card {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 20px;
  transition: transform 0.2s;
  border-left: 4px solid transparent;
}

.appointment-card:hover {
  transform: translateY(-2px);
}

.appointment-card.status-pending {
  border-left-color: #f59e0b;
}

.appointment-card.status-confirmed {
  border-left-color: #10b981;
}

.appointment-card.status-cancelled {
  border-left-color: #ef4444;
}

.appointment-card.status-completed {
  border-left-color: #3b82f6;
}

.appointment-card.status-no-show {
  border-left-color: #6b7280;
}

.appointment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.appointment-type, .appointment-status {
  font-size: 0.8em;
  padding: 4px 8px;
  border-radius: 4px;
  background: #e5e7eb;
  color: #666;
}

.appointment-title {
  margin: 0 0 10px;
  font-size: 1.2em;
  color: #333;
}

.appointment-description {
  color: #666;
  margin-bottom: 15px;
}

.appointment-meta {
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

.appointment-actions {
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