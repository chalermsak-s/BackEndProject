// Description: This file contains the AdvisorRepository class, which provides methods to interact with the database for advisor-related operations.
// It includes methods to create, read, update, and delete advisor records.
// It also includes methods to search for advisors by various criteria and to get all advisors with their related data.

import { Prisma } from '@prisma/client';
import type { Advisor } from '../models/advisor';
import prisma from './prisma-client';

export class AdvisorRepository {

  // Create a new advisor
  async createAdvisor(advisorData: Advisor): Promise<Advisor> {
    try {
      return await prisma.advisor.create({ data: advisorData });
    } catch (error) {
      console.error('Error creating advisor:', error);
      throw error;
    }
  }

  // Get advisor by user ID
  async getAdvisorByUserId(userId: number): Promise<Advisor | null> {
    try {
      return await prisma.advisor.findFirst({ 
        where: { users: { some: { id: userId } } }
      });
    } catch (error) {
      console.error(`Error retrieving advisor with user ID ${userId}:`, error);
      throw error;
    }
  }

  // Get advisor by ID
  async getAdvisorById(id: number): Promise<Advisor | null> {
    try {
      return await prisma.advisor.findUnique({
        where: { id },
        include: {
          academic_position: true,
          department: true
        }
      });
    } catch (error) {
      console.error(`Error retrieving advisor with ID ${id}:`, error);
      throw error;
    }
  }

  // Get all advisors with related data
  async getAllAdvisors(): Promise<Advisor[]> {
    try {
      return await prisma.advisor.findMany({
        include: {
          academic_position: true,
          department: true
        }
      });
    } catch (error) {
      console.error('Error retrieving all advisors:', error);
      throw error;
    }
  }

  // Search advisors by name or ID
  async searchAdvisors(query: string): Promise<Advisor[]> {
    try {
      return await prisma.advisor.findMany({
        where: {
          OR: [
            { first_name: { contains: query } },
            { last_name: { contains: query } },
            {
              department: {
                OR: [
                  { initials: { contains: query } },
                  { department_name: { contains: query } }
                ]
              }
            }
          ]
        },
        include: {
          academic_position: true,
          department: true
        }
      });
    } catch (error) {
      console.error(`Error searching advisors with query "${query}":`, error);
      throw error;
    }
  }

  // Update advisor information
  async updateAdvisor(advisorId: number, data: Partial<Advisor>): Promise<Advisor> {
    try {
      return await prisma.advisor.update({ where: { id: advisorId }, data });
    } catch (error) {
      console.error(`Error updating advisor with ID ${advisorId}:`, error);
      throw error;
    }
  }

  // Update advisor's profile picture
  async updateProfilePicture(advisorId: number, picturePath: string): Promise<Advisor> {
    try {
      return await prisma.advisor.update({
        where: { id: advisorId },
        data: { picture: picturePath }
      });
    } catch (error) {
      console.error(`Error updating profile picture for advisor ID ${advisorId}:`, error);
      throw error;
    }
  }

  // Delete advisor and related data
  async deleteAdvisor(advisorId: number): Promise<void> {
    try {
      // Use transaction to ensure data consistency when deleting related records
      await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const students = await tx.student.findMany({ where: { advisor_id: advisorId } });

        if (students.length > 0) {
          await tx.student.updateMany({
            where: { advisor_id: advisorId },
            data: { advisor_id: null }
          });
        }

        await tx.announcement.deleteMany({ where: { advisor_id: advisorId } });
        await tx.appointment.deleteMany({ where: { advisor_id: advisorId } });
        await tx.feedback.deleteMany({ where: { advisor_id: advisorId } });
        await tx.admin_log.deleteMany({ where: { advisor_id: advisorId } });

        const advisor = await tx.advisor.findUnique({ 
          where: { id: advisorId }, 
          include: { users: true }
        });

        await tx.advisor.delete({ where: { id: advisorId } });

        if (advisor && advisor.users.length > 0) {
          for (const user of advisor.users) {
            await tx.user.delete({ where: { id: user.id } });
          }
        }
      });
    } catch (error) {
      console.error(`Error deleting advisor with ID ${advisorId}:`, error);
      throw error;
    }
  }

  // Get students assigned to an advisor
  async getAdvisorStudents(advisorId: number): Promise<any[]> {
    try {
      return await prisma.student.findMany({
        where: { advisor_id: advisorId },
        include: { department: true, degree: true }
      });
    } catch (error) {
      console.error(`Error retrieving students for advisor ID ${advisorId}:`, error);
      throw error;
    }
  }
}