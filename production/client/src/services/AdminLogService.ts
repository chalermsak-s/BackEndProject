import apiClient from './AxiosClient'
export default {
  getAdminLogs() {
    return apiClient.get('/adminlogs');
  },
  getAdminLog(id: number) {
    return apiClient.get(`/adminlogs/${id}`);
  },
};
