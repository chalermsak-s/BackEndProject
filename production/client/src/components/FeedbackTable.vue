<script setup lang="ts">
import FeedbackService from '@/services/FeedbackService'
import UtilService from '@/services/UtilService'
import { ref, onMounted, computed } from 'vue'
import type { Feedback } from '@/types'

const feedbacks = ref<Feedback[]>([])

const loading = ref<boolean>(true) // Track loading state
const error = ref<string | null>(null) // Track any error that occurs

/* Feedback Start */
const fetchFeedbacks = async () => {
    try {
        const response = await FeedbackService.getFeedbacks()
        feedbacks.value = response.data
    } catch (err) {
        error.value =
            'Error fetching feedbacks: ' +
            (err instanceof Error ? err.message : err)
    } finally {
        loading.value = false
    }
}

const currentFeedbackPage = ref(1)
const pageFeedbackSize = 5

const totalFeedbackPages = computed(() =>
    Math.ceil(feedbacks.value.length / pageFeedbackSize)
)

const currentFeedbackPageItems = computed(() => {
    const start = (currentFeedbackPage.value - 1) * pageFeedbackSize
    return feedbacks.value.slice(start, start + pageFeedbackSize)
})

const prveFeedback = () => {
    if (currentFeedbackPage.value > 1) currentFeedbackPage.value--
}

const nextFeedback = () => {
    if (currentFeedbackPage.value < totalFeedbackPages.value) currentFeedbackPage.value++
}
/* Feedback End */

onMounted(fetchFeedbacks)
</script>
<template>
    <div class="card bg-white shadow-lg p-4 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">ข้อมูลฟีดแบค</h2>
        <div class="overflow-x-auto rounded-box border border-base-content/5 mt-3">
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th>อาจารย์ที่ปรึกษา</th>
                        <th>นักศึกษา</th>
                        <th>ฟีดแบค</th>
                        <th>เวลาที่ได้ฟีดแบค</th>
                        <th>ผู้ที่ทำการตอบฟีดแบค</th>
                        <!-- <th>ตัวจัดการ</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(feedback, index) in currentFeedbackPageItems" :key="feedback.id">
                        <td>{{
                            (currentFeedbackPage - 1) * pageFeedbackSize +
                            index +
                            1
                        }}</td>
                        <td>
                            {{ feedback.advisor?.academic_position?.academic_position_name }}
                            {{ feedback.advisor?.first_name }}&nbsp;{{ feedback.advisor?.last_name }}
                        </td>
                        <td>{{ feedback.student?.first_name }}&nbsp;{{ feedback.student?.last_name }}</td>
                        <td>{{ feedback.feedback }}</td>
                        <td>{{ UtilService.formatDateTime(feedback.timestamp) }}</td>
                        <td>{{ feedback.responder?.responder }}</td>
                        <!-- <td>
                            <RouterLink :to="feedback.id
                                ? {
                                    name: '',
                                    params: { id: feedback.id },
                                }
                                : '#'
                                " class="btn">ละเอียด</RouterLink>
                        </td> -->
                    </tr>
                </tbody>
            </table>
            <div class="join p-3">
                <button class="join-item btn" @click="prveFeedback()" :disabled="currentFeedbackPage === 1">
                    «
                </button>
                <button class="join-item btn">
                    Page {{ currentFeedbackPage }} of {{ totalFeedbackPages }}
                </button>
                <button class="join-item btn" @click="nextFeedback()"
                    :disabled="currentFeedbackPage === totalFeedbackPages">
                    »
                </button>
            </div>
        </div>
    </div>
</template>
