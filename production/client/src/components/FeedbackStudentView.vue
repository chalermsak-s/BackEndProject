<script setup lang="ts">
import { ref, watchEffect,onMounted,onUnmounted } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import type { Advisor, Responder, Student } from '@/types'
import Swal from 'sweetalert2'
import UtilService from '@/services/UtilService'
import apiClient from '@/services/AxiosClient'
import StudentService from '@/services/StudentService'
import FeedbackService from '@/services/FeedbackService'

const $swal = Swal
interface Feedback {
    id: any
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

const typedFeedback = ref<Feedback | null>(null) 
const student_id = await StudentService.getStudentIdByUserId()
const advisor_id = await StudentService.getAdvisorIdByUserId()

const response = await FeedbackService.getFeedbackByStudentId(student_id)
typedFeedback.value = response.data

watchEffect(() => {
    if (typedFeedback.value && typedFeedback.value.feedback) {
        console.log('มีข้อความตอบกลับ:', typedFeedback.value.feedback)
    }
})

/* Feedback Update Chat Start */
const fetchFeedback = async () => {
    const response = await FeedbackService.getFeedbackByStudentId(student_id)
    typedFeedback.value = response.data
}

onMounted(() => {
    fetchFeedback() // โหลดข้อมูลครั้งแรก
    const interval = setInterval(fetchFeedback, 5000)
    onUnmounted(() => {
        clearInterval(interval)
    })
})
/* Feedback Update Chat End */

library.add(faRotateLeft)

// กรองเฉพาะข้อความของ Student
// Submit form
interface FeedbackForm {
    message: string
    student_id: number
    advisor_id: number
    responder_id: number
}
const form = ref<FeedbackForm>({
    message: '',
    student_id: 0,
    advisor_id: 0,
    responder_id: 1
})
const submitForm = async () => {
    const formData = new FormData()
    formData.append('message', form.value.message)
    try {
        const response = await apiClient.post('/feedbacks', {
            feedback: form.value.message,
            student_id: student_id,
            advisor_id: advisor_id,
            responder_id: 1
        })
        console.log('Success:', response.data)

        // Show success alert
        const responseNew = await FeedbackService.getFeedbackByStudentId(student_id)
        typedFeedback.value = responseNew.data
        
        form.value = {
            message: '',
            student_id: 0,
            advisor_id: 0,
            responder_id: 1
        }
    } catch (error: any) {
        console.error('Error:', error.response?.data || error.message)

        // Show error alert
        $swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: error.response?.data
                ? 'ไม่สามารถส่งข้อความได้'
                : error.response?.data || error.message,
        })
    }
}
</script>
<template>
    <div class="container mx-auto mb-5 h-[650px] flex flex-col justify-end overflow-hidde">
        <div class="card p-4 flex flex-col flex-grow overflow-hidde bg-white">
            <h2 class="text-xl font-semibold mb-4">Feedback</h2>
            <div id="chat-container" class="card-body flex flex-col-reverse overflow-y-auto max-h-[550px] p-4">
                <div v-for="item in typedFeedback">
                    <div class="chat chat-end" v-if="item.responder_id === 1">
                        <div class="chat-image avatar">
                            <div class="w-10 rounded-full">
                                <!-- v-html="UtilService.displayFileFromURL(announcement?.file || '').html" -->
                                <img alt="Tailwind CSS chat bubble component" 
                                    src="https://www.svgrepo.com/show/520490/student.svg" />
                            </div>
                        </div>
                        <div class="chat-header">
                            <time class="text-xs opacity-50">{{
                                UtilService.formatDateTime(item.timestamp)
                            }}</time>
                        </div>
                        <div class="chat-bubble">{{ item.feedback }}</div>
                        <div class="chat-footer opacity-50">Delivered</div>
                    </div>
                    <div class="chat chat-start" v-if="item.responder_id === 2">
                        <div class="chat-image avatar">
                            <div class="w-10 rounded-full">
                                <img alt="Tailwind CSS chat bubble component"
                                    src="https://www.svgrepo.com/show/240382/teacher.svg" />
                            </div>
                        </div>
                        <div class="chat-header">
                            <time class="text-xs opacity-50">{{
                                UtilService.formatDateTime(item.timestamp)
                            }}</time>
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
