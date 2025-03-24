<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useAdvisorStore } from '@/stores/advisor'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
const store = useAdvisorStore()
const router = useRouter()
const { advisor } = storeToRefs(store)
const goBack = () => {
  router.go(-1) // กลับไปหน้าก่อนหน้า
}
library.add(faRotateLeft)

const imageExists = ref(false)

// ตรวจสอบว่า URL ของภาพมีอยู่จริงไหม
const checkImageExists = async (imageUrl: string) => {
  try {
    if (isValidUrl(imageUrl)) {
      const response = await fetch(imageUrl, { method: 'HEAD' })
      imageExists.value = response.ok // ถ้าผลตอบรับเป็น 200 OK หมายความว่ามีภาพ
    } else {
      imageExists.value = false
    }
  } catch (error) {
    console.error('Error checking image URL:', error) // Log the error for debugging
    imageExists.value = false // ถ้ามีข้อผิดพลาด หมายความว่าไม่สามารถเข้าถึงภาพ
  }
}

const isValidUrl = (url: string): boolean => {
  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i // Regular Expression สำหรับตรวจสอบ URL
  return regex.test(url)
}

// ใช้ watchEffect เพื่อตรวจสอบ URL ของภาพเมื่อข้อมูล advisor เปลี่ยน
watchEffect(() => {
  if (advisor.value?.picture) {
    checkImageExists(advisor.value.picture)
  } else {
    imageExists.value = false
  }
})
</script>
<template>
  <div class="flex justify-center p-4">
    <div class="card card-border bg-base-100 w-full max-w-xs sm:max-w-sm md:max-w-md shadow-lg">
      <figure class="px-10 pt-10">
        <img v-if="imageExists" :src="advisor?.picture ?? ''" alt="รูปอาจารย์ที่ปรึกษา"
          class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-xl object-cover" />
        <img v-else src="https://www.svgrepo.com/show/23257/teacher.svg" alt="Profile"
          class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-xl object-cover" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          ตำแหน่งทางวิชาการ
          {{ advisor?.academic_position?.academic_position_name }}
        </h2>
        <p>ชื่อ {{ advisor?.first_name }} นามสกุล {{ advisor?.last_name }}</p>
        <p>หลักสูตร {{ advisor?.department?.initials }}</p>
        <p>ภาควิชา {{ advisor?.department?.department_name }}</p>
        <p>
          {{ advisor?.students }}
        </p>
        <div class="card-actions justify-end">
          <button @click="goBack" class="btn">
            <font-awesome-icon :icon="['fas', 'rotate-left']" /> ถอยกลับ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
