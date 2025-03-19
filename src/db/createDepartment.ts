// Description: This script creates department data in the database using Prisma.
// It includes departments such as "วิศวกรรมซอฟแวร์(หลักสูตรนานาชาติ)", "การจัดการสมัยใหม่และเทคโนโลยีสารสนเทศ", etc.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create department data in the database
export async function createDepartments() {
  const departments = [
    { initials: "SE(International Program)", departmentName: "วิศวกรรมซอฟแวร์(หลักสูตรนานาชาติ)" },
    { initials: "SE(Bilingual Program)", departmentName: "วิศวกรรมซอฟแวร์" },
    { initials: "MMIT", departmentName: "การจัดการสมัยใหม่และเทคโนโลยีสารสนเทศ" },
    { initials: "ANI", departmentName: "แอนนิเมชั่นและวิชวลเอฟเฟกต์" },
    { initials: "DG", departmentName: "ดิจิทัลเกมส์" },
    { initials: "DII", departmentName: "นวัตกรรมดิจิทัล" },
    { initials: "KIM(Bilingual Program)", departmentName: "สื่อศิลปะและการออกแบบสื่อ(หลักสูตรสองภาษา)" },
    { initials: "KIM(International Program)", departmentName: "สื่อศิลปะและการออกแบบสื่อ(หลักสูตรนานาชาติ)" },
    { initials: "DTM", departmentName: "การจัดการธุรกิจดิจิทัล" }
  ];

  console.log("Creating departments...");
  
  for (const department of departments) {
    const createdDepartment = await prisma.department.create({
      data: department
    });
    console.log(`สร้างภาควิชา ${createdDepartment.departmentName} (${createdDepartment.initials}) เรียบร้อยแล้ว`);
  }

  console.log("Departments creation completed");
}