import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const numSaltAround = 10;

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

  try {
    for (const advisor of advisors) {
      // ค้นหาตำแหน่งทางวิชาการ
      const academicPosition = await prisma.academicPosition.findFirst({
        where: { academicPositionName: advisor.academicPositionName }
      });
      
      if (!academicPosition) {
        console.error(`Academic position '${advisor.academicPositionName}' not found`);
        continue;
      }
      
      // ค้นหาภาควิชา
      const department = await prisma.department.findFirst({
        where: { departmentName: advisor.departmentName }
      });
      
      if (!department) {
        console.error(`Department '${advisor.departmentName}' not found`);
        continue;
      }
      
      // เข้ารหัสรหัสผ่าน
      const hashedPassword = await bcrypt.hashSync(advisor.password, numSaltAround);
            
      // สร้าง user และ advisor ในทีเดียว
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
          advisor: true
        }
      });
      
      console.log(`Created advisor: ${advisor.firstName} ${advisor.lastName} (${advisor.username})`);
    }
    
    console.log("Advisors creation completed");
  } catch (error) {
    console.error("Error creating advisors:", error);
  }
}