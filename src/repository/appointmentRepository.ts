// Description: This file contains the AppointmentRepository class, which interacts with the database to manage appointment data.
// It includes methods to create, read, update, and delete appointments.
// It also includes methods to get appointments by student ID, advisor ID, and to get all appointments.

import { Prisma } from '@prisma/client';
import type { Appointment } from '../models/appointment';
import type { StatusAppointment } from '../models/statusAppointment';
import prisma from './prisma-client';

export class AppointmentRepository {
  // Create a new appointment
  async createAppointment(appointmentData: Appointment): Promise<Appointment> {
    try {
      return await prisma.appointment.create({
        data: appointmentData
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }

  // Get appointment by ID
  async getAppointmentById(id: number): Promise<Appointment | null> {
    try {
      return await prisma.appointment.findUnique({
        where: { id },
        include: {
          student: true,
          advisor: {
            include: {
              academic_position: true
            }
          },
          status: true
        }
      });
    } catch (error) {
      console.error(`Error retrieving appointment with ID ${id}:`, error);
      throw error;
    }
  }

  // Get all appointments by student ID
  async getAppointmentsByStudentId(studentId: number): Promise<Appointment[]> {
    try {
      return await prisma.appointment.findMany({
        where: { student_id: studentId },
        include: {
          advisor: {
            include: {
              academic_position: true
            }
          },
          status: true
        },
        orderBy: {
          requested_date: 'asc'
        }
      });
    } catch (error) {
      console.error(`Error retrieving appointments for student ID ${studentId}:`, error);
      throw error;
    }
  }

  // Get all appointments for an advisor
  async getAppointmentsByAdvisorId(advisorId: number): Promise<Appointment[]> {
    try {
      return await prisma.appointment.findMany({
        where: { advisor_id: advisorId },
        include: {
          student: true,
          status: true
        },
        orderBy: {
          requested_date: 'asc'
        }
      });
    } catch (error) {
      console.error(`Error retrieving appointments for advisor ID ${advisorId}:`, error);
      throw error;
    }
  }

  // Update appointment
  async updateAppointment(id: number, appointmentData: Partial<Appointment>): Promise<Appointment> {
    try {
      return await prisma.appointment.update({
        where: { id },
        data: appointmentData
      });
    } catch (error) {
      console.error(`Error updating appointment with ID ${id}:`, error);
      throw error;
    }
  }

  // Get all status appointments
  async getAllStatusAppointments(): Promise<StatusAppointment[]> {
    try {
      return await prisma.status_appointment.findMany();
    } catch (error) {
      console.error('Error retrieving all status appointments:', error);
      throw error;
    }
  }

  // Get appointment summary
  async getAppointmentsSummary(): Promise<any[]> {
    try {
      // Using Prisma's query builder instead of raw SQL for better type safety
      const statuses = await prisma.status_appointment.findMany({
        include: {
          appointments: {
            include: {
              student: {
                select: {
                  first_name: true,
                  last_name: true
                }
              },
              advisor: {
                select: {
                  first_name: true,
                  last_name: true
                }
              }
            }
          }
        }
      });
      
      // Transform the data to the desired output format
      return statuses.map((status: { status: string; appointments: any[] }) => {
        return {
          status: status.status,
          count: status.appointments.length,
          details: status.appointments.map(appt => {
            return `Student: ${appt.student?.first_name} ${appt.student?.last_name}, 
            Advisor: ${appt.advisor?.first_name} ${appt.advisor?.last_name}, 
            Date: ${appt.requested_date.toISOString().split('T')[0]}`;
          }).join('|')
        };
      });
    } catch (error) {
      console.error('Error retrieving appointment summary:', error);
      throw error;
    }
  }

  // Student requests an appointment
  async requestAppointment(appointmentData: Omit<Appointment, 'id' | 'student_confirmation'>): Promise<Appointment> {
    try {
      return await prisma.appointment.create({
        data: {
          ...appointmentData,
          student_confirmation: false,
          status_appointment_id: 1, // Pending
        },
        include: {
          student: true,
          advisor: true,
          status: true
        }
      });
    } catch (error) {
      console.error('Error requesting appointment:', error);
      throw error;
    }
  }

  // Advisor sets appointment date
  async setAppointmentDate(id: number, requestedDate: Date): Promise<Appointment> {
    try {
      return await prisma.appointment.update({
        where: { id },
        data: {
          requested_date: requestedDate,
          status_appointment_id: 2, // Awaiting student confirmation
        },
        include: {
          student: true,
          advisor: true,
          status: true
        }
      });
    } catch (error) {
      console.error(`Error setting appointment date for ID ${id}:`, error);
      throw error;
    }
  }

  // Student confirms appointment
  async confirmAppointment(id: number): Promise<Appointment> {
    try {
      const appointment = await prisma.appointment.findUnique({
        where: { id },
        select: { status_appointment_id: true }
      });
      
      if (!appointment) {
        throw new Error('Appointment not found');
      }
      
      if (appointment.status_appointment_id !== 2) {
        throw new Error('Appointment cannot be confirmed because it is not in awaiting confirmation status');
      }
      
      return await prisma.appointment.update({
        where: { id },
        data: {
          student_confirmation: true,
          status_appointment_id: 3, // Confirmed
        },
        include: {
          student: true,
          advisor: true,
          status: true
        }
      });
    } catch (error) {
      console.error(`Error confirming appointment with ID ${id}:`, error);
      throw error;
    }
  }

  // Get detailed appointment summary for admin dashboard
  async getDetailedAppointmentSummary(): Promise<any> {
    try {
      return await prisma.status_appointment.findMany({
        include: {
          appointments: {
            include: {
              student: {
                select: {
                  first_name: true,
                  last_name: true,
                  student_id_card: true
                }
              },
              advisor: {
                select: {
                  first_name: true,
                  last_name: true,
                  academic_position: true
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error retrieving detailed appointment summary:', error);
      throw error;
    }
  }
}