<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import AnnouncementService from '@/services/AnnouncementService'
import UtilService from '@/services/UtilService'
import type { Announcement } from '@/types'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

const galleryContainer = ref<HTMLElement | null>(null)

onMounted(() => {
    if (galleryContainer.value) {
        Fancybox.bind("[data-fancybox='gallery']", {})
    }
})

onUnmounted(() => {
    Fancybox.destroy()
})

const router = useRouter()
const announcement = ref<Announcement | null>(null)
const loading = ref<boolean>(true)
const error = ref<string | null>(null)

const goBack = () => {
    router.go(-1) // กลับไปหน้าก่อนหน้า
}

// ฟังก์ชันดึงข้อมูลประกาศตาม ID
const fetchAnnouncementById = async () => {
    try {
        const announcementId = parseInt(router.currentRoute.value.params.id as string)
        const response = await AnnouncementService.getAnnouncement(announcementId) // เรียก API ตาม ID ที่เลือก
        announcement.value = response.data
    } catch (err) {
        error.value = 'Error fetching announcement: ' + (err instanceof Error ? err.message : err)
    } finally {
        loading.value = false
    }
}

onMounted(fetchAnnouncementById)


</script>
<template>
    <div class="flex justify-center mt-12 mb-6 w-4xl m-auto">
        <div class="card card-border bg-base-100 w-full shadow-lg">
            <div class="card-body">
                <h2 class="card-title">{{ announcement?.topic }}</h2>
                <div>
                    {{ UtilService.formatDateTime(announcement?.posted_date || '') }}
                </div>
                <p>
                    {{ announcement?.description }}
                </p>
                <figure ref="galleryContainer" v-html="UtilService.displayFileFromURL(announcement?.file || '').html">
                </figure>
                <div class="card-actions justify-end">
                    <button @click="goBack" class="btn">
                        <font-awesome-icon :icon="['fas', 'rotate-left']" /> ถอยกลับ
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
