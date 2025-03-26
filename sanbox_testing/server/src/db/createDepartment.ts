import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ข้อมูลภาควิชา
export async function createDepartments() {
  const departments = [
    { initials: "SE(International Program)", department_name: "วิศวกรรมซอฟแวร์(หลักสูตรนานาชาติ)" },
    { initials: "SE(Bilingual Program)", department_name: "วิศวกรรมซอฟแวร์" },
    { initials: "MMIT", department_name: "การจัดการสมัยใหม่และเทคโนโลยีสารสนเทศ" },
    { initials: "ANI", department_name: "แอนนิเมชั่นและวิชวลเอฟเฟกต์" },
    { initials: "DG", department_name: "ดิจิทัลเกมส์" },
    { initials: "DII", department_name: "นวัตกรรมดิจิทัล" },
    { initials: "KIM(Bilingual Program)", department_name: "สื่อศิลปะและการออกแบบสื่อ(หลักสูตรสองภาษา)" },
    { initials: "KIM(International Program)", department_name: "สื่อศิลปะและการออกแบบสื่อ(หลักสูตรนานาชาติ)" },
    { initials: "DTM", department_name: "การจัดการธุรกิจดิจิทัล" }
  ];

  console.log("เริ่มสร้างข้อมูลภาควิชา...");

  for (const department of departments) {
    try {
      // สร้างภาควิชาใหม่
      const createdDepartment = await prisma.department.create({
        data: department
      });

      console.log(`สร้างภาควิชา ${createdDepartment.department_name} (${createdDepartment.initials}) เรียบร้อยแล้ว`);
    } catch (error) {
      console.error(`เกิดข้อผิดพลาดในการสร้างภาควิชา ${department.department_name}:`, error);
    }
  }

  console.log("สร้างข้อมูลภาควิชาเสร็จสิ้น");
}