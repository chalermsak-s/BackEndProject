// Description: This file contains the AdvisorService class, which provides methods to manage advisor data.
// It includes methods to get all advisors, search for advisors, get an advisor by ID, update an advisor, and delete an advisor.

import { AdvisorRepository, CommonRepository } from '../repository';
import { Advisor } from '../models/advisor';
import { BaseService } from './baseService';

export class AdvisorService extends BaseService {
  private advisorRepository: AdvisorRepository;
  private commonRepository: CommonRepository;

  constructor() {
    super();
    this.advisorRepository = new AdvisorRepository();
    this.commonRepository = new CommonRepository();
  }

  // Get all advisors 
  async getAllAdvisors() {
    try {
      return await this.advisorRepository.getAllAdvisors();
    } catch (error) {
      return this.handleError(error, 'Error retrieving all advisors');
    }
  }

  // Search advisors by name or ID
  async searchAdvisors(query: string) {
    try {
      return await this.advisorRepository.searchAdvisors(query);
    } catch (error) {
      return this.handleError(error, `Error searching advisors with query "${query}"`);
    }
  }

  // Get advisor by ID
  async getAdvisorById(id: number) {
    try {
      return await this.advisorRepository.getAdvisorById(id);
    } catch (error) {
      return this.handleError(error, `Error retrieving advisor with ID ${id}`);
    }
  }

  // Update advisor information
  async updateAdvisor(advisorId: number, data: Partial<Advisor>) {
    try {
      return await this.advisorRepository.updateAdvisor(advisorId, data);
    } catch (error) {
      return this.handleError(error, `Error updating advisor with ID ${advisorId}`);
    }
  }

  // Delete advisor
  async deleteAdvisor(advisorId: number) {
    try {
      return await this.advisorRepository.deleteAdvisor(advisorId);
    } catch (error) {
      return this.handleError(error, `Error deleting advisor with ID ${advisorId}`);
    }
  }

  // Get advisors with the count of students assigned to them
  async getAdvisorsWithStudentCount(page: number = 1, limit: number = 10) {
    try {
      const data = await this.commonRepository.countStudentsByAdvisor();
      const total = data.length;
      
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      
      return {
        data: data.slice(startIndex, endIndex),
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      };
    } catch (error) {
      return this.handleError(error, 'Error retrieving advisor student counts');
    }
  }
}