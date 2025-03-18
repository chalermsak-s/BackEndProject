import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ข้อมูลตำแหน่งทางวิชาการ
export async function createAcademicPositions() {
  const academicPositions = [
    { academicPositionName: "ศาสตราจารย์" },
    { academicPositionName: "รองศาสตราจารย์" },
    { academicPositionName: "ผู้ช่วยศาสตราจารย์" },
    { academicPositionName: "อาจารย์" }
  ];

  console.log("Creating academic positions...");
  try {
    for (const position of academicPositions) {
      await prisma.academicPosition.create({
        data: position
      });
      console.log(`Created academic position: ${position.academicPositionName}`);
    }
    console.log("Academic positions creation completed");
  } catch (error) {
    console.error("Error creating academic positions:", error);
  }
}