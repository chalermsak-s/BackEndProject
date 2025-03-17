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

  console.log("เริ่มสร้างข้อมูลตำแหน่งทางวิชาการ...");

  for (const position of academicPositions) {
    try {
      // สร้างตำแหน่งใหม่
      const createdPosition = await prisma.academicPosition.create({
        data: position
      });

      console.log(`สร้างตำแหน่ง ${createdPosition.academicPositionName} เรียบร้อยแล้ว`);
    } catch (error) {
      console.error(`เกิดข้อผิดพลาดในการสร้างตำแหน่ง ${position.academicPositionName}:`, error);
    }
  }

  console.log("สร้างข้อมูลตำแหน่งทางวิชาการเสร็จสิ้น");
}