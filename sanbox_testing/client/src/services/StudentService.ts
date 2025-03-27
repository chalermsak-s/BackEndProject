import apiClient from './AxiosClient'
import { useAuthStore } from '@/stores/auth'
export default {
  getStudents(pageNo: number, pageSize: number) {
    return apiClient.get("/students?pageNo=" + pageNo + "&pageSize=" + pageSize);
  },
  getStudent(id: number) {
    return apiClient.get(`/students/${id}`);
  },
  getStudentList() {
    return apiClient.get(`/students`);
  },
  async getStudentIdByUserId(){
    const authStore = useAuthStore()
    const id = Number(authStore.user?.id)
    const response = await apiClient.get(`/students/student-id/${id}`);
    return  response.data.student_id
  },
  async getAdvisorIdByUserId(){
    const authStore = useAuthStore()
    const id = Number(authStore.user?.id)
    const response = await apiClient.get(`/students/student-id/${id}`);
    return  response.data.student.advisor_id
  }
};
