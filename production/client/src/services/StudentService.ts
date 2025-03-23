import apiClient from './AxiosClient'

export default {
  getStudents(pageNo: number, pageSize: number) {
    return apiClient.get("/students?pageNo=" + pageNo + "&pageSize=" + pageSize);
  },
  getStudent(id: number) {
    return apiClient.get(`/students/${id}`);
  },
};
