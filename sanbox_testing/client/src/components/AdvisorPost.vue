<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'
import apiClient from '@/services/AxiosClient'

// Inject SweetAlert2
const $swal = Swal

export interface InAnnouncement {
    topic: string
    description: string
    file: File | null
}

// Reactive form state
const form = ref<InAnnouncement>({
    topic: '',
    description: '',
    file: null
})

// Handle file upload
const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files) {
        form.value.file = target.files[0] // Capture the file
    }
}

// Submit form
const submitForm = async () => {
    const formData = new FormData()
    Object.entries(form.value).forEach(([key, value]) => {
        if (value !== null) {
            formData.append(key, value as string | Blob)
        }
    })
    try {
        const id = 1
        const response = await apiClient.post(`/announcements/announcement-advisor/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        console.log('Success:', response.data)

        // Show success alert
        $swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
            showConfirmButton: false,
            timer: 1500,
        })

        form.value = {
            topic: '',
            description: '',
            file: null
        }

        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
        if (fileInput) {
            fileInput.value = ''
        }
        
    } catch (error: any) {
        console.error('Error:', error.response?.data || error.message)

        // Show error alert
        $swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: error.response?.data ? 'รหัสนักศึกษาถูกใช้งานแล้ว' : error.response?.data || error.message,
        })
    }
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl p-4">
        <section class="container mx-auto p-4">
            <div class="grid md:grid-cols-1 gap-6">
                <div>
                    <h1 class="text-2xl font-bold">📢 Announcement</h1>
                </div>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <form @submit.prevent="submitForm">
                            <h4 class="text-xl font-bold">Leave an Announcement</h4>
                            <div class="form-control mt-2">
                                <label class="label">
                                    <span class="label-text font-semibold">Topic</span>
                                </label>
                                <input v-model="form.topic" type="text" class="input input-bordered w-full" placeholder="Type your topic...">

                            </div>
                            <!-- Topic Input -->
                            <!-- Message Input -->
                            <div class="form-control mt-4">
                                <label class="label">
                                    <span class="label-text font-semibold">Message</span>
                                </label>
                                <textarea  v-model="form.description" class="textarea textarea-bordered w-full" rows="5"
                                    placeholder="Type your message..."></textarea>
                            </div>

                            <!-- File Upload -->
                            <div class="form-control mt-4">
                                <label class="label">
                                    <span class="label-text font-semibold">Upload File</span>
                                </label>
                                <input @change="handleFileUpload" type="file" class="file-input file-input-bordered w-full" accept="image/*, .pdf">
                            </div>

                            <!-- Submit Button -->
                            <div class="form-control mt-4">
                                <button type="submit" class="btn btn-primary w-full">
                                    🚀 Post Announcement
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>