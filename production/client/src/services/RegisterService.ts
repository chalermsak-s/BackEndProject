import apiClient from './AxiosClient'
export default {
  getDepartments() {
    return apiClient.get('/departments')
  },
  getDepartment(id: number) {
    return apiClient.get(`/departments:${id}`)
  },
  getDegrees() {
    return apiClient.get('/degrees')
  },
  getDeegree(id: number) {
    return apiClient.get(`/degrees:${id}`)
  }
}
