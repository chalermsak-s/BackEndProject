import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';
const prisma = new PrismaClient();

// ข้อมูลการนัดหมาย
export async function createAppointment() {
  const appointments = [
    {
      topic: "appointment 1",
      description: "Final Project",
      requestedDate: new Date("2025-07-12T16:59:56.000Z"),
      appointmentRequestDateTime: "2025-03-19T12:34:56.789Z",
      studentConfirmation: true,
      studentId: 1,
      advisorId: 1,
      statusAppointmentId: 1, // approved
    },
    {
      topic: "appointment 2",
      description: "Withdraw Subject",
      requestedDate: new Date("2025-07-13T16:59:56.000Z"),
      appointmentRequestDateTime: "2025-03-19T12:34:56.789Z",
      studentConfirmation: true,
      studentId: 2,
      advisorId: 2,
      statusAppointmentId: 2, // pending
    },
    {
      topic: "appointment 3",
      description: "Score Review",
      requestedDate: new Date("2025-07-14T16:59:56.000Z"),
      appointmentRequestDateTime: "2025-03-19T12:34:56.789Z",
      studentConfirmation: false,
      studentId: 3,
      advisorId: 3,
      statusAppointmentId: 4, // request is not successful
    },
    {
      topic: "appointment 4",
      description: "Internship Placement",
      requestedDate: new Date("2025-07-15T16:59:56.000Z"),
      appointmentRequestDateTime: "2025-03-19T12:34:56.789Z",
      studentConfirmation: true,
      studentId: 4,
      advisorId: 1,
      statusAppointmentId: 1, // approved
    },
    {
      topic: "appointment 5",
      description: "Research Topic Discussion",
      requestedDate: new Date("2025-07-16T16:59:56.000Z"),
      appointmentRequestDateTime: "2025-03-19T12:34:56.789Z",
      studentConfirmation: true,
      studentId: 5,
      advisorId: 2,
      statusAppointmentId: 2, // pending
    },
    {
      topic: "appointment 6",
      description: "Course Plan Adjustment",
      requestedDate: new Date("2025-07-18T16:59:56.000Z"),
      appointmentRequestDateTime: "2025-03-19T12:34:56.789Z",
      studentConfirmation: true,
      studentId: 4,
      advisorId: 3,
      statusAppointmentId: 3, // rejected
    },
    {
      topic: "appointment 7",
      description: "Career Path Advise",
      requestedDate: new Date("2025-07-19T16:59:56.000Z"),
      appointmentRequestDateTime: "2025-03-19T12:34:56.789Z",
      studentConfirmation: false,
      studentId: 5,
      advisorId: 1,
      statusAppointmentId: 4, // request is not successful
    },
    {
      topic: "appointment 8",
      description: "Project Feedback",
      requestedDate: new Date("2025-07-20T16:59:56.000Z"),
      appointmentRequestDateTime: "2025-03-19T12:34:56.789Z",
      studentConfirmation: true,
      studentId: 3,
      advisorId: 2,
      statusAppointmentId: 2, // pending
    },
    {
      topic: "appointment 9",
      description: "Course Registration Issue",
      requestedDate: new Date("2025-07-21T16:59:56.000Z"),
      appointmentRequestDateTime: "2025-03-19T12:34:56.789Z",
      studentConfirmation: false,
      studentId: 2,
      advisorId: 3,
      statusAppointmentId: 4, // request is not successful
    },
  ];

  console.log("เริ่มสร้างข้อมูลการนัดหมาย...");
  
  try {
    for (const appointment of appointments) {
      await prisma.appointment.create({
        data: {
          topic: appointment.topic,
          description: appointment.description,
          requested_date: appointment.requestedDate,
          appointment_request_date: appointment.appointmentRequestDateTime,
          student_confirmation: appointment.studentConfirmation,
          student_id: appointment.studentId,
          advisor_id: appointment.advisorId,
          status_appointment_id: appointment.statusAppointmentId,
        }
      });
      console.log(`Created appointment : ${appointment.topic}`);
    }
  } catch (error) {
    console.error("Error creating appointment data:", error);
    return;
  }
  console.log("Created appointment data successfully");
}