<script setup lang="ts">
import StudentCard from '@/components/StudentCard.vue'
import StudentService from '@/services/StudentService'
import { ref, computed, watchEffect } from 'vue'
import type { Student } from '@/types'
import { useRouter } from 'vue-router'
import nProgress from 'nprogress'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
library.add(faUserCircle, faChevronLeft, faChevronRight)
const router = useRouter()
const students = ref<Student[]>([])
const totalStudents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalStudents.value / 3)
  return page.value < totalPages
})

interface Props {
  page: number
}
const props = defineProps<Props>()
const page = computed(() => props.page)

watchEffect(() => {
  StudentService.getStudents(page.value, 3)
    .then((response) => {
      nProgress.start()
      students.value = response.data
      totalStudents.value = response.headers['x-total-count']
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
    .finally(() => {
      nProgress.done()
    })
})

StudentService.getStudents(page.value, 3).then((response) => {
  students.value = response.data
})
</script>

<template>
  <div class="max-w-xl mx-auto mt-10">
    <ul class="list bg-base-100 rounded-box shadow-md">
      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">รายชื่อนักศึกษา</li>
      <StudentCard
        v-for="student in students"
        :key="student.id"
        :student="student"
      />
    </ul>
    <div class="mt-5">
      <RouterLink
        id="page-prev"
        :to="{ name: 'student-list-view', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        class="btn float-left w-4/12"
        ><font-awesome-icon :icon="['fas', 'chevron-left']" /> ก่อนหน้า</RouterLink
      >
      <RouterLink
        id="page-next"
        :to="{ name: 'student-list-view', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        class="btn float-right w-4/12"
        >ถัดไป <font-awesome-icon :icon="['fas', 'chevron-right']" /></RouterLink
      >
    </div>
  </div>
</template>
<style scoped>
/* #page-prev {
  float: left;
}

#page-next {
  float: right;
} */
</style>
