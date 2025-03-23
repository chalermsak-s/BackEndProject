// Description: This file contains the AdminRepository class, which interacts with the database for admin operations.
// It includes methods for admin creation, dashboard data retrieval, and user management functions.

import type { Admin } from '../models/admin';
import type { StatusAppointment } from '../models/statusAppointment';
import prisma from './prisma-client';

export class AdminRepository {
  // Create a new admin
  async createAdmin(adminData: Admin): Promise<Admin> {
    try {
      return await prisma.admin.create({ data: adminData });
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  }

  // Get admin by ID
  async getAdminById(id: number): Promise<Admin | null> {
    try {
      return await prisma.admin.findUnique({ where: { id } });
    } catch (error) {
      console.error(`Error retrieving admin with ID ${id}:`, error);
      throw error;
    }
  }

  // Get advisor summary with pagination for admin dashboard
  async getAdvisorSummaryWithPagination(page: number, limit: number): Promise<any> {
    try {
      const skip = (page - 1) * limit;
      
      const advisors = await prisma.advisor.findMany({
        skip,
        take: limit,
        include: {
          academic_position: true,
          department: true,
          _count: {
            select: { students: true }
          }
        },
        orderBy: { id: 'asc' }
      });
      
      const total = await prisma.advisor.count();
      
      return {
        advisors,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      };
    } catch (error) {
      console.error('Error retrieving advisor summary with pagination:', error);
      throw error;
    }
  }

  // Get appointment summary by status
  async getAppointmentSummaryByStatus(): Promise<any> {
    try {
      // First, get all status types
      const statuses = await prisma.status_appointment.findMany();
      
      // For each status, count the number of appointments
      const statusCounts = await Promise.all(
        statuses.map(async (status: StatusAppointment) => {
          const count = await prisma.appointment.count({
            where: {
              status_appointment_id: status.id
            }
          });
          
          return {
            status: status.status,
            statusId: status.id,
            count
          };
        })
      );
      
      // Count total appointments
      const totalAppointments = await prisma.appointment.count();
      
      return {
        data: statusCounts,
        total: totalAppointments
      };
    } catch (error) {
      console.error('Error retrieving appointment summary by status:', error);
      throw error;
    }
  }

  // Search students by name or ID card
  async searchStudents(query: string): Promise<any> {
    try {
      return await prisma.student.findMany({
        where: {
          OR: [
            { student_id_card: { contains: query } },
            { first_name: { contains: query } },
            { last_name: { contains: query } }
          ]
        },
        include: {
          department: true,
          degree: true,
          advisor: {
            include: {
              academic_position: true
            }
          }
        }
      });
    } catch (error) {
      console.error(`Error searching students with query "${query}":`, error);
      throw error;
    }
  }
  
  // Search advisors by name
  async searchAdvisors(query: string): Promise<any> {
    try {
      return await prisma.advisor.findMany({
        where: {
          OR: [
            { first_name: { contains: query } },
            { last_name: { contains: query } }
          ]
        },
        include: {
          academic_position: true,
          department: true,
          _count: {
            select: { students: true }
          }
        }
      });
    } catch (error) {
      console.error(`Error searching advisors with query "${query}":`, error);
      throw error;
    }
  }
  
  // Get all students
  async getAllStudents(): Promise<any> {
    try {
      return await prisma.student.findMany({
        include: {
          department: true,
          degree: true,
          advisor: {
            include: {
              academic_position: true
            }
          }
        },
        orderBy: {
          id: 'asc'
        }
      });
    } catch (error) {
      console.error('Error retrieving all students:', error);
      throw error;
    }
  }
  
  // Get all advisors
  async getAllAdvisors(): Promise<any> {
    try {
      return await prisma.advisor.findMany({
        include: {
          academic_position: true,
          department: true,
          _count: {
            select: { students: true }
          }
        },
        orderBy: {
          id: 'asc'
        }
      });
    } catch (error) {
      console.error('Error retrieving all advisors:', error);
      throw error;
    }
  }
  
  // Get detailed dashboard data
  async getDashboardData(): Promise<any> {
    try {
      // Fetch summary data for students, advisors, appointments, etc.
      const [
        studentCount,
        advisorCount,
        appointmentCount,
        pendingAppointments,
        confirmedAppointments
      ] = await Promise.all([
        prisma.student.count(),
        prisma.advisor.count(),
        prisma.appointment.count(),
        prisma.appointment.count({
          where: { status_appointment_id: 1 } // Pending status
        }),
        prisma.appointment.count({
          where: { status_appointment_id: 3 } // Confirmed status
        })
      ]);
      
      return {
        counts: {
          students: studentCount,
          advisors: advisorCount,
          appointments: appointmentCount,
          pendingAppointments,
          confirmedAppointments
        }
      };
    } catch (error) {
      console.error('Error retrieving dashboard data:', error);
      throw error;
    }
  }
  
  // Assign advisor to student
  async assignAdvisorToStudent(studentId: number, advisorId: number): Promise<any> {
    try {
      return await prisma.student.update({
        where: { id: studentId },
        data: { advisor_id: advisorId },
        include: {
          advisor: {
            include: {
              academic_position: true
            }
          },
          department: true,
          degree: true
        }
      });
    } catch (error) {
      console.error(`Error assigning advisor ${advisorId} to student ${studentId}:`, error);
      throw error;
    }
  }
  
  // Create admin log
  async createAdminLog(adminId: number, action: string): Promise<any> {
    try {
      return await prisma.admin_log.create({
        data: {
          admin_id: adminId,
          action,
          log_date: new Date()
        }
      });
    } catch (error) {
      console.error('Error creating admin log:', error);
      throw error;
    }
  }
  
  // Get admin logs
  async getAdminLogs(adminId: number): Promise<any> {
    try {
      return await prisma.admin_log.findMany({
        where: {
          admin_id: adminId
        },
        orderBy: {
          log_date: 'desc'
        },
        include: {
          student: true,
          advisor: true,
          admin: true
        }
      });
    } catch (error) {
      console.error(`Error retrieving admin logs for admin ID ${adminId}:`, error);
      throw error;
    }
  }
}