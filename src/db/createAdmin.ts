import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ข้อมูลผู้ดูแลระบบ
export async function createAdmin() {
  const admin = {
    username: "adminPhu",
    password: "adminPhu123"
  };

  console.log("เริ่มสร้างข้อมูลผู้ดูแลระบบ...");
  
  const createdAdmin = await prisma.admin.create({
    data: {
      username: admin.username,
      password: admin.password
    }
  });
  
  console.log(`สร้างข้อมูลผู้ดูแลระบบเสร็จสิ้น: ${createdAdmin.username}`);
  
  return createdAdmin;
}