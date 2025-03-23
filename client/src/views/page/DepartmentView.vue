<template>
  <div class="department-container">
    <div class="department-header">
      <h1>Departments</h1>
      <div class="department-actions">
        <button class="btn-primary" @click="createDepartment">Add Department</button>
        <button class="btn-secondary" @click="refreshData">Refresh</button>
      </div>
    </div>

    <div class="department-content">
      <!-- Department Statistics -->
      <div v-if="stats" class="department-stats">
        <h2>Overview</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">Total Departments</span>
            <span class="stat-value">{{ stats.totalDepartments }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Total Faculty</span>
            <span class="stat-value">{{ stats.totalFaculty }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Total Staff</span>
            <span class="stat-value">{{ stats.totalStaff }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Total Students</span>
            <span class="stat-value">{{ stats.totalStudents }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Total Budget</span>
            <span class="stat-value">{{ formatCurrency(stats.totalBudget) }}</span>
          </div>
        </div>
      </div>

      <!-- Departments List -->
      <div class="departments-list">
        <div class="departments-header">
          <h2>Department List</h2>
          <div class="filters">
            <select v-model="selectedType" class="filter-select">
              <option value="">All Types</option>
              <option v-for="type in Object.values(DepartmentType)" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
            <input type="text" v-model="searchQuery" placeholder="Search departments..." class="search-input">
          </div>
        </div>

        <div class="departments-grid">
          <div v-for="department in filteredDepartments" :key="department.id" 
               class="department-card" :class="getTypeClass(department.type)">
            <div class="department-header">
              <div class="department-code">{{ department.code }}</div>
              <div class="department-type">{{ department.type }}</div>
            </div>
            <h3 class="department-name">{{ department.name }}</h3>
            <p class="department-description">{{ department.description }}</p>
            <div class="department-meta">
              <div class="meta-item">
                <span class="meta-label">Head:</span>
                <span class="meta-value">{{ department.head.name }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Location:</span>
                <span class="meta-value">{{ department.location }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Contact:</span>
                <span class="meta-value">{{ department.contactInfo.email }}</span>
              </div>
            </div>
            <div class="department-stats">
              <div class="stat-row">
                <div class="mini-stat">
                  <span class="mini-stat-label">Faculty</span>
                  <span class="mini-stat-value">{{ department.facultyCount }}</span>
                </div>
                <div class="mini-stat">
                  <span class="mini-stat-label">Staff</span>
                  <span class="mini-stat-value">{{ department.staffCount }}</span>
                </div>
                <div class="mini-stat">
                  <span class="mini-stat-label">Students</span>
                  <span class="mini-stat-value">{{ department.studentCount }}</span>
                </div>
              </div>
              <div class="budget-stat">
                <span class="budget-label">Budget</span>
                <span class="budget-value">{{ formatCurrency(department.budget) }}</span>
              </div>
            </div>
            <div class="department-actions">
              <button class="btn-edit" @click="editDepartment(department)">Edit</button>
              <button class="btn-delete" @click="deleteDepartment(department)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Department, DepartmentStats, DepartmentType } from '@/types/department'

const stats = ref<DepartmentStats | null>(null)
const departments = ref<Department[]>([])
const selectedType = ref<DepartmentType | ''>('')
const searchQuery = ref('')

const filteredDepartments = computed(() => {
  return departments.value.filter(department => {
    const typeMatch = !selectedType.value || department.type === selectedType.value
    const searchMatch = !searchQuery.value || 
      department.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      department.code.toLowerCase().includes(searchQuery.value.toLowerCase())
    return typeMatch && searchMatch
  })
})

const createDepartment = () => {
  // TODO: Implement create department functionality
  console.log('Creating new department...')
}

const editDepartment = (department: Department) => {
  // TODO: Implement edit department functionality
  console.log('Editing department:', department.id)
}

const deleteDepartment = (department: Department) => {
  // TODO: Implement delete department functionality
  console.log('Deleting department:', department.id)
}

const refreshData = async () => {
  // TODO: Implement refresh functionality
  console.log('Refreshing data...')
}

const getTypeClass = (type: DepartmentType): string => {
  const classes: Record<DepartmentType, string> = {
    ACADEMIC: 'type-academic',
    ADMINISTRATIVE: 'type-administrative',
    RESEARCH: 'type-research',
    SUPPORT: 'type-support'
  }
  return classes[type]
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

onMounted(async () => {
  // TODO: Implement API calls to fetch departments and stats
  console.log('Fetching departments data...')
})
</script>

<style scoped>
.department-container {
  padding: 20px;
}

.department-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.department-actions {
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

.department-stats {
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

.departments-list {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.departments-header {
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

.departments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.department-card {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 20px;
  transition: transform 0.2s;
}

.department-card:hover {
  transform: translateY(-2px);
}

.department-card.type-academic {
  border-left: 4px solid #3b82f6;
}

.department-card.type-administrative {
  border-left: 4px solid #10b981;
}

.department-card.type-research {
  border-left: 4px solid #f59e0b;
}

.department-card.type-support {
  border-left: 4px solid #6b7280;
}

.department-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.department-code, .department-type {
  font-size: 0.8em;
  padding: 4px 8px;
  border-radius: 4px;
  background: #e5e7eb;
  color: #666;
}

.department-name {
  margin: 0 0 10px;
  font-size: 1.2em;
  color: #333;
}

.department-description {
  color: #666;
  margin-bottom: 15px;
}

.department-meta {
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

.department-stats {
  background: #fff;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.mini-stat {
  text-align: center;
  flex: 1;
}

.mini-stat-label {
  display: block;
  font-size: 0.8em;
  color: #666;
  margin-bottom: 2px;
}

.mini-stat-value {
  display: block;
  font-size: 1.1em;
  font-weight: 500;
  color: #333;
}

.budget-stat {
  text-align: center;
  padding-top: 10px;
  border-top: 1px solid #e5e7eb;
}

.budget-label {
  display: block;
  font-size: 0.8em;
  color: #666;
  margin-bottom: 2px;
}

.budget-value {
  display: block;
  font-size: 1.1em;
  font-weight: 500;
  color: #333;
}

.department-actions {
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