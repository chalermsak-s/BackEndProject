<script setup lang="ts">
import AppointmentService from '@/services/AppointmentService'
import UtilService from '@/services/UtilService'
import { ref, onMounted, computed } from 'vue'
import type { Appointment } from '@/types'

const appointments = ref<Appointment[]>([])
const loading = ref<boolean>(true) // Track loading state
const error = ref<string | null>(null) // Track any error that occurs

const fetchAppointments = async () => {
    try {
        const response = await AppointmentService.getAppointments()
        // กรองเฉพาะนัดหมายที่มี status.id === 2 (Pending)
        const today = new Date()

        appointments.value = response.data.filter(
            (appt: Appointment) =>
                appt.status_appointment_id === 2 &&
                new Date(appt.appointment_request_date) >= today
        )
            .sort(
                (a: Appointment, b: Appointment) =>
                    new Date(a.appointment_request_date).getTime() -
                    new Date(b.appointment_request_date).getTime()
            )
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
    <div class="card bg-white shadow-lg p-4 rounded-lg mt-5">
        <div class="card-body">
            <h2 class="text-xl font-semibold mb-4">การนัดหมายสถานะ Pending</h2>
            <div class="overflow-x-auto rounded-box border border-base-content/5 mt-3">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>วันที่นัดหมาย</th>
                            <th>นักศึกษา</th>
                            <th>หัวข้อนัดหมาย</th>
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
                                {{
                                    UtilService.formatDateTime(
                                        appointment.appointment_request_date
                                    )
                                }}
                            </td>
                            <td>
                                {{ appointment.student?.first_name }}
                                {{ appointment.student?.last_name }}
                            </td>
                            <td>
                                {{ appointment.topic }}
                            </td>
                            <td v-html="UtilService.statusToHtml(appointment.status?.status)
                                "></td>
                            <td>
                                <RouterLink :to="appointment.id
                                    ? {
                                        name: 'admin-appointment-detail-view-request',
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