// Description: This script creates degree data in the database using Prisma.
// It includes degree names such as "ปริญญาตรี", "ปริญญาโท", and "ปริญญาเอก".

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create degree data in the database
export async function createDegrees() {
  const degrees = [
    { degreeName: "ปริญญาตรี" },
    { degreeName: "ปริญญาโท" },
    { degreeName: "ปริญญาเอก" }
  ];

  console.log("Creating degrees...");

  for (const degree of degrees) {
    await prisma.degree.create({
      data: degree
    });
    console.log(`Created degree: ${degree.degreeName}`);
  }
  
    console.log("Degrees creation completed");
}