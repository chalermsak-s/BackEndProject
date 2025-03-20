// Description: Student repository for managing student data in the database.
// This file contains methods to create, read, update, and delete student records.
// It also includes methods to search for students by various criteria and to get all students with their related data.

import { student } from '@prisma/client';
import type { IStudent } from '../models';
import prisma from './prisma-client';

export class StudentRepository {
  
  // Create a new student
  async createStudent(studentData: IStudent): Promise<student> {
    try {
      return await prisma.student.create({ data: studentData });
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  }

  // Get student by user ID
  async getStudentByUserId(userId: number): Promise<student | null> {
    try {
      return await prisma.student.findFirst({ 
        where: { users: { some: { id: userId } } } 
      });
    } catch (error) {
      console.error(`Error retrieving student with user ID ${userId}:`, error);
      throw error;
    }
  }

  // Get student by student ID card
  async getStudentByIdCard(studentIdCard: string): Promise<student | null> {
    try {
      return await prisma.student.findUnique({ where: { student_id_card: studentIdCard } });
    } catch (error) {
      console.error(`Error retrieving student with ID card ${studentIdCard}:`, error);
      throw error;
    }
  }

  // Get student by ID
  async getStudentById(id: number): Promise<student | null> {
    try {
      return await prisma.student.findUnique({ where: { id } });
    } catch (error) {
      console.error(`Error retrieving student with ID ${id}:`, error);
      throw error;
    }
  }

  // Get all students with related data
  async getAllStudents(): Promise<student[]> {
    try {
      return await prisma.student.findMany({
        include: {
          department: true,
          degree: true,
          advisor: { include: { academic_position: true } }
        }
      });
    } catch (error) {
      console.error('Error retrieving all students:', error);
      throw error;
    }
  }

  // Search students by name or ID
  async searchStudents(query: string): Promise<student[]> {
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
          advisor: { include: { academic_position: true } }
        }
      });
    } catch (error) {
      console.error(`Error searching students with query "${query}":`, error);
      throw error;
    }
  }

  // Update student information
  async updateStudent(student_id: number, data: Partial<IStudent>): Promise<student> {
    try {
      return await prisma.student.update({ where: { id: student_id }, data });
    } catch (error) {
      console.error(`Error updating student with ID ${student_id}:`, error);
      throw error;
    }
  }

  // Update student profile picture
  async updateProfilePicture(studentId: number, picturePath: string): Promise<student> {
    try {
      return await prisma.student.update({
        where: { id: studentId },
        data: { picture: picturePath }
      });
    } catch (error) {
      console.error(`Error updating profile picture for student ID ${studentId}:`, error);
      throw error;
    }
  }

  // Delete student and related data
  async deleteStudent(student_id: number): Promise<void> {
    try {
      // Use transaction to ensure data consistency when deleting related records
      await prisma.$transaction(async (tx) => {
        await tx.appointment.deleteMany({ where: { student_id: student_id } });
        await tx.feedback.deleteMany({
          where: { student_id: student_id }
        });
        await tx.admin_log.deleteMany({ where: { student_id: student_id } });

        const student = await tx.student.findUnique({ 
          where: { id: student_id }, 
          include: { users: true } 
        });

        await tx.student.delete({ where: { id: student_id } });

        if (student && student.users.length > 0) {
          for (const user of student.users) {
            await tx.user.delete({ where: { id: user.id } });
          }
        }
      });
    } catch (error) {
      console.error(`Error deleting student with ID ${student_id}:`, error);
      throw error;
    }
  }
}