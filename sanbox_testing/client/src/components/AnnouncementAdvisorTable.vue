<script setup lang="ts">
import AnnouncementService from '@/services/AnnouncementService'
import UtilService from '@/services/UtilService'
import { ref, onMounted, computed } from 'vue'
import type { Announcement } from '@/types'
import AdvisorService from '@/services/AdvisorService'

const announcements = ref<Announcement[]>([])
const loading = ref<boolean>(true) // Track loading state
const error = ref<string | null>(null) // Track any error that occurs

/* Announcement Start */
const fetchAnnouncements = async () => {
    try {
        const id = await AdvisorService.getAdvisorIdByUserId()
        const response = await AnnouncementService.getAnnouncementByAdvisorId(id)
        announcements.value = response.data
    } catch (err) {
        error.value =
            'Error fetching announcements: ' +
            (err instanceof Error ? err.message : err)
    } finally {
        loading.value = false
    }
}

const currentAnnouncementPage = ref(1)
const pageAnnouncementSize = 3

const totalAnnouncementPages = computed(() =>
    Math.ceil(announcements.value.length / pageAnnouncementSize)
)

const currentAnnouncementPageItems = computed(() => {
    const start = (currentAnnouncementPage.value - 1) * pageAnnouncementSize
    return announcements.value.slice(start, start + pageAnnouncementSize)
})

const prveAnnouncement = () => {
    if (currentAnnouncementPage.value > 1) currentAnnouncementPage.value--
}

const nextAnnouncement = () => {
    if (currentAnnouncementPage.value < totalAnnouncementPages.value)
        currentAnnouncementPage.value++
}

/* Announcement End */
onMounted(fetchAnnouncements)
</script>
<template>
    <div class="card bg-white shadow-lg p-4 rounded-lg mt-5">
        <div class="card-body">
            <h2 class="text-xl font-semibold mb-4">ประวัติการประกาศ</h2>
            <div class="overflow-x-auto rounded-box border border-base-content/5 mt-3">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>วันที่โพสต์ประกาศ</th>
                            <th>หัวข้อ</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(announcement, index) in currentAnnouncementPageItems" :key="announcement.id">
                            <td>
                                {{
                                    (currentAnnouncementPage - 1) * pageAnnouncementSize +
                                    index +
                                    1
                                }}
                            </td>
                            <td v-html="UtilService.formatDateTime(announcement.posted_date)
                                "></td>
                            <td>{{ announcement.topic }}</td>
                            <td>
                                <RouterLink :to="announcement.id
                                    ? {
                                        name: 'advisor-announcement-detail-view',
                                        params: { id: announcement.id },
                                    }
                                    : '#'
                                    " class="btn">ละเอียด</RouterLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="join p-3">
                <button class="join-item btn" @click="prveAnnouncement()" :disabled="currentAnnouncementPage === 1">
                    «
                </button>
                <button class="join-item btn">
                    Page {{ currentAnnouncementPage }} of {{ totalAnnouncementPages }}
                </button>
                <button class="join-item btn" @click="nextAnnouncement()"
                    :disabled="currentAnnouncementPage === totalAnnouncementPages">
                    »
                </button>
            </div>
        </div>
    </div>
</template>