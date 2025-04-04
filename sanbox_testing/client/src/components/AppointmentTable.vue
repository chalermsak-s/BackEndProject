<script setup lang="ts">
import AppointmentService from '@/services/AppointmentService'
import UtilService from '@/services/UtilService'
import { ref, onMounted, computed } from 'vue'
import type { Appointment } from '@/types'

const appointments = ref<Appointment[]>([])

const loading = ref<boolean>(true) // Track loading state
const error = ref<string | null>(null) // Track any error that occurs

/* Appointment Start */
const fetchAppointments = async () => {
    try {
        const response = await AppointmentService.getAppointments()
        appointments.value = response.data
    } catch (err) {
        error.value =
            'Error fetching appointments: ' +
            (err instanceof Error ? err.message : err)
    } finally {
        loading.value = false
    }
}

const currentAppointmentPage = ref(1)
const pageAppointmentSize = 3

const totalAppointmentPages = computed(() =>
    Math.ceil(appointments.value.length / pageAppointmentSize)
)

const currentAppointmentPageItems = computed(() => {
    const start = (currentAppointmentPage.value - 1) * pageAppointmentSize
    return appointments.value.slice(start, start + pageAppointmentSize)
})

const prveAppointment = () => {
    if (currentAppointmentPage.value > 1) currentAppointmentPage.value--
}

const nextAppointment = () => {
    if (currentAppointmentPage.value < totalAppointmentPages.value)
        currentAppointmentPage.value++
}

/* Appointment End */
onMounted(fetchAppointments)
</script>
<template>
    <div class="card bg-white shadow-lg p-4 rounded-lg">
        <div class="card-body">
            <h2 class="text-xl font-semibold mb-4">ประวัติการนัดหมายทั้งหมด</h2>
            <div class="overflow-x-auto rounded-box border border-base-content/5 mt-3">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>อาจารย์ที่ปรึกษา</th>
                            <th>วันที่นัดหมาย</th>
                            <th>นักศึกษา</th>
                            <th>สถานะ</th>
                            <th>ตัวจัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(appointment, index) in currentAppointmentPageItems" :key="appointment.id">
                            <td>
                                {{
                                    (currentAppointmentPage - 1) * pageAppointmentSize +
                                    index +
                                    1
                                }}
                            </td>
                            <td>
                                {{ appointment.advisor?.first_name }}
                                {{ appointment.advisor?.last_name }}
                            </td>
                            <td>
                                {{
                                    UtilService.formatDateTime(
                                        appointment.appointment_request_date
                                    )
                                }}
                            </td>
                            <td class="whitespace-nowrap">
                                {{ appointment.student?.first_name }}
                                {{ appointment.student?.last_name }}
                            </td>
                            <td v-html="UtilService.statusToHtml(appointment.status?.status)
                                "></td>
                            <td>
                                <RouterLink :to="appointment.id
                                    ? {
                                        name: 'admin-appointment-detail-view',
                                        params: { id: appointment.id },
                                    }
                                    : '#'
                                    " class="btn">ละเอียด</RouterLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="join p-3">
                    <button class="join-item btn" @click="prveAppointment()" :disabled="currentAppointmentPage === 1">
                        «
                    </button>
                    <button class="join-item btn">
                        Page {{ currentAppointmentPage }} of {{ totalAppointmentPages }}
                    </button>
                    <button class="join-item btn" @click="nextAppointment()"
                        :disabled="currentAppointmentPage === totalAppointmentPages">
                        »
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>