// Description: This file contains the AuthRepository class, which interacts with the database for authentication operations.
// It includes methods for user registration, login verification, and password management.

import { Prisma } from "@prisma/client";
import { User} from "../models/user";
import { Student} from "../models/student";
import { Advisor } from "../models/advisor";
import prisma from './prisma-client';

export class AuthRepository {
  // Find user by username
  async findByUsername(username: string): Promise<User | null> {
    try {
      return await prisma.user.findUnique({
        where: {
          username: username,
        },
        include: {
          user_role: true,
        },
      });
    } catch (error) {
      console.error(`Error finding user with username ${username}:`, error);
      throw error;
    }
  }

  // Find user by ID
  async findByUserId(userId: number): Promise<User | null> {
    try {
      return await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          user_role: true,
        },
      });
    } catch (error) {
      console.error(`Error finding user with ID ${userId}:`, error);
      throw error;
    }
  }

  // Register a new user
  async registerUser(username: string, password: string, roleId: number): Promise<User> {
    try {
      // Create the user with associated role
      return await prisma.user.create({
        data: {
          username: username,
          password: password,
          user_role_id: roleId
        },
        include: {
          user_role: true,
        }
      });
    } catch (error) {
      console.error(`Error registering user with username ${username}:`, error);
      throw error;
    }
  }

  // Update user password
  async updatePassword(userId: number, password: string): Promise<User> {
    try {
      return await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: password,
        },
      });
    } catch (error) {
      console.error(`Error updating password for user ID ${userId}:`, error);
      throw error;
    }
  }

  // Register a student
  async registerStudent(studentData: Student, password: string): Promise<any> {
    try {
      // Check if student with this ID card already exists
      const existingStudent = await prisma.student.findUnique({
        where: { student_id_card: studentData.student_id_card }
      });
      
      if (existingStudent) {
        throw new Error('Student ID card already exists');
      }
      
      // Check if username already exists
      const existingUser = await prisma.user.findUnique({
        where: { username: studentData.student_id_card }
      });
      
      if (existingUser) {
        throw new Error('Username already exists');
      }
      
      // Use transaction to ensure data consistency
      return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        // Create student record
        const student = await tx.student.create({
          data: studentData
        });
        
        // Create user account with Student role
        const user = await tx.user.create({
          data: {
            username: studentData.student_id_card,
            password: password,
            student_id: student.id,
            user_role_id: 2 // Assuming 2 is Student role
          }
        });
        
        // Create log
        await tx.admin_log.create({
          data: {
            action: `Student registered: ${studentData.first_name} ${studentData.last_name} (${studentData.student_id_card})`,
            student_id: student.id
          }
        });
        
        return { student, user };
      });
    } catch (error) {
      console.error('Error registering student:', error);
      throw error;
    }
  }

  // Admin creates advisor account
  async createAdvisorAccount(advisorData: Advisor, username: string, password: string): Promise<any> {
    try {
      // Use transaction to ensure data consistency
      return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        // Create advisor record
        const advisor = await tx.advisor.create({
          data: advisorData
        });
        
        // Create user account with Advisor role
        const user = await tx.user.create({
          data: {
            username: username,
            password: password,
            advisor_id: advisor.id,
            user_role_id: 3 // Assuming 3 is Advisor role
          }
        });
        
        // Create log
        await tx.admin_log.create({
          data: {
            action: `Advisor created: ${advisorData.first_name} ${advisorData.last_name}`,
            advisor_id: advisor.id,
            admin_id: advisorData.admin_id
          }
        });
        
        return { advisor, user };
      });
    } catch (error) {
      console.error('Error creating advisor account:', error);
      throw error;
    }
  }
}