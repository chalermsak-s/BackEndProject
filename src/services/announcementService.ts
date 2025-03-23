// Description: This file contains the AnnouncementService class for managing announcements.
// It includes methods to create, read, and delete announcements.

import { AnnouncementRepository } from '../repository';
import { Announcement,AnnouncementInsert } from '../models/announcement';
import { uploadFile } from './uploadFileService';
import { BaseService } from './baseService';
import { Prisma } from '@prisma/client';
import prisma from '@prisma/client';

export class AnnouncementService extends BaseService {
  private announcementRepository: AnnouncementRepository;
  private bucket: string;
  private filePath: string;

  constructor() {
    super();
    this.announcementRepository = new AnnouncementRepository();
    this.bucket = process.env.S3_BUCKET_NAME || 'advisor-system';
    this.filePath = 'announcements';
  }

  // Create a new announcement with optional file attachment
  async createAnnouncement(
    advisorId: number, 
    topic: string, 
    description: string, 
    file?: Express.Multer.File
  ): Promise<AnnouncementInsert> {
    try {
      let fileUrl: string | undefined = undefined;
      
      if (file) {
        // Upload file to S3 and get the public URL
        fileUrl = await uploadFile(this.bucket, this.filePath, file);
      }
      
      // Create the announcement data
      const announcementData: AnnouncementInsert = {
        topic,
        description,
        file: fileUrl,
        posted_date: new Date(),
        advisor_id: advisorId
      };
      
      return await this.announcementRepository.createAnnouncement(announcementData);
    } catch (error) {
      return this.handleError(error, 'Error creating announcement');
    }
  }

  // Get announcement by ID
  async getAnnouncementById(id: number) {
    try {
      return await this.announcementRepository.getAnnouncementById(id);
    } catch (error) {
      return this.handleError(error, `Error retrieving announcement with ID ${id}`);
    }
  }

  // Get announcements by advisor ID
  async getAnnouncementsByAdvisorId(advisorId: number) {
    try {
      return await this.announcementRepository.getAnnouncementsByAdvisorId(advisorId);
    } catch (error) {
      return this.handleError(error, `Error retrieving announcements for advisor ID ${advisorId}`);
    }
  }

  // Get all announcements
  async getAllAnnouncements() {
    try {
      return await this.announcementRepository.getAllAnnouncements();
    } catch (error) {
      return this.handleError(error, 'Error retrieving all announcements');
    }
  }

  // Get announcements for a specific student
  async getAnnouncementsForStudent(studentId: number) {
    try {
      return await this.announcementRepository.getAllAnnouncementsForStudent(studentId);
    } catch (error) {
      return this.handleError(error, `Error retrieving announcements for student ID ${studentId}`);
    }
  }

  // Delete an announcement with authorization check
  async deleteAnnouncement(id: number, advisorId?: number) {
    try {
      if (advisorId) {
        // Verify advisor owns this announcement
        const announcement = await this.announcementRepository.getAnnouncementById(id);
        
        if (!announcement) {
          throw new Error('Announcement not found');
        }
        
        if (announcement.advisor_id !== advisorId) {
          throw new Error('Advisor is not authorized to delete this announcement');
        }
      }
      
      await this.announcementRepository.deleteAnnouncement(id);
      return { success: true, message: 'Announcement deleted successfully' };
    } catch (error) {
      return this.handleError(error, `Error deleting announcement with ID ${id}`);
    }
  }
}