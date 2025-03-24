<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
const store = useStudentStore()
const router = useRouter()
const { student } = storeToRefs(store)
const goBack = () => {
  router.go(-1) // กลับไปหน้าก่อนหน้า
}
library.add(faRotateLeft)

const imageExists = ref(false)

// ตรวจสอบว่า URL ของภาพมีอยู่จริงไหม
const checkImageExists = async (imageUrl: string) => {
  try {
    if(isValidUrl(imageUrl)){
        const response = await fetch(imageUrl, { method: 'HEAD' })
        imageExists.value = response.ok // ถ้าผลตอบรับเป็น 200 OK หมายความว่ามีภาพ
    }else {
        imageExists.value = false
    }
  } catch (error) {
    console.error('Error checking image URL:', error) // Log the error for debugging
    imageExists.value = false // ถ้ามีข้อผิดพลาด หมายความว่าไม่สามารถเข้าถึงภาพ
  }
}

const isValidUrl = (url: string): boolean => {
  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i; // Regular Expression สำหรับตรวจสอบ URL
  return regex.test(url);
};

// ใช้ watchEffect เพื่อตรวจสอบ URL ของภาพเมื่อข้อมูล student เปลี่ยน
watchEffect(() => {
  if (student.value?.picture) {
    checkImageExists(student.value.picture)
  } else {
    imageExists.value = false
  }
})
</script>
<template>
  <div class="card card-border bg-base-100 w-96 m-auto my-10">
    <figure class="px-10 pt-10">
      <img v-if="imageExists" :src="student?.picture ?? ''" alt="รูปนักศึกษา" />
      <img
        v-else
        src="https://www.svgrepo.com/show/520490/student.svg"
        alt="Profile"
        class="rounded-xl"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">รหัสนักศึกษา {{ student?.student_id_card }}</h2>
      <p>ชื่อ {{ student?.first_name }} นามสกุล {{ student?.last_name }}</p>
      <p>
        {{ student?.degree?.degree_name }}
      </p>
      <p>หลักสูตร {{ student?.department?.initials }}</p>
      <p>สาขาวิชา {{ student?.department?.department_name }}</p>
      <p>
        อาจารย์ที่ปรึกษา {{ student?.advisor?.first_name }}
        {{ student?.advisor?.last_name }}
      </p>
      <div class="card-actions justify-end">
        <button @click="goBack" class="btn">
          <font-awesome-icon :icon="['fas', 'rotate-left']" /> ถอยกลับ
        </button>
      </div>
    </div>
  </div>
</template>
