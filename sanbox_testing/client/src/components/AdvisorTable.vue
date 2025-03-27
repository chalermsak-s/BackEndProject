<script setup lang="ts">
import AdvisorService from '@/services/AdvisorService'
import { ref, onMounted, computed } from 'vue'
import type { Advisor } from '@/types'
const advisors = ref<Advisor[]>([])
const loading = ref<boolean>(true) // Track loading state
const error = ref<string | null>(null) // Track any error that occurs
/* Advisor Start */
const fetchAdvisors = async () => {
    try {
        const response = await AdvisorService.getAdvisors()
        advisors.value = response.data
    } catch (err) {
        error.value =
            'Error fetching advisors: ' + (err instanceof Error ? err.message : err)
    } finally {
        loading.value = false
    }
}

// Custom pagination Advisor
const currentAdvisorPage = ref(1)
const pageAdvisorSize = 3

const totalAdvisorPages = computed(() =>
    Math.ceil(advisors.value.length / pageAdvisorSize)
)

const currentAdvisorPageItems = computed(() => {
    const start = (currentAdvisorPage.value - 1) * pageAdvisorSize
    return advisors.value.slice(start, start + pageAdvisorSize)
})

const prveAdvisor = () => {
    if (currentAdvisorPage.value > 1) currentAdvisorPage.value--
}

const nextAdvisor = () => {
    if (currentAdvisorPage.value < totalAdvisorPages.value)
        currentAdvisorPage.value++
}
onMounted(fetchAdvisors)
/* Advisor End */
</script>
<template>
    <div class="card bg-white shadow-lg p-4 rounded-lg">
        <div class="card-body">
            <h2 class="text-xl font-semibold mb-4">ข้อมูลอาจารย์ที่ปรึกษา</h2>
            <RouterLink :to="{ name: 'admin-add-advisor' }" class="btn btn-neutral w-xs">
                เพิ่มข้อมูลอาจารย์ที่ปรึกษา
            </RouterLink>
            <div class="overflow-x-auto rounded-box border border-base-content/5 mt-3">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>ชื่อ-นามสกุล</th>
                            <th>ภาควิชา</th>
                            <th>ตำแหน่ง</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(advisor, index) in currentAdvisorPageItems" :key="advisor.id">
                            <td>
                                {{ (currentAdvisorPage - 1) * pageAdvisorSize + index + 1 }}
                            </td>
                            <td>{{ advisor.first_name }} {{ advisor.last_name }}</td>
                            <td>{{ advisor.department?.department_name }}</td>
                            <td>
                                {{ advisor.academic_position?.academic_position_name }}
                            </td>
                            <td>
                                <RouterLink :to="advisor.id
                                    ? {
                                        name: 'admin-advisor-detail-view',
                                        params: { id: advisor.id },
                                    }
                                    : '#'
                                    " class="btn">ละเอียด</RouterLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="join p-3">
                    <button class="join-item btn" @click="prveAdvisor()" :disabled="currentAdvisorPage === 1">
                        «
                    </button>
                    <button class="join-item btn">
                        Page {{ currentAdvisorPage }} of {{ totalAdvisorPages }}
                    </button>
                    <button class="join-item btn" @click="nextAdvisor()"
                        :disabled="currentAdvisorPage === totalAdvisorPages">
                        »
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>