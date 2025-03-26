<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import type { Advisor, Responder, Student } from '@/types'
import Swal from 'sweetalert2'
import UtilService from '@/services/UtilService'
import apiClient from '@/services/AxiosClient'
import AdvisorService from '@/services/AdvisorService'
import FeedbackService from '@/services/FeedbackService'
import { useRouter } from 'vue-router'

const router = useRouter()
const $swal = Swal

interface Feedback {
    id: number
    feedback: string
    timestamp: Date
    student_id: number
    advisor_id: number
    admin_id: number
    responder_id: number
    student: Student
    advisor: Advisor
    responder: Responder
}

const typedFeedback = ref<Feedback[]>([])
const url = new URL(window.location.href)
const student_id = Number(url.pathname.split('/').pop())

const advisor_id = ref<number | null>(null)
const intervalRef = ref<number | null>(null)

onMounted(async () => {
    advisor_id.value = await AdvisorService.getAdvisorIdByUserId()
    await fetchFeedback()
    intervalRef.value = setInterval(fetchFeedback, 5000) as unknown as number
})

onUnmounted(() => {
    if (intervalRef.value) {
        clearInterval(intervalRef.value)
    }
})

const fetchFeedback = async () => {
    try {
        const response = await FeedbackService.getFeedbackByStudentId(student_id)
        typedFeedback.value = response.data || []
    } catch (error) {
        console.error('Error fetching feedback:', error)
    }
}

const goBack = () => {
    router.go(-1)
}
library.add(faRotateLeft)

interface FeedbackForm {
    message: string
    student_id: number
    advisor_id: number
    responder_id: number
}

const form = ref<FeedbackForm>({
    message: '',
    student_id,
    advisor_id: advisor_id.value || 0,
    responder_id: 2
})

const submitForm = async () => {
    try {
        await apiClient.post('/feedbacks', {
            feedback: form.value.message,
            student_id: student_id,
            advisor_id: advisor_id.value,
            responder_id: 2
        })

        await fetchFeedback()

        form.value.message = ''
    } catch (error: any) {
        console.error('Error submitting feedback:', error.response?.data || error.message)
        $swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: error.response?.data || error.message,
        })
    }
}
</script>

<template>
    <div class="container mx-auto p-4 mb-5 h-[650px] flex flex-col justify-end">
        <div class="card flex flex-col flex-grow overflow-hidden bg-amber-100">
            <div class="card-actions justify-start m-3">
                <button @click="goBack" class="btn">
                    <font-awesome-icon :icon="['fas', 'rotate-left']" /> ถอยกลับ
                </button>
            </div>
            <div id="chat-container" class="card-body flex flex-col-reverse overflow-y-auto max-h-[550px] p-4">
                <div v-for="item in typedFeedback" :key="item.id">
                    <div class="chat chat-start" v-if="item.responder_id === 1">
                        <div class="chat-image avatar">
                            <div class="w-10 rounded-full">
                                <img alt="Student Avatar" src="https://www.svgrepo.com/show/520490/student.svg" class="object-cover" />
                            </div>
                        </div>
                        <div class="chat-header">
                            <time class="text-xs opacity-50">
                                {{ UtilService.formatDateTime(item.timestamp) }}
                            </time>
                        </div>
                        <div class="chat-bubble">{{ item.feedback }}</div>
                        <div class="chat-footer opacity-50">Delivered</div>
                    </div>
                    <div class="chat chat-end" v-if="item.responder_id === 2">
                        <div class="chat-image avatar">
                            <div class="w-10 rounded-full">
                                <img alt="Teacher Avatar" src="https://www.svgrepo.com/show/240382/teacher.svg" class="object-cover" />
                            </div>
                        </div>
                        <div class="chat-header">
                            <time class="text-xs opacity-50">
                                {{ UtilService.formatDateTime(item.timestamp) }}
                            </time>
                        </div>
                        <div class="chat-bubble">{{ item.feedback }}</div>
                        <div class="chat-footer opacity-50">Delivered</div>
                    </div>
                </div>
            </div>

            <!-- Input Box with Send Button -->
            <form @submit.prevent="submitForm">
                <div class="flex items-center gap-2 p-4 bg-orange-950 rounded-lg mt-5">
                    <input id="chat-input" type="text" v-model="form.message" placeholder="พิมพ์ข้อความ..."
                        class="input input-bordered flex-1" required />
                    <button id="send-button" class="btn btn-wide">ส่ง</button>
                </div>
            </form>

        </div>
    </div>
</template>
