// Description: User repository for managing user and admin data in the database.
// This file contains methods to create, read, update, and delete user and admin records.
// It also includes methods to search for users by various criteria and to get all users with their related data.

import { Prisma } from '@prisma/client';
import type { User} from '../models/user';
import type { Admin } from '../models/admin';
import prisma from './prisma-client';

export class UserRepository {

  // Create a new user
  async createUser(userData: User): Promise<User> {
    try {
      return await prisma.user.create({ data: userData });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Get user by ID
  async getUserById(id: number): Promise<User | null> {
    try {
      return await prisma.user.findUnique({ where: { id } });
    } catch (error) {
      console.error(`Error retrieving user with ID ${id}:`, error);
      throw error;
    }
  }

  // Get user by username
  async getUserByUsername(username: string): Promise<User | null> {
    try {
      return await prisma.user.findUnique({ where: { username } });
    } catch (error) {
      console.error(`Error retrieving user with username ${username}:`, error);
      throw error;
    }
  }

  // Create a new admin
  async createAdmin(adminData: Admin): Promise<Admin> {
    try {
      return await prisma.admin.create({ data: adminData });
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  }

  // Get admin by user ID
  async getAdminByUserId(userId: number): Promise<Admin | null> {
    try {
      return await prisma.admin.findFirst({ where: { users: { some: { id: userId } } } });
    } catch (error) {
      console.error(`Error retrieving admin with user ID ${userId}:`, error);
      throw error;
    }
  }

  // Delete a user
  async deleteUser(userId: number): Promise<void> {
    try {
      await prisma.user.delete({ where: { id: userId } });
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      throw error;
    }
  }
}