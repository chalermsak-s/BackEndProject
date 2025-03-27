<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faCaretRight } from '@fortawesome/free-solid-svg-icons'

//เพิ่มเฉพาะไอคอนที่ใช้ในหน้านี้
library.add(faCaretRight, faHome)
const people = [
  {
    id: '672132001',
    name: 'นายเฉลิมศักดิ์ แสงลี',
    image:
      'https://images.deepai.org/machine-learning-models/620a1b90b02e4fa18295534f91d54bda/comics-superhero-generator-thumb.jpg',
    link: 'https://github.com/chalermsak-s',
  },
  {
    id: '672132146',
    name: 'นายวีรยุทธ เอื้อใจพระ',
    image:
      'https://images.deepai.org/machine-learning-models/a6d60048061345c0b77a5677408186ed/film-poster-generator-thumb.jpg',
    link: 'https://github.com/vyut',
  },
  {
    id: '672132168',
    name: 'นางสาวธนาทร ไชยรินทร์',
    image:
      'https://images.deepai.org/machine-learning-models/80a11f4024424928adf6e72ac023ae5b/children-book-generator-thumb.jpg',
    link: 'https://github.com/Tanatorn168',
  },
  {
    id: '672132169',
    name: 'นางสาวปาริฉัตร ยานแก้ว',
    image:
      'https://images.deepai.org/machine-learning-models/8f06a3f311b246a5afac4a0ed71480c6/anime-superhero-generator-thumb.jpg',
    link: 'https://github.com/MinChatr',
  },
]
</script>
<template>
  <div class="max-w-lg mx-auto">
    <ul class="list bg-base-100 rounded-box shadow-md mt-10">
      <li class="p-4 pb-2 text-2xl opacity-60 tracking-wide">
        รายชื่อผู้พัฒนาระบบ ApptCAMT
      </li>
      <li v-for="(person, index) in people" :key="person.id" class="list-row">
        <div class="text-4xl font-thin opacity-30 tabular-nums">
          {{ (index + 1).toString().padStart(2, '0')
          }}{{ index === 0 ? '&nbsp;' : '' }}
        </div>
        <div>
          <img class="size-10 rounded-box" :src="person.image" />
        </div>
        <div class="list-col-grow">
          <div>{{ person.id }}</div>
          <div class="text-xs uppercase font-semibold opacity-60">
            {{ person.name }}
          </div>
        </div>
        <a :href="person.link" target="_blank" class="btn btn-square btn-ghost">
          <font-awesome-icon
            :icon="['fas', 'caret-right']"
            class="fa-2x text-base opacity-60"
          />
        </a>
      </li>
    </ul>
  </div>
</template>
