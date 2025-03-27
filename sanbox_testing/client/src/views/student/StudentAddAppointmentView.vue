<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { library } from '@fortawesome/fontawesome-svg-core'
import apiClient from '@/services/AxiosClient'
import StudentService from '@/services/StudentService'

import {
    faRotateLeft
} from '@fortawesome/free-solid-svg-icons'

library.add(faRotateLeft)

const $swal = Swal
const router = useRouter()

interface AddAppointment {
    topic: string
    description: string
    appointment_request_date: string | null
    student_confirmation: number
    student_id: number | null
    advisor_id: number | null
    status_appointment_id: number
}

const form = ref<AddAppointment>({
    topic: '',
    description: '',
    appointment_request_date: null,
    student_confirmation: 0,
    student_id: null,
    advisor_id: null,
    status_appointment_id: 4
})

onMounted(async () => {
    try {
        const [studentId, advisorId] = await Promise.all([
            StudentService.getStudentIdByUserId(),
            StudentService.getAdvisorIdByUserId()
        ])
        form.value.student_id = studentId
        form.value.advisor_id = advisorId
    } catch (error) {
        console.error('Error loading student/advisor ID:', error)
    }
})

const submitForm = async () => {
    try {
        const formData = {
            topic: form.value.topic,
            description: form.value.description,
            appointment_request_date: form.value.appointment_request_date
                ? new Date(form.value.appointment_request_date).toISOString()
                : null,
            student_confirmation: form.value.student_confirmation === 1,
            student_id: form.value.student_id,
            advisor_id: form.value.advisor_id,
            status_appointment_id: form.value.status_appointment_id
        }

        await apiClient.post('/appointments/student/add', formData)

        $swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
            showConfirmButton: false,
            timer: 1500,
        })

        form.value = {
            topic: '',
            description: '',
            appointment_request_date: null,
            student_confirmation: 0,
            student_id: form.value.student_id,
            advisor_id: form.value.advisor_id,
            status_appointment_id: 4
        }

        router.push('/student-dashboard')
    } catch (error: any) {
        console.error('Error:', error.response?.data || error.message)
        $swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: error.response?.data || 'ไม่สามารถเพิ่มรายการนัดหมายได้',
        })
    }
}

const goBack = () => router.go(-1)
</script>

<template>
    <div class="max-w-xxl mx-auto mt-10 p-4">
        <div class="card p-4">
            <section class="container mx-auto p-4">
                <div class="grid md:grid-cols-1 gap-6">
                    <div class="card-actions justify-start">
                        <button class="btn" @click="goBack">
                            <font-awesome-icon :icon="['fas', 'rotate-left']" /> ถอยกลับ
                        </button>
                    </div>
                    <div class="card bg-base-200">
                        <div class="card-body">
                            <form @submit.prevent="submitForm">
                                <h4 class="text-xl font-bold">เพิ่มรายการนัดหมาย</h4>
                                <div class="form-control mt-2">
                                    <label class="label font-semibold">หัวข้อ</label>
                                    <input v-model="form.topic" type="text" class="input input-bordered w-full"
                                        required>
                                </div>

                                <div class="form-control mt-4">
                                    <label class="label font-semibold">คำอธิบาย</label>
                                    <textarea v-model="form.description" class="textarea textarea-bordered w-full"
                                        rows="5" required></textarea>
                                </div>

                                <div class="form-control mt-2">
                                    <label class="label font-semibold">วันและเวลาที่ต้องการนัดหมาย</label>
                                    <input v-model="form.appointment_request_date" type="datetime-local"
                                        class="input input-bordered w-full" required>
                                </div>

                                <div class="form-control mt-4">
                                    <button type="submit" class="btn btn-primary w-full">
                                        เพิ่มการนัดหมาย
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>