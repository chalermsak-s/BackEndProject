// Description: This script creates appointment data in the database using Prisma.
// It includes appointment details such as topic, description, requested date, appointment request date/time, student confirmation status, student ID, advisor ID, and appointment status ID.

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create appointment data in the database
export async function createAppointment() {
  const appointments = [
    {
      topic: "appointment 1",
      description: "Final Project",
      requestedDate: new Date("2025-07-12T16:59:56.000Z"),
      appointmentRequestDateTime: "28/7/2025 1.00 P.M.",
      studentConfirmation: true,
      studentId: 5,
      advisorId: 5,
      statusAppointmentId: 1, // approved
    },
    {
      topic: "appointment 2",
      description: "Withdraw Subject",
      requestedDate: new Date("2025-07-13T16:59:56.000Z"),
      appointmentRequestDateTime: "29/7/2025 2.00 P.M.",
      studentConfirmation: true,
      studentId: 6,
      advisorId: 6,
      statusAppointmentId: 2, // pending
    },
    {
      topic: "appointment 3",
      description: "Score Review",
      requestedDate: new Date("2025-07-14T16:59:56.000Z"),
      appointmentRequestDateTime: "30/7/2025_3.00 P.M.",
      studentConfirmation: false,
      studentId: 7,
      advisorId: 9,
      statusAppointmentId: 4, // request is not successful
    },
    {
      topic: "appointment 4",
      description: "Internship Placement",
      requestedDate: new Date("2025-07-15T16:59:56.000Z"),
      appointmentRequestDateTime: "31/7/2025 4.00 P.M.",
      studentConfirmation: true,
      studentId: 8,
      advisorId: 1,
      statusAppointmentId: 1, // approved
    },
    {
      topic: "appointment 5",
      description: "Research Topic Discussion",
      requestedDate: new Date("2025-07-16T16:59:56.000Z"),
      appointmentRequestDateTime: "1/8/2025 8.00 A.M.",
      studentConfirmation: true,
      studentId: 9,
      advisorId: 2,
      statusAppointmentId: 2, // pending
    },
    {
      topic: "appointment 6",
      description: "Course Plan Adjustment",
      requestedDate: new Date("2025-07-18T16:59:56.000Z"),
      appointmentRequestDateTime: "2/8/2025 9.00 A.M.",
      studentConfirmation: true,
      studentId: 10,
      advisorId: 3,
      statusAppointmentId: 3, // rejected
    },
    {
      topic: "appointment 7",
      description: "Career Path Advise",
      requestedDate: new Date("2025-07-19T16:59:56.000Z"),
      appointmentRequestDateTime: "3/8/2025 10.00 A.M.",
      studentConfirmation: false,
      studentId: 11,
      advisorId: 4,
      statusAppointmentId: 4, // request is not successful
    },
    {
      topic: "appointment 8",
      description: "Project Feedback",
      requestedDate: new Date("2025-07-20T16:59:56.000Z"),
      appointmentRequestDateTime: "4/8/2025 11.00 A.M.",
      studentConfirmation: true,
      studentId: 12,
      advisorId: 5,
      statusAppointmentId: 2, // pending
    },
    {
      topic: "appointment 9",
      description: "Course Registration Issue",
      requestedDate: new Date("2025-07-21T16:59:56.000Z"),
      appointmentRequestDateTime: "5/8/2025 12.00 P.M.",
      studentConfirmation: false,
      studentId: 13,
      advisorId: 6,
      statusAppointmentId: 4, // request is not successful
    },
  ];

  console.log("Creating appointment data...");
  
  for (const appointment of appointments) {
    await prisma.appointment.create({
      data: {
        topic: appointment.topic,
        description: appointment.description,
        requestedDate: appointment.requestedDate,
        appointmentRequestDateTime: appointment.appointmentRequestDateTime,
        studentConfirmation: appointment.studentConfirmation,
        studentId: appointment.studentId,
        advisorId: appointment.advisorId,
        statusAppointmentId: appointment.statusAppointmentId,
      }
    });
    console.log(`Created appointment : ${appointment.topic}`);
  }

  console.log("Created appointment data successfully");
}