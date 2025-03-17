import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const numSaltAround = 10;

// ข้อมูลนักศึกษา
export async function createStudents() {
  const students = [
    {
      studentIdCard: "6309681001",
      password: "password123",
      firstName: "วิชัย",
      lastName: "ใจดี",
      picture: "wichai.jpg",
      departmentName: "วิทยาการคอมพิวเตอร์",
      degreeName: "ปริญญาตรี"
    },
    {
      studentIdCard: "6309681002",
      password: "password123",
      firstName: "มานี",
      lastName: "ดีใจ",
      picture: "manee.jpg",
      departmentName: "เทคโนโลยีสารสนเทศ",
      degreeName: "ปริญญาตรี"
    },
    {
      studentIdCard: "6309681003",
      password: "password123",
      firstName: "สมหมาย",
      lastName: "รักเรียน",
      picture: "sommai.jpg",
      departmentName: "วิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ",
      degreeName: "ปริญญาตรี"
    },
    {
      studentIdCard: "6309681004",
      password: "password123",
      firstName: "สมหญิง",
      lastName: "เก่งกล้า",
      picture: "somying.jpg",
      departmentName: "วิทยาการคอมพิวเตอร์",
      degreeName: "ปริญญาตรี"
    },
    {
      studentIdCard: "6309681005",
      password: "password123",
      firstName: "ประเสริฐ",
      lastName: "มั่นคง",
      picture: "prasert.jpg",
      departmentName: "วิทยาการคอมพิวเตอร์",
      degreeName: "ปริญญาตรี"
    }
  ];

  console.log("เริ่มสร้างข้อมูลนักศึกษา...");
  
  for (const student of students) {
    try {
      // ค้นหา department
      const department = await prisma.department.findFirst({
        where: { departmentName: student.departmentName }
      });

      if (!department) {
        console.error(`ไม่พบภาควิชา "${student.departmentName}" กรุณาสร้างภาควิชาก่อน`);
        continue;
      }

      // ค้นหา degree
      const degree = await prisma.degree.findFirst({
        where: { degreeName: student.degreeName }
      });

      if (!degree) {
        console.error(`ไม่พบระดับการศึกษา "${student.degreeName}" กรุณาสร้างระดับการศึกษาก่อน`);
        continue;
      }

      // เข้ารหัสรหัสผ่าน
      const hashedPassword = await bcrypt.hashSync(student.password, numSaltAround);
  
      // หาอาจารย์ในภาควิชาเดียวกัน (ตัวอย่างเท่านั้น)
      const advisor = await prisma.advisor.findFirst({
        where: { departmentId: department.id }
      });

      if (!advisor) {
        console.warn(`ไม่พบอาจารย์ในภาควิชา "${student.departmentName}" จะสร้างนักศึกษาโดยไม่มีอาจารย์ที่ปรึกษา`);
      }

      // สร้างผู้ใช้และนักศึกษา
      const createdUser = await prisma.user.create({
        data: {
          username: student.studentIdCard,
          password: hashedPassword,
          role: UserRole.STUDENT,
          student: {
            create: {
              studentIdCard: student.studentIdCard,
              firstName: student.firstName,
              lastName: student.lastName,
              picture: student.picture,
              departmentId: department.id,
              degreeId: degree.id,
              advisorId: advisor?.id // อาจเป็น null ถ้าไม่พบอาจารย์
            }
          }
        },
        include: {
          student: {
            include: {
              department: true,
              degree: true,
              advisor: advisor ? {
                include: {
                  academicPosition: true
                }
              } : false
            }
          }
        }
      });

      console.log(`สร้างข้อมูลนักศึกษา ${createdUser.student?.firstName} ${createdUser.student?.lastName} รหัส ${createdUser.student?.studentIdCard} เรียบร้อยแล้ว`);
      
      if (advisor) {
        console.log(`  อาจารย์ที่ปรึกษา: ${advisor.firstName} ${advisor.lastName}`);
      } else {
        console.log(`  ไม่มีอาจารย์ที่ปรึกษา`);
      }
    } catch (error) {
      console.error(`เกิดข้อผิดพลาดในการสร้างนักศึกษา ${student.firstName} ${student.lastName}:`, error);
    }
  }

  console.log("สร้างข้อมูลนักศึกษาเสร็จสิ้น");
}