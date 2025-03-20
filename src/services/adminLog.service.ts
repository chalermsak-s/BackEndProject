// Description: This file contains the AdminLogService class for managing admin activity logs.
// It includes methods to create log entries for admin actions.

import { AdminLogRepository } from '../repository';
import { BaseService } from './base.service';

export class AdminLogService extends BaseService {
  private adminLogRepository: AdminLogRepository;

  constructor() {
    super();
    this.adminLogRepository = new AdminLogRepository();
  }

  // Log an admin action
  async logAction(action: string, adminId: number, studentId?: number, advisorId?: number) {
    try {
      return await this.adminLogRepository.createLog(action, adminId, studentId, advisorId);
    } catch (error) {
      return this.handleError(error, 'Error logging admin action');
    }
  }
}