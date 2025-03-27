<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useAdvisorStore } from '@/stores/advisor'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'

import StudentTableFromAdvisor from '@/components/StudentTableFromAdvisor.vue'

const store = useAdvisorStore()
const router = useRouter()
const { advisor } = storeToRefs(store)
const goBack = () => {
  router.go(-1) // กลับไปหน้าก่อนหน้า
}
library.add(faRotateLeft)

const imageExists = ref(false)

/**
 * Check if the image URL exists.
 * @param imageUrl - The URL of the image to check.
 */
 const checkImageExists = (imageUrl: string): void => {
  const img = new Image()
  img.src = imageUrl

  img.onload = () => {
    imageExists.value = true // โหลดสำเร็จ (รูปมีอยู่)
  }

  img.onerror = () => {
    imageExists.value = false // โหลดไม่สำเร็จ (รูปไม่มีอยู่)
  }
}


/**
 * Validate if a string is a valid URL.
 * @param url - The string to validate.
 * @returns True if the string is a valid URL, false otherwise.
 */
// const isValidUrl = (url: string): boolean => {
//   const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i // Regular Expression for URL validation
//   return regex.test(url)
// }

// Watch for changes in the advisor object and check the image URL
watchEffect(() => {
  if (advisor.value?.picture) {
    checkImageExists(advisor.value.picture)
  } else {
    imageExists.value = false
  }
})
</script>

<template>
  <div class="grid grid-cols-12 gap-4 p-4">
    <!-- Image Section (4 columns) -->
    <div class="col-span-12 md:col-span-4 flex justify-center">
      <div class="card card-border bg-base-100 w-full max-w-xs sm:max-w-sm md:max-w-md shadow-lg">
        <figure class="px-10 pt-10">
          <img
            v-if="imageExists"
            :src="advisor?.picture ?? ''"
            alt="รูปอาจารย์ที่ปรึกษา"
            class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-xl object-cover"
          />
          <img
            v-else
            src="https://dev.kumawork.com/project_images_backend/advisor.png"
            alt="Profile"
            class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-xl object-cover"
          />
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

    <!-- Data Section (8 columns) -->
    <div class="col-span-12 md:col-span-8">
      <StudentTableFromAdvisor />
    </div>
  </div>
</template>