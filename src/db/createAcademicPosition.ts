import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ข้อมูลตำแหน่งทางวิชาการ
export async function createAcademicPositions() {
  const academicPositions = [
    { academic_position_name: "ศาสตราจารย์" },
    { academic_position_name: "รองศาสตราจารย์" },
    { academic_position_name: "ผู้ช่วยศาสตราจารย์" },
    { academic_position_name: "อาจารย์" }
  ];

  console.log("Creating academic positions...");
  try {
    for (const position of academicPositions) {
      await prisma.academic_position.create({
        data: position
      });
      console.log(`Created academic position: ${position.academic_position_name}`);
    }
    console.log("Academic positions creation completed");
  } catch (error) {
    console.error("Error creating academic positions:", error);
  }
}