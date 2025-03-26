// Description: UserService class that handles user-related operations
// This class is responsible for assigning students to advisors and logging the actions performed by admins.

import { StudentService } from './studentService';
import { AdvisorService } from './advisorService';
import { AdminLogService } from './adminLogService';
import { CommonRepository } from '../repository';
import { BaseService } from './baseService';

export class UserService extends BaseService {
  private studentService: StudentService;
  private advisorService: AdvisorService;
  private adminLogService: AdminLogService;
  private commonRepository: CommonRepository;

  constructor() {
    super();
    this.studentService = new StudentService();
    this.advisorService = new AdvisorService();
    this.adminLogService = new AdminLogService();
    this.commonRepository = new CommonRepository();
  }

  // Assign student to advisor
  async assignAdvisorToStudent(studentId: number, advisorId: number, adminId: number) {
    try {
      // Get student and advisor details
      const student = await this.studentService.getStudentById(studentId);
      const advisor = await this.advisorService.getAdvisorById(advisorId);

      if (!student || !advisor) {
        throw new Error('Student or Advisor not found');
      }

      // Use the CommonRepository's assignAdvisorToStudent method
      const updatedStudent = await this.commonRepository.assignAdvisorToStudent(studentId, advisorId);

      // Log the action
      await this.adminLogService.logAction(
        `Assigned student ${student.first_name} ${student.last_name} (${student.student_id_card}) to advisor ${advisor.first_name} ${advisor.last_name}`,
        adminId,
        studentId,
        advisorId
      );

      return updatedStudent;
    } catch (error) {
      return this.handleError(error, `Error assigning advisor ${advisorId} to student ${studentId}`);
    }
  }
}