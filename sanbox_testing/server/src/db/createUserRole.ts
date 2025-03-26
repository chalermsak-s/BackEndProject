import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

enum Role {
  Admin = 'Admin',
  Advisor = 'Advisor',
  Student = 'Student',
}
// ข้อมูลสิทธิ์ผู้ใช้
export async function createUserRoles() {
  const userroles = [
    { role_name: Role.Admin },
    { role_name: Role.Advisor },
    { role_name: Role.Student }
  ];

  console.log("เริ่มสร้างข้อมูลสิทธิ์ผู้ใช้...");

  for (const userrole of userroles) {
    try {
      // สร้างข้อมูลสิทธิ์ผู้ใช้ใหม่
      const createUserRoles = await prisma.user_role.create({
            data:userrole
      });

      console.log(`สร้างข้อมูลสิทธิ์ผู้ใช้ ${createUserRoles.role_name} เรียบร้อยแล้ว`);
    } catch (error) {
      console.error(`เกิดข้อผิดพลาดในการสร้างข้อมูลสิทธิ์ผู้ใช้ ${userrole.role_name}:`, error);
    }
  }

  console.log("สร้างข้อมูลข้อมูลสิทธิ์ผู้ใช้เสร็จสิ้น");
}