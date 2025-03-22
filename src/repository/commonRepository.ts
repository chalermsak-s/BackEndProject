// Description: This file contains the CommonRepository class, which includes methods for common database operations.
// It includes methods to count the number of students for each advisor and other shared functionalities.

import { Prisma } from '@prisma/client';
import prisma from './prisma-client';

export class CommonRepository {
  // Count the number of students for each advisor
  async countStudentsByAdvisor(): Promise<any[]> {
    try {
      // Using Prisma query builder instead of raw SQL
      const result = await prisma.advisor.findMany({
        select: {
          id: true,
          first_name: true,
          last_name: true,
          academic_position: {
            select: {
              academic_position_name: true
            }
          },
          _count: {
            select: {
              students: true
            }
          }
        }
      });
      
      // Transform to match the expected output format
      return result.map(advisor => ({
        id: advisor.id,
        first_name: advisor.first_name,
        last_name: advisor.last_name,
        academic_position_name: advisor.academic_position?.academic_position_name,
        studentCount: advisor._count.students
      }));
    } catch (error) {
      console.error('Error counting students by advisor:', error);
      throw error;
    }
  }
  
  // Method to assign advisor to student - centralized to avoid duplication
  async assignAdvisorToStudent(studentId: number, advisorId: number): Promise<any> {
    try {
      // First check if student exists
      const student = await prisma.student.findUnique({
        where: { id: studentId }
      });
      
      if (!student) {
        throw new Error(`Student with ID ${studentId} not found`);
      }
      
      // Check if advisor exists
      const advisor = await prisma.advisor.findUnique({
        where: { id: advisorId }
      });
      
      if (!advisor) {
        throw new Error(`Advisor with ID ${advisorId} not found`);
      }
      
      // Perform the assignment
      const assignment = await prisma.student.update({
        where: { id: studentId },
        data: { advisor_id: advisorId }
      });
      
      // Create a log entry for this assignment
      await prisma.admin_log.create({
        data: {
          action: `Student ${student.first_name} ${student.last_name} assigned to advisor ${advisor.first_name} ${advisor.last_name}`,
          student_id: studentId,
          advisor_id: advisorId
        }
      });
      
      return assignment;
    } catch (error) {
      console.error(`Error assigning advisor ${advisorId} to student ${studentId}:`, error);
      throw error;
    }
  }
}