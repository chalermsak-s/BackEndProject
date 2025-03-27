import apiClient from './AxiosClient'
export default {
  getFeedbacks() {
    return apiClient.get('/feedbacks');
  },
  getFeedback(id: number) {
    return apiClient.get(`/feedbacks/${id}`);
  },
  getFeedbackByStudentId(id: number) {
    return apiClient.get(`/feedbacks/feedback-student/${id}`);
  },
};
