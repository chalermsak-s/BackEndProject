// Description: This file contains the DepartmentService class for managing departments, degrees, and academic positions.
// It includes methods to get all departments, degrees, and academic positions, and to get them by ID.

import { DepartmentRepository } from '../repository';
import { IDepartment, IDegree, IAcademicPosition } from '../models';
import { BaseService } from './baseService';

export class DepartmentService extends BaseService {
  private departmentRepository: DepartmentRepository;

  constructor() {
    super();
    this.departmentRepository = new DepartmentRepository();
  }

  // Get all departments
  async getAllDepartments() {
    try {
      return await this.departmentRepository.getAllDepartments();
    } catch (error) {
      return this.handleError(error, 'Error retrieving all departments');
    }
  }

  // Get department by ID
  async getDepartmentById(id: number) {
    try {
      return await this.departmentRepository.getDepartmentById(id);
    } catch (error) {
      return this.handleError(error, `Error retrieving department with ID ${id}`);
    }
  }

  // Get all degrees
  async getAllDegrees() {
    try {
      return await this.departmentRepository.getAllDegrees();
    } catch (error) {
      return this.handleError(error, 'Error retrieving all degrees');
    }
  }

  // Get degree by ID
  async getDegreeById(id: number) {
    try {
      return await this.departmentRepository.getDegreeById(id);
    } catch (error) {
      return this.handleError(error, `Error retrieving degree with ID ${id}`);
    }
  }

  // Get all academic positions
  async getAllAcademicPositions() {
    try {
      return await this.departmentRepository.getAllAcademicPositions();
    } catch (error) {
      return this.handleError(error, 'Error retrieving all academic positions');
    }
  }

  // Get academic position by ID
  async getAcademicPositionById(id: number) {
    try {
      return await this.departmentRepository.getAcademicPositionById(id);
    } catch (error) {
      return this.handleError(error, `Error retrieving academic position with ID ${id}`);
    }
  }
}