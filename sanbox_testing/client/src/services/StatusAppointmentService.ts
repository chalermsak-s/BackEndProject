import apiClient from './AxiosClient'
export default {
  getStatusAppointmentServices() {
    return apiClient.get('/statusappointments')
  },
  getStatusAppointmentService(id: number) {
    return apiClient.get(`/statusappointments/${id}`)
  }
}
