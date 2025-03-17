import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const numSaltAround = 10;

// ข้อมูลผู้ดูแลระบบ
export async function createAdmin() {
  const admin = {
    username: "adminPhu",
    password: "adminPhu123"
  };

  console.log("เริ่มสร้างข้อมูลผู้ดูแลระบบ...");
  
  // เข้ารหัสรหัสผ่าน
  const hashedPassword = await bcrypt.hashSync(admin.password, numSaltAround);
  
  try {
    // สร้าง user พร้อมกับ admin ในคำสั่งเดียว
    const createdUser = await prisma.user.create({
      data: {
        username: admin.username,
        password: hashedPassword,
        role: UserRole.ADMIN,
        admin: {
          create: {}  // สร้าง admin record ที่เชื่อมโยงกับ user
        }
      },
      include: {
        admin: true
      }
    });
    
    console.log(`สร้างข้อมูลผู้ดูแลระบบเสร็จสิ้น: ${createdUser.username}`);
    return createdUser;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการสร้างผู้ดูแลระบบ:", error);
    throw error;
  }
}