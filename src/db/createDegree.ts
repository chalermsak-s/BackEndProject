import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ข้อมูลระดับการศึกษา
export async function createDegrees() {
  const degrees = [
    { degreeName: "ปริญญาตรี" },
    { degreeName: "ปริญญาโท" },
    { degreeName: "ปริญญาเอก" }
  ];

  console.log("เริ่มสร้างข้อมูลระดับการศึกษา...");

  for (const degree of degrees) {
    try {
      // สร้างระดับการศึกษาใหม่
      const createdDegree = await prisma.degree.create({
        data: degree
      });

      console.log(`สร้างระดับการศึกษา ${createdDegree.degreeName} เรียบร้อยแล้ว`);
    } catch (error) {
      console.error(`เกิดข้อผิดพลาดในการสร้างระดับการศึกษา ${degree.degreeName}:`, error);
    }
  }

  console.log("สร้างข้อมูลระดับการศึกษาเสร็จสิ้น");
}