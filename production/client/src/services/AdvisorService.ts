import apiClient from './AxiosClient'
import {useAuthStore} from '@/stores/auth'
export default {
  getAdvisors() {
    return apiClient.get('/advisors')
  },
  getAdvisor(id: number) {
    return apiClient.get(`/advisors/${id}`)
  },
  getStudentByAdvisor(id: number) {
    return apiClient.get(`/advisors/advisor-feedback/${id}`)
  },
  async getAdvisorIdByUserId() {
    const authStore = useAuthStore()
    const id = Number(authStore.user?.id)
    const response = await apiClient.get(`/advisors/advisorid/${id}`)
    return response.data.advisor_id
  },
}
