// Description: This file contains the DashboardService class for retrieving dashboard data.
// It includes methods to get admin dashboard summaries and advisor statistics.

import { AdminRepository } from '../repository';
import { BaseService } from './baseService';

export class DashboardService extends BaseService {
  private adminRepository: AdminRepository;

  constructor() {
    super();
    this.adminRepository = new AdminRepository();
  }
  
  // Get complete admin dashboard summary
  async getAdminDashboardSummary() {
    try {
      const advisorSummary = await this.adminRepository.getAdvisorSummaryWithPagination(1, 1000);
      const dashboardData = await this.adminRepository.getDashboardData();
      
      return {
        advisorSummary,
        dashboardData
      };
    } catch (error) {
      return this.handleError(error, 'Error retrieving admin dashboard summary');
    }
  }
  
  // Get advisor summary with pagination
  async getAdvisorSummaryWithPagination(page: number, limit: number) {
    try {
      return await this.adminRepository.getAdvisorSummaryWithPagination(page, limit);
    } catch (error) {
      return this.handleError(error, 'Error retrieving advisor summary with pagination');
    }
  }

  // Get appointment summary by status
  async getAppointmentSummaryByStatus() {
    try {
      return await this.adminRepository.getAppointmentSummaryByStatus();
    } catch (error) {
      return this.handleError(error, 'Error retrieving appointment summary by status');
    }
  }
}