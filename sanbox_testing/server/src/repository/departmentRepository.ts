// Description: This file contains the DepartmentRepository class, which interacts with the database to manage department data.
// It includes methods to get all departments, get a department by ID, get all degrees, get a degree by ID, and get all academic positions.
import { Prisma } from '@prisma/client';
import type { Department } from '../models/department';
import type { Degree } from '../models/degree';
import type { AcademicPosition } from '../models/academicPosition';
import prisma from './prisma-client';

export class DepartmentRepository {
  // Get all departments
  async getAllDepartments(): Promise<Department[]> {
    try {
      return await prisma.department.findMany();
    } catch (error) {
      console.error('Error retrieving all departments:', error);
      throw error;
    }
  }

  // Get a department by ID
  async getDepartmentById(id: number): Promise<Department | null> {
    try {
      return await prisma.department.findUnique({
        where: { id }
      });
    } catch (error) {
      console.error(`Error retrieving department with ID ${id}:`, error);
      throw error;
    }
  }

  // Get all degrees
  async getAllDegrees(): Promise<Degree[]> {
    try {
      return await prisma.degree.findMany();
    } catch (error) {
      console.error('Error retrieving all degrees:', error);
      throw error;
    }
  }

  // Get a degree by ID
  async getDegreeById(id: number): Promise<Degree | null> {
    try {
      return await prisma.degree.findUnique({
        where: { id }
      });
    } catch (error) {
      console.error(`Error retrieving degree with ID ${id}:`, error);
      throw error;
    }
  }

  // Get all academic positions
  async getAllAcademicPositions(): Promise<AcademicPosition[]> {
    try {
      return await prisma.academic_position.findMany();
    } catch (error) {
      console.error('Error retrieving all academic positions:', error);
      throw error;
    }
  }

  // Get an academic position by ID
  async getAcademicPositionById(id: number): Promise<AcademicPosition | null> {
    try {
      return await prisma.academic_position.findUnique({
        where: { id }
      });
    } catch (error) {
      console.error(`Error retrieving academic position with ID ${id}:`, error);
      throw error;
    }
  }
}