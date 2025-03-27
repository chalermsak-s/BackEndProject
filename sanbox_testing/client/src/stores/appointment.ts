import type { AppointmentState, Appointment } from "@/types";
import { defineStore } from "pinia";
export const useAppointmentStore = defineStore("appointment", {
  state: (): AppointmentState => ({
    appointment: null,
  }),
  actions: {
    setStore(appointment: Appointment): void {
      this.appointment = appointment;
    },
  },
});
