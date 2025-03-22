// Description: This file contains the AppointmentService class for managing appointments.
// It includes methods to create, read, update, and manage appointments between students and advisors.

import { AppointmentRepository, StudentRepository } from '../repository';
import { IAppointment } from '../models';
import { APPOINTMENT_STATUS } from '../constants';
import { BaseService } from './baseService';

export class AppointmentService extends BaseService {
  private appointmentRepository: AppointmentRepository;
  private studentRepository: StudentRepository;

  constructor() {
    super();
    this.appointmentRepository = new AppointmentRepository();
    this.studentRepository = new StudentRepository();
  }

  // Student requests an appointment
  async requestAppointment(
    studentId: number,
    topic: string,
    description: string,
    requestedDate: Date
  ) {
    try {
      // Get the student's advisor
      const student = await this.studentRepository.getStudentById(studentId);
      
      if (!student || !student.advisor_id) {
        throw new Error('Student does not have an assigned advisor');
      }
      
      return await this.appointmentRepository.requestAppointment({
        topic,
        description,
        requested_date: requestedDate,
        appointment_request_date: new Date(),
        student_id: studentId,
        advisor_id: student.advisor_id,
        status_appointment_id: APPOINTMENT_STATUS.PENDING
      });
    } catch (error) {
      return this.handleError(error, 'Error requesting appointment');
    }
  }

  // Get appointment by ID
  async getAppointmentById(id: number) {
    try {
      return await this.appointmentRepository.getAppointmentById(id);
    } catch (error) {
      return this.handleError(error, `Error retrieving appointment with ID ${id}`);
    }
  }

  // Get appointments by student ID
  async getAppointmentsByStudentId(studentId: number) {
    try {
      return await this.appointmentRepository.getAppointmentsByStudentId(studentId);
    } catch (error) {
      return this.handleError(error, `Error retrieving appointments for student ID ${studentId}`);
    }
  }

  // Get appointments by advisor ID
  async getAppointmentsByAdvisorId(advisorId: number) {
    try {
      return await this.appointmentRepository.getAppointmentsByAdvisorId(advisorId);
    } catch (error) {
      return this.handleError(error, `Error retrieving appointments for advisor ID ${advisorId}`);
    }
  }

  // Get all appointments with pagination
  async getAllAppointmentsWithPagination(page: number, limit: number) {
    try {
      // Get all appointments from the repository
      const appointments = await this.appointmentRepository.getAppointmentsByAdvisorId(0); // Get all appointments
      
      const total = appointments.length;
      const offset = (page - 1) * limit;
      
      return {
        appointments: appointments.slice(offset, offset + limit),
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit)
      };
    } catch (error) {
      return this.handleError(error, 'Error retrieving appointments with pagination');
    }
  }

  // Advisor sets appointment date
  async updateAppointmentDate(
    id: number, 
    advisorId: number,
    requestedDate: Date
  ) {
    try {
      // Verify advisor owns this appointment
      const appointment = await this.appointmentRepository.getAppointmentById(id);
      
      if (!appointment || appointment.advisor_id !== advisorId) {
        throw new Error('Advisor is not assigned to this appointment');
      }
      
      return await this.appointmentRepository.setAppointmentDate(id, requestedDate);
    } catch (error) {
      return this.handleError(error, `Error updating appointment date for ID ${id}`);
    }
  }

  // Student confirms appointment
  async confirmAppointment(id: number, studentId: number) {
    try {
      // Verify student owns this appointment
      const appointment = await this.appointmentRepository.getAppointmentById(id);
      
      if (!appointment || appointment.student_id !== studentId) {
        throw new Error('Student is not assigned to this appointment');
      }
      
      return await this.appointmentRepository.confirmAppointment(id);
    } catch (error) {
      return this.handleError(error, `Error confirming appointment with ID ${id}`);
    }
  }

  // Get all appointment statuses
  async getAllStatusAppointments() {
    try {
      return await this.appointmentRepository.getAllStatusAppointments();
    } catch (error) {
      return this.handleError(error, 'Error retrieving appointment statuses');
    }
  }

  // Get appointment summary
  async getAppointmentsSummary() {
    try {
      return await this.appointmentRepository.getAppointmentsSummary();
    } catch (error) {
      return this.handleError(error, 'Error retrieving appointment summary');
    }
  }
}