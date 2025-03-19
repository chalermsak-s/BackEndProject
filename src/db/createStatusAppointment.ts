// Description: Create status appointment data in the database using Prisma.
// This script creates status appointment data such as "approved", "pending", "rejected", and "request is not successful".

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create status appointment data in the database
export async function createStatusAppointment() {
  const statuses = [
    { status: "approved" },
    { status: "pending" },
    { status: "rejected" },
    { status: "request is not successful" }
  ];

  console.log("Creating status appointment data...");
  
  for (const status of statuses) {
    await prisma.statusAppointment.create({
      data: {
        status: status.status
      }
    });
  }
  
  console.log("Status appointment data creation completed");
}