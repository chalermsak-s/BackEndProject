// Description: This file contains the DepartmentRepository class, which interacts with the database to manage department data.
// It includes methods to get all departments, get a department by ID, get all degrees, get a degree by ID, and get all academic positions.

import { department, degree, academic_position } from '@prisma/client';
import type { IDepartment, IDegree, IAcademicPosition } from '../models';
import prisma from './prisma-client';

export class DepartmentRepository {
  // Get all departments
  async getAllDepartments(): Promise<department[]> {
    try {
      return await prisma.department.findMany();
    } catch (error) {
      console.error('Error retrieving all departments:', error);
      throw error;
    }
  }

  // Get a department by ID
  async getDepartmentById(id: number): Promise<department | null> {
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
  async getAllDegrees(): Promise<degree[]> {
    try {
      return await prisma.degree.findMany();
    } catch (error) {
      console.error('Error retrieving all degrees:', error);
      throw error;
    }
  }

  // Get a degree by ID
  async getDegreeById(id: number): Promise<degree | null> {
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
  async getAllAcademicPositions(): Promise<academic_position[]> {
    try {
      return await prisma.academic_position.findMany();
    } catch (error) {
      console.error('Error retrieving all academic positions:', error);
      throw error;
    }
  }

  // Get an academic position by ID
  async getAcademicPositionById(id: number): Promise<academic_position | null> {
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