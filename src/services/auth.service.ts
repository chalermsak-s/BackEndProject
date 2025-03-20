// Description: This file contains the AuthService class for user authentication and authorization.
// It includes methods for user login, registration, and password management.

import { AuthRepository, StudentRepository, AdvisorRepository } from '../repository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { IStudent, IAdvisor } from '../models';
import { USER_ROLE } from '../constants';
import { BaseService } from './base.service';

export class AuthService extends BaseService {
  private authRepository: AuthRepository;
  private studentRepository: StudentRepository;
  private advisorRepository: AdvisorRepository;

  constructor() {
    super();
    this.authRepository = new AuthRepository();
    this.studentRepository = new StudentRepository();
    this.advisorRepository = new AdvisorRepository();
  }
  
  generatetoken(userId: number){    
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '5h'});
  }

  // Find user by username
  async findByUsername(username: string) {
    try {
      return await this.authRepository.findByUsername(username);
    } catch (error) {
      return this.handleError(error, `Error finding user with username ${username}`);
    }
  }

    // Find user by user ID
  async findByUserId(userId: number) {
    try {
      return await this.authRepository.findByUserId(userId);
    } catch (error) {
      return this.handleError(error, `Error finding user with ID ${userId}`);
    }
  }

  // Compare provided password with hashed password
  async comparePassword(password: string, hash: string) {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      return this.handleError(error, 'Error comparing passwords');
    }
  }

  // Generate JWT token
  generateToken(userId: number) {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }
      return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '5h'});
    } catch (error) {
      return this.handleError(error, 'Error generating token');
    }
  }

  // Get user from JWT token
  async getUserFromToken(token: string) {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
      return await this.authRepository.findByUserId(decoded.userId);
    } catch (error) {
      return this.handleError(error, 'Error verifying token');
    }   
  }

  // Register a new user
  async registerUser(username: string, password: string, roleId: number) {
    try {
      const hashedPassword = bcrypt.hashSync(password);
      return await this.authRepository.registerUser(username, hashedPassword, roleId);
    } catch (error) {
      return this.handleError(error, 'Error registering user');
    }
  }

  // Register a new student
  async registerStudent(studentData: IStudent, password: string) {
    try {
      // Use the repository's transaction to handle this operation
      return await this.authRepository.registerStudent(studentData, bcrypt.hashSync(password));
    } catch (error) {
      return this.handleError(error, 'Error registering student');
    }
  }

  // Register a new advisor
  async registerAdvisor(advisorData: IAdvisor, username: string, password: string, adminId: number) {
    try {
      // Use the repository's transaction to handle this operation
      return await this.authRepository.createAdvisorAccount(
        advisorData, 
        username, 
        bcrypt.hashSync(password)
      );
    } catch (error) {
      return this.handleError(error, 'Error registering advisor');
    }
  }

  // Update user password
  async updatePassword(userId: number, password: string) {
    try {
      const hashedPassword = bcrypt.hashSync(password);
      return await this.authRepository.updatePassword(userId, hashedPassword);
    } catch (error) {
      return this.handleError(error, `Error updating password for user ID ${userId}`);
    }
  }
}