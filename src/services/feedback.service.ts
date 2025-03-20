// Description: This file contains the FeedbackService class for managing feedback between students and advisors.
// It includes methods to create, read, and retrieve feedback communications.

import { FeedbackRepository, StudentRepository } from '../repository';
import { IFeedback } from '../models';
import { RESPONDER_TYPE } from '../constants';
import { BaseService } from './base.service';

export class FeedbackService extends BaseService {
  private feedbackRepository: FeedbackRepository;
  private studentRepository: StudentRepository;

  constructor() {
    super();
    this.feedbackRepository = new FeedbackRepository();
    this.studentRepository = new StudentRepository();
  }

  // Create feedback from advisor to student
  async createAdvisorFeedback(advisorId: number, studentId: number, message: string) {
    try {
      // Validate that the advisor is assigned to this student
      const student = await this.studentRepository.getStudentById(studentId);
      
      if (!student || student.advisor_id !== advisorId) {
        throw new Error('Advisor is not assigned to this student');
      }
      
      return await this.feedbackRepository.createFeedback({
        feedback: message,
        timestamp: new Date(),
        student_id: studentId,
        advisor_id: advisorId,
        responder_id: RESPONDER_TYPE.ADVISOR  // Using constant from constants file
      });
    } catch (error) {
      return this.handleError(error, 'Error creating advisor feedback');
    }
  }

  // Create feedback from student to advisor
  async createStudentFeedback(studentId: number, advisorId: number, message: string) {
    try {
      // Validate that the student is assigned to this advisor
      const student = await this.studentRepository.getStudentById(studentId);
      
      if (!student || student.advisor_id !== advisorId) {
        throw new Error('Student is not assigned to this advisor');
      }
      
      return await this.feedbackRepository.createFeedback({
        feedback: message,
        timestamp: new Date(),
        student_id: studentId,
        advisor_id: advisorId,
        responder_id: RESPONDER_TYPE.STUDENT  // Using constant from constants file
      });
    } catch (error) {
      return this.handleError(error, 'Error creating student feedback');
    }
  }

  // Get feedback conversation between a student and advisor
  async getFeedbackConversation(studentId: number, advisorId: number) {
    try {
      return await this.feedbackRepository.getFeedbackConversation(studentId, advisorId);
    } catch (error) {
      return this.handleError(error, `Error retrieving feedback conversation between student ${studentId} and advisor ${advisorId}`);
    }
  }

  // Get all feedbacks for an advisor
  async getAdvisorFeedbacks(advisorId: number) {
    try {
      return await this.feedbackRepository.getAdvisorFeedbacks(advisorId);
    } catch (error) {
      return this.handleError(error, `Error retrieving feedbacks for advisor ID ${advisorId}`);
    }
  }

  // Get all feedbacks for a student
  async getStudentFeedbacks(studentId: number) {
    try {
      return await this.feedbackRepository.getStudentFeedbacks(studentId);
    } catch (error) {
      return this.handleError(error, `Error retrieving feedbacks for student ID ${studentId}`);
    }
  }
  
  // Add a reply to a feedback
  async addReply(parentFeedbackId: number, senderId: number, responderType: number, message: string) {
    try {
      const parentFeedback = await this.feedbackRepository.getFeedbackById(parentFeedbackId);
      
      if (!parentFeedback) {
        throw new Error('Parent feedback not found');
      }
      
      // ตรวจสอบและแปลงค่า null เป็น undefined เพื่อให้ตรงกับ type Omit<IFeedback, "id">
      const student_id = parentFeedback.student_id === null ? undefined : parentFeedback.student_id;
      const advisor_id = parentFeedback.advisor_id === null ? undefined : parentFeedback.advisor_id;
      
      if (!student_id || !advisor_id) {
        throw new Error('Invalid parent feedback: missing student or advisor ID');
      }
      
      const replyData = {
        feedback: message,
        timestamp: new Date(),
        student_id: student_id,
        advisor_id: advisor_id,
        responder_id: responderType,
        parent_feedback_id: parentFeedbackId
      };
      
      return await this.feedbackRepository.addReply(replyData);
    } catch (error) {
      return this.handleError(error, `Error adding reply to feedback ID ${parentFeedbackId}`);
    }
  }
}