import apiClient from './AxiosClient'
export default {
  getAcademicpositions() {
    return apiClient.get('/academicpositions');
  },
  getAcademicposition(id: number) {
    return apiClient.get(`/academicpositions/${id}`);
  },
};
