<script setup lang="ts">
import type { Student } from '@/types'
defineProps<{ student: Student }>()
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
library.add(faUserCircle, faChevronLeft, faChevronRight)

</script>

<template>
  <RouterLink
    class="student-link"
    :to="
      student.id
        ? { name: 'student-detail-view', params: { id: student.id } }
        : '#'
    "
  >
    <li class="list-row">
      <div>
        <font-awesome-icon
          class="rounded-box fa-2x opacity-80"
          :icon="['far', 'circle-user']"
        />
      </div>
      <div>
        <div>{{ student.first_name }} {{ student.last_name }}</div>
        <div class="text-xs uppercase font-semibold opacity-60">
          {{ student.department?.initials }}
        </div>
        <div class="text-xs uppercase font-semibold opacity-60">
          {{ student.department?.department_name }}
        </div>
      </div>
      <button class="btn btn-square btn-ghost">
        <svg
          class="size-[1.2em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            fill="none"
            stroke="currentColor"
          >
            <path d="M6 3L20 12 6 21 6 3z"></path>
          </g>
        </svg>
      </button>
    </li>
  </RouterLink>
</template>
