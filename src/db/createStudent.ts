import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const numSaltAround = 10;

export async function createStudent() {
  console.log("Creating students...");
  
  const students = [
    {
      studentIdCard: "6309681001",
      password: "password123",
      firstName: "วิชัย",
      lastName: "ใจดี",
      picture: "wichai.jpg",
      departmentName: "วิทยาการคอมพิวเตอร์",
      degreeName: "ปริญญาตรี",
      advisorUsername: "somchai_s"
    },
    {
      studentIdCard: "6309681002",
      password: "password123",
      firstName: "มานี",
      lastName: "ดีใจ",
      picture: "manee.jpg",
      departmentName: "เทคโนโลยีสารสนเทศ",
      degreeName: "ปริญญาตรี",
      advisorUsername: "sompong_l"
    },
    {
      studentIdCard: "6309681003",
      password: "password123",
      firstName: "สมหมาย",
      lastName: "รักเรียน",
      picture: "sommai.jpg",
      departmentName: "วิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ",
      degreeName: "ปริญญาตรี",
      advisorUsername: "somsri_p"
    },
    {
      studentIdCard: "6309681004",
      password: "password123",
      firstName: "สมหญิง",
      lastName: "เก่งกล้า",
      picture: "somying.jpg",
      departmentName: "วิทยาการคอมพิวเตอร์",
      degreeName: "ปริญญาตรี",
      advisorUsername: "somchai_s"
    },
    {
      studentIdCard: "6309681005",
      password: "password123",
      firstName: "ประเสริฐ",
      lastName: "มั่นคง",
      picture: "prasert.jpg",
      departmentName: "วิทยาการคอมพิวเตอร์",
      degreeName: "ปริญญาตรี",
      advisorUsername: "somchai_s"
    }
  ];
  
  try {
    for (const student of students) {      
      // ค้นหาภาควิชา
      const department = await prisma.department.findFirst({
        where: { departmentName: student.departmentName }
      });
      
      if (!department) {
        console.error(`Department '${student.departmentName}' not found`);
        continue;
      }
      
      // ค้นหาระดับการศึกษา
      const degree = await prisma.degree.findFirst({
        where: { degreeName: student.degreeName }
      });
      
      if (!degree) {
        console.error(`Degree '${student.degreeName}' not found`);
        continue;
      }
      
      // ค้นหาอาจารย์ที่ปรึกษา
      const advisorUser = await prisma.user.findUnique({
        where: { username: student.advisorUsername },
        include: { advisor: true }
      });
      
      let advisorId = null;
      if (!advisorUser || !advisorUser.advisor) {
        console.warn(`Advisor with username '${student.advisorUsername}' not found, student will be created without advisor`);
      } else {
        advisorId = advisorUser.advisor.id;
      }
      
      // เข้ารหัสรหัสผ่าน
      const hashedPassword = await bcrypt.hashSync(student.password, numSaltAround);
            
      // สร้าง user และ student ในทีเดียว
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
              advisorId: advisorId
            }
          }
        },
        include: {
          student: true
        }
      });
      
      console.log(`Created student: ${student.firstName} ${student.lastName} (${student.studentIdCard})`);
    }
    
    console.log("Students creation completed");
  } catch (error) {
    console.error("Error creating students:", error);
  }
}