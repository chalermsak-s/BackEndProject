<script setup lang="ts">
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
</script>
<template>
  <div class="card card-border bg-base-100 w-96 m-auto my-10">
    <div class="card-body">
      <h2 class="card-title">รหัสนักศึกษา {{ student?.student_id_card }}</h2>
      <p>ชื่อ {{ student?.first_name }} นามสกุล {{ student?.last_name }}</p>
      <p>
        {{ student?.degree?.degree_name }}
      </p>
      <p>หลักสูตร {{ student?.department?.initials }}</p>
      <p>สาขาวิชา {{ student?.department?.department_name }}</p>
      <div class="card-actions justify-end">
        <button @click="goBack" class="btn">
          <font-awesome-icon :icon="['fas', 'rotate-left']" /> ถอยกลับ
        </button>
      </div>
    </div>
  </div>
</template>
