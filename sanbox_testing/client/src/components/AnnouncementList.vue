<script setup lang="ts">
import AnnouncementService from '@/services/AnnouncementService'
import UtilService from '@/services/UtilService'
import { ref, onMounted, computed } from 'vue'
import type { Announcement } from '@/types'
import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faRectangleList

} from '@fortawesome/free-regular-svg-icons'
import { RouterLink } from 'vue-router'
import StudentService from '@/services/StudentService'

library.add(faRectangleList)
const announcements = ref<Announcement[]>([])
const loading = ref<boolean>(true) // Track loading state
const error = ref<string | null>(null) // Track any error that occurs

/* Announcement Start */
const fetchAnnouncements = async () => {
  try {
    const id = await StudentService.getStudentIdByUserId()
    const response = await AnnouncementService.getAnnouncementByStudentId(id)
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
const pageAnnouncementSize = 5 // Number of announcements per page

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


// Check File Start
const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
// ฟังก์ชันตรวจสอบว่า URL เป็นไฟล์ภาพหรือไม่
const isImage = (fileUrl: string | undefined): boolean => {
  if (!fileUrl) return false
  const extension = fileUrl.split('.').pop()?.toLowerCase() || ''
  return imageExtensions.includes(extension)
}
// URL ไอคอนไฟล์ทั่วไป
const fileIcon = 'https://www.svgrepo.com/show/261815/announcement-megaphone.svg'
// สมมติว่ามีข้อมูล announcement
// ใช้ computed() เพื่อตรวจสอบ
const displayFile = (fileUrl: string | undefined) => isImage(fileUrl) ? fileUrl : fileIcon
// Check File End

</script>
<template>

  <div class="overflow-x-auto">
    <div class="card bg-white shadow-lg p-4 rounded-lg mb-4">
      <div class="card-body">
        <h2 class="text-xl font-semibold mb-4">ประวัติการประกาศ</h2>
        <table class="table">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>หัวข้อ</th>
              <th>วันที่โพสต์ประกาศ</th>
              <th>ผู้ประกาศ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(announcement, index) in currentAnnouncementPageItems" :key="announcement.id">
              <td>{{ (currentAnnouncementPage - 1) * pageAnnouncementSize + index + 1 }}</td>
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle h-12 w-12">
                      <img :src="displayFile(announcement.file)"
                        :alt="isImage(announcement.file) ? 'รูปประกาศ' : 'ไฟล์แนบ'" class="rounded-xl w-sm" />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{{ announcement.topic }}</div>
                    <div class="text-sm opacity-50">{{ announcement.description }}</div>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap">{{ UtilService.formatDateTime(announcement.posted_date) }}</td>
              <td class="whitespace-nowrap">
                <button class="btn btn-ghost btn-xs">{{ announcement.advisor?.first_name }} {{
                  announcement.advisor?.last_name }}</button>
              </td>
              <td>
                <RouterLink :to="announcement.id
                  ? {
                    name: 'student-announcement-detail-view',
                    params: { id: announcement.id },
                  }
                  : '#'
                  " class="btn btn-sm btn-dash btn-outline"><font-awesome-icon
                    :icon="['far', 'rectangle-list']" /></RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
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
  </div>
</template>