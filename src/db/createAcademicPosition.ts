// Description: This script creates academic positions in the database using Prisma.
// It includes positions such as "ศาสตราจารย์", "รองศาสตราจารย์", "ผู้ช่วยศาสตราจารย์", and "อาจารย์".

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create academic positions in the database
export async function createAcademicPositions() {
  const academicPositions = [
    { academicPositionName: "ศาสตราจารย์" },
    { academicPositionName: "รองศาสตราจารย์" },
    { academicPositionName: "ผู้ช่วยศาสตราจารย์" },
    { academicPositionName: "อาจารย์" }
  ];

  console.log("Creating academic positions...");
  
  for (const position of academicPositions) {
    await prisma.academicPosition.create({
      data: position
    });
    console.log(`Created academic position: ${position.academicPositionName}`);
  }
  console.log("Academic positions creation completed");
}