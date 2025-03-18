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
  // เข้ารหัสรหัสผ่าน
  const hashedPassword = await bcrypt.hashSync(admin.password, numSaltAround);

  console.log("Creating admin data...");
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
    
    console.log(`Admin created: ${createdUser.username}`);
  } catch (error) {
    console.error("Error creating admin!!!", error);
  }
}