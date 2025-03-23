// Description: This file contains the AnnouncementRepository class, which interacts with the database to perform CRUD operations on announcements.
// It includes methods to create, read, update, and delete announcements.
// It also includes methods to get announcements by advisor ID, student ID, and to get all announcements.

import { Prisma } from '@prisma/client';
import type { Announcement, AnnouncementInsert } from '../models/announcement';
import prisma from './prisma-client';

export class AnnouncementRepository {
  // Create a new announcement
  async createAnnouncement(announcementData: AnnouncementInsert): Promise<AnnouncementInsert> {
    try {
      return await prisma.announcement.create({
        data: announcementData
      });
    } catch (error) {
      console.error('Error creating announcement:', error);
      throw error;
    }
  }

  // Get all announcements
  async getAllAnnouncements(): Promise<Announcement[]> {
    try {
      return await prisma.announcement.findMany({
        include: {
          advisor: {
            include: {
              academic_position: true
            }
          }
        },
        orderBy: {
          posted_date: 'desc'
        }
      });
    } catch (error) {
      console.error('Error retrieving all announcements:', error);
      throw error;
    }
  }

  // Get announcement by ID
  async getAnnouncementById(id: number): Promise<Announcement | null> {
    try {
      return await prisma.announcement.findUnique({
        where: { id },
        include: {
          advisor: {
            include: {
              academic_position: true
            }
          }
        }
      });
    } catch (error) {
      console.error(`Error retrieving announcement with ID ${id}:`, error);
      throw error;
    }
  }

  // Get all announcements by advisor ID
  async getAnnouncementsByAdvisorId(advisorId: number): Promise<Announcement[]> {
    try {
      return await prisma.announcement.findMany({
        where: { advisor_id: advisorId },
        include: {
          advisor: {
            include: {
              academic_position: true
            }
          }
        },
        orderBy: {
          posted_date: 'desc'
        }
      });
    } catch (error) {
      console.error(`Error retrieving announcements for advisor ID ${advisorId}:`, error);
      throw error;
    }
  }

  // Get all announcements for a student
  async getAllAnnouncementsForStudent(studentId: number): Promise<Announcement[]> {
    try {
      // Get the student's advisor ID
      const student = await prisma.student.findUnique({
        where: { id: studentId },
        select: { advisor_id: true }
      });
      
      // If no advisor, return only general announcements
      if (!student || !student.advisor_id) {
        return await prisma.announcement.findMany({
          where: { advisor_id: null }, // General announcements
          include: {
            advisor: {
              include: {
                academic_position: true
              }
            }
          },
          orderBy: {
            posted_date: 'desc'
          }
        });
      }
      
      // If advisor exists, return both general announcements and advisor-specific announcements
      return await prisma.announcement.findMany({
        where: {
          OR: [
            { advisor_id: student.advisor_id },
            { advisor_id: null }
          ]
        },
        include: {
          advisor: {
            include: {
              academic_position: true
            }
          }
        },
        orderBy: {
          posted_date: 'desc'
        }
      });
    } catch (error) {
      console.error(`Error retrieving announcements for student ID ${studentId}:`, error);
      throw error;
    }
  }

  // Upload announcement file
  async uploadAnnouncementFile(id: number, filePath: string): Promise<Announcement> {
    try {
      return await prisma.announcement.update({
        where: { id },
        data: { file: filePath }
      });
    } catch (error) {
      console.error(`Error uploading file for announcement ID ${id}:`, error);
      throw error;
    }
  }

  // Get announcement file path
  async getAnnouncementFile(id: number): Promise<string | null> {
    try {
      const announcement = await prisma.announcement.findUnique({
        where: { id },
        select: { file: true }
      });
      return announcement?.file || null;
    } catch (error) {
      console.error(`Error retrieving file for announcement ID ${id}:`, error);
      throw error;
    }
  }

  // Delete an announcement
  async deleteAnnouncement(id: number): Promise<void> {
    try {
      await prisma.announcement.delete({
        where: { id }
      });
    } catch (error) {
      console.error(`Error deleting announcement with ID ${id}:`, error);
      throw error;
    }
  }
}