// Description: This file contains the AdminService class, which provides methods for admin operations.
// It includes methods for admin dashboard data, advisor management, and student management.

import { AdminRepository, AdminLogRepository, CommonRepository } from '../repository';
import { IAdmin } from '../models';
import { BaseService } from './baseService';

export class AdminService extends BaseService {
  private adminRepository: AdminRepository;
  private adminLogRepository: AdminLogRepository;
  private commonRepository: CommonRepository;

  constructor() {
    super();
    this.adminRepository = new AdminRepository();
    this.adminLogRepository = new AdminLogRepository();
    this.commonRepository = new CommonRepository();
  }

  // Create a new admin
  async createAdmin(adminData: IAdmin): Promise<any> {
    try {
      return await this.adminRepository.createAdmin(adminData);
    } catch (error) {
      return this.handleError(error, 'Error creating admin');
    }
  }

  // Get admin by ID
  async getAdminById(id: number): Promise<any> {
    try {
      return await this.adminRepository.getAdminById(id);
    } catch (error) {
      return this.handleError(error, `Error retrieving admin with ID ${id}`);
    }
  }

  // Get advisor summary with pagination
  async getAdvisorSummaryWithPagination(page: number, limit: number): Promise<any> {
    try {
      return await this.adminRepository.getAdvisorSummaryWithPagination(page, limit);
    } catch (error) {
      return this.handleError(error, 'Error retrieving advisor summary with pagination');
    }
  }

  // Assign advisor to student
  async assignAdvisorToStudent(studentId: number, advisorId: number, adminId: number): Promise<any> {
    try {
      // Log the action first
      await this.adminLogRepository.createLog(
        `Admin assigned advisor (ID: ${advisorId}) to student (ID: ${studentId})`,
        adminId,
        studentId,
        advisorId
      );
      
      // Use the common repository implementation
      return await this.commonRepository.assignAdvisorToStudent(studentId, advisorId);
    } catch (error) {
      return this.handleError(error, `Error assigning advisor ${advisorId} to student ${studentId}`);
    }
  }

  // Get admin logs
  async getAdminLogs(adminId: number): Promise<any> {
    try {
      return await this.adminLogRepository.getLogsByAdminId(adminId);
    } catch (error) {
      return this.handleError(error, `Error retrieving logs for admin ID ${adminId}`);
    }
  }

  // Get dashboard summary
  async getDashboardSummary(adminId: number): Promise<any> {
    try {
      // Get advisor summary data
      const advisorSummary = await this.adminRepository.getAdvisorSummaryWithPagination(1, 5);
      
      // Get dashboard data
      const dashboardData = await this.adminRepository.getDashboardData();
      
      // Log the dashboard view
      await this.adminLogRepository.createLog(
        "Admin viewed dashboard summary",
        adminId
      );
      
      return {
        advisorSummary,
        dashboardData
      };
    } catch (error) {
      return this.handleError(error, 'Error retrieving dashboard summary');
    }
  }

  async getAppointmentSummaryByStatus() {
    try {
      return await this.adminRepository.getAppointmentSummaryByStatus();
    } catch (error) {
      return this.handleError(error, 'Error retrieving appointment summary by status');
    }
  }

  // Search students by name or ID
  async searchStudents(query: string): Promise<any> {
    try {
      return await this.adminRepository.searchStudents(query);
    } catch (error) {
      return this.handleError(error, `Error searching students with query "${query}"`);
    }
  }

  // Search advisors by name or ID
  async searchAdvisors(query: string): Promise<any> {
    try {
      return await this.adminRepository.searchAdvisors(query);
    } catch (error) {
      return this.handleError(error, `Error searching advisors with query "${query}"`);
    }
  }

  
}