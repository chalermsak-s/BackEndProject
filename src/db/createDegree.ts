import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createDegrees() {
  const degrees = [
    { degreeName: "ปริญญาตรี" },
    { degreeName: "ปริญญาโท" },
    { degreeName: "ปริญญาเอก" }
  ];

  console.log("เริ่มสร้างข้อมูลระดับการศึกษา...");

  try {
    for (const degree of degrees) {
      await prisma.degree.create({
        data: degree
      });
      
      console.log(`Created degree: ${degree.degreeName}`);
    }
    
    console.log("Degrees creation completed");
  } catch (error) {
    console.error("Error creating degrees:", error);
  }
}