<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { useAnnouncementStore } from '@/stores/announcement'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import UtilService from '@/services/UtilService'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
const store = useAnnouncementStore()
const router = useRouter()
const { announcement } = storeToRefs(store)
const goBack = () => {
    router.go(-1) // กลับไปหน้าก่อนหน้า
}
const galleryContainer = ref<HTMLElement | null>(null)

onMounted(() => {
    if (galleryContainer.value) {
        Fancybox.bind("[data-fancybox='gallery']", {})
    }
})

onUnmounted(() => {
    Fancybox.destroy()
})

library.add(faRotateLeft)
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
