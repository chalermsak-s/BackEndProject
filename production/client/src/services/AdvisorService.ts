import apiClient from './AxiosClient'
export default {
  getAdvisors() {
    return apiClient.get('/advisors');
  },
  getAdvisor(id: number) {
    return apiClient.get(`/advisors/${id}`);
  },
};
