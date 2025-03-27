import apiClient from './AxiosClient'
export default {
  getAppointments() {
    return apiClient.get('/appointments');
  },
  getAppointment(id: number) {
    return apiClient.get(`/appointments/${id}`);
  },
  getAppointmentsByStudentId(studentId: number) {
    return apiClient.get(`/appointments/student/${studentId}`);
  },
  getAppointmentsByAdvisorId(advisorId: number) {
    return apiClient.get(`/appointments/advisor/${advisorId}`);
  },
  confirmAppointment(appointmentId: number) {
    return apiClient.put(`/appointments/${appointmentId}/confirm`)
  },
  cancelAppointment(appointmentId: number) {
    return apiClient.put(`/appointments/${appointmentId}/cancel`)
  },
  getAppointmentByAdvisorId(id: number) {
    return apiClient.get(`/appointments/appointment-advisor/${id}`);
  },
  confirmAppointmentAdvisor(appointmentId: number) {
    return apiClient.put(`/appointments/advisor/${appointmentId}/confirm`)
  },
  cancelAppointmentAdvisor(appointmentId: number) {
    return apiClient.put(`/appointments/advisor/${appointmentId}/cancel`)
  },
};
