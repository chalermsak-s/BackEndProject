// Description: This file contains the StudentService class, which provides methods to manage student data.
// It includes methods to get all students, search for students, get a student by ID, update a student, and delete a student.

import type { Student } from '../models/student';
import { StudentRepository } from '../repository';
import { BaseService } from './baseService';
import { uploadFile } from './uploadFileService';

export class StudentService extends BaseService {
  private studentRepository: StudentRepository;
  private bucket: string;
  private filePath: string;

  constructor() {
    super();
    this.studentRepository = new StudentRepository();
    this.bucket = process.env.S3_BUCKET_NAME || 'advisor-system';
    this.filePath = 'profiles';
  }

  // Get all students
  async getAllStudents() {
    try {
      return await this.studentRepository.getAllStudents();
    } catch (error) {
      return this.handleError(error, 'Error retrieving all students');
    }
  }

  // Search students by name or ID
  async searchStudents(query: string) {
    try {
      return await this.studentRepository.searchStudents(query);
    } catch (error) {
      return this.handleError(error, `Error searching students with query "${query}"`);
    }
  }

  // Get student by ID
  async getStudentById(id: number) {
    try {
      return await this.studentRepository.getStudentById(id);
    } catch (error) {
      return this.handleError(error, `Error retrieving student with ID ${id}`);
    }
  }

  // Create a new student
  async createStudent(data: Student) {
    try {
      return await this.studentRepository.createStudent(data);
    } catch (error) {
      return this.handleError(error, 'Error creating student');
    }
  }

  // Update student profile picture
  async updateProfilePicture(studentId: number, file: Express.Multer.File) {
    try {
      // Upload the file to S3 and get the public URL
      const imageUrl = await uploadFile(this.bucket, this.filePath, file);
      
      // Update the student record with the new image URL
      const updatedStudent = await this.studentRepository.updateProfilePicture(studentId, imageUrl);
      
      return updatedStudent;
    } catch (error) {
      return this.handleError(error, `Error updating profile picture for student ID ${studentId}`);
    }
  }

  // Update student information
  async updateStudent(studentId: number, data: Partial<Student>) {
    try {
      return await this.studentRepository.updateStudent(studentId, data);
    } catch (error) {
      return this.handleError(error, `Error updating student with ID ${studentId}`);
    }
  }

  // Delete student by ID
  async deleteStudent(studentId: number) {
    try {
      await this.studentRepository.deleteStudent(studentId);
      return { success: true, message: 'Student deleted successfully' };
    } catch (error) {
      return this.handleError(error, `Error deleting student with ID ${studentId}`);
    }
  }
}