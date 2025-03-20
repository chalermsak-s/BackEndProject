// Description: This file contains the AdminLogRepository class, which interacts with the database to manage admin logs.
// It includes methods to create logs and retrieve logs by admin ID, student ID, or advisor ID.

import { admin_log } from '@prisma/client';
import prisma from './prisma-client';

export class AdminLogRepository {
  // Create a new admin log
  async createLog(
    action: string, 
    adminId?: number, 
    studentId?: number, 
    advisorId?: number
  ): Promise<admin_log> {
    try {
      return await prisma.admin_log.create({
        data: {
          action,
          admin_id: adminId,
          student_id: studentId,
          advisor_id: advisorId,
        }
      });
    } catch (error) {
      console.error('Error creating admin log:', error);
      throw error;
    }
  }

  // Get logs by admin ID
  async getLogsByAdminId(adminId: number): Promise<admin_log[]> {
    try {
      return await prisma.admin_log.findMany({
        where: { admin_id: adminId },
        orderBy: {
          log_date: 'desc'
        },
        include: {
          admin: true,
          student: true,
          advisor: true
        }
      });
    } catch (error) {
      console.error(`Error retrieving logs for admin ID ${adminId}:`, error);
      throw error;
    }
  }

  // Get logs by student ID
  async getLogsByStudentId(studentId: number): Promise<admin_log[]> {
    try {
      return await prisma.admin_log.findMany({
        where: { student_id: studentId },
        orderBy: {
          log_date: 'desc'
        },
        include: {
          admin: true,
          student: true,
          advisor: true
        }
      });
    } catch (error) {
      console.error(`Error retrieving logs for student ID ${studentId}:`, error);
      throw error;
    }
  }

  // Get logs by advisor ID
  async getLogsByAdvisorId(advisorId: number): Promise<admin_log[]> {
    try {
      return await prisma.admin_log.findMany({
        where: { advisor_id: advisorId },
        orderBy: {
          log_date: 'desc'
        },
        include: {
          admin: true,
          student: true,
          advisor: true
        }
      });
    } catch (error) {
      console.error(`Error retrieving logs for advisor ID ${advisorId}:`, error);
      throw error;
    }
  }
}