import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// ข้อมูลอาจารย์ที่ปรึกษา
export async function createAdvisors() {
  const advisors = [
    {
      username: "somchai_s", 
      password: "password123",
      firstName: "สมชาย", 
      lastName: "สมศักดิ์",
      picture: "somchai.jpg",
      academicPositionName: "รองศาสตราจารย์",
      departmentName: "วิทยาการคอมพิวเตอร์"
    },
    {
      username: "sompong_l", 
      password: "password123",
      firstName: "สมปอง", 
      lastName: "ใจดี",
      picture: "sompong.jpg",
      academicPositionName: "ผู้ช่วยศาสตราจารย์",
      departmentName: "เทคโนโลยีสารสนเทศ"
    },
    {
      username: "somsri_p", 
      password: "password123",
      firstName: "สมศรี", 
      lastName: "ประเสริฐ",
      picture: "somsri.jpg",
      academicPositionName: "อาจารย์",
      departmentName: "วิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ"
    }
  ];

  console.log("เริ่มสร้างข้อมูลอาจารย์ที่ปรึกษา...");

  for (const advisor of advisors) {
    try {
      // ค้นหา academicPosition
      const academicPosition = await prisma.academicPosition.findFirst({
        where: { academicPositionName: advisor.academicPositionName }
      });

      if (!academicPosition) {
        console.error(`ไม่พบตำแหน่งทางวิชาการ "${advisor.academicPositionName}" กรุณาสร้างตำแหน่งก่อน`);
        continue;
      }

      // ค้นหา department
      const department = await prisma.department.findFirst({
        where: { departmentName: advisor.departmentName }
      });

      if (!department) {
        console.error(`ไม่พบภาควิชา "${advisor.departmentName}" กรุณาสร้างภาควิชาก่อน`);
        continue;
      }

      // เข้ารหัสรหัสผ่าน
      const hashedPassword = await bcrypt.hash(advisor.password, 10);

      // สร้างผู้ใช้และอาจารย์
      const createdUser = await prisma.user.create({
        data: {
          username: advisor.username,
          password: hashedPassword,
          role: UserRole.ADVISOR,
          advisor: {
            create: {
              firstName: advisor.firstName,
              lastName: advisor.lastName,
              picture: advisor.picture,
              academicPositionId: academicPosition.id,
              departmentId: department.id
            }
          }
        },
        include: {
          advisor: {
            include: {
              academicPosition: true,
              department: true
            }
          }
        }
      });

      console.log(`สร้างข้อมูลอาจารย์ ${createdUser.advisor?.firstName} ${createdUser.advisor?.lastName} เรียบร้อยแล้ว`);
    } catch (error) {
      console.error(`เกิดข้อผิดพลาดในการสร้างอาจารย์ ${advisor.firstName} ${advisor.lastName}:`, error);
    }
  }

  console.log("สร้างข้อมูลอาจารย์ที่ปรึกษาเสร็จสิ้น");
}