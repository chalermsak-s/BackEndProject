import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ข้อมูล admin logs จากการเชื่อมต่อนักศึกษากับอาจารย์ที่ปรึกษา
export async function createAdminLog() {
  // ข้อมูล admin logs จากการเชื่อมต่อนักศึกษากับอาจารย์ที่ปรึกษา
  const adminLogs = [
    // นักศึกษา ID 1-16 เชื่อมกับอาจารย์ที่ปรึกษา ตามภาควิชา
    { action: "Connecting advisor with students", studentId: 1, advisorId: 1, adminId: 1 },
    { action: "Connecting advisor with students", studentId: 2, advisorId: 2, adminId: 1 },
    { action: "Connecting advisor with students", studentId: 3, advisorId: 3, adminId: 1 },
    { action: "Connecting advisor with students", studentId: 4, advisorId: 4, adminId: 1 },
    { action: "Connecting advisor with students", studentId: 5, advisorId: 5, adminId: 1 },
    { action: "Connecting advisor with students", studentId: 6, advisorId: 6, adminId: 1 },
    { action: "Connecting advisor with students", studentId: 7, advisorId: 9, adminId: 1 },
    { action: "Connecting advisor with students", studentId: 8, advisorId: 1, adminId: 1 },
    { action: "Connecting advisor with students", studentId: 9, advisorId: 2, adminId: 1 },
    { action: "Connecting advisor with students", studentId: 10, advisorId: 3, adminId: 1 },
    { action: "Connecting advisor with students", studentId: 11, advisorId: 4, adminId: 1 },
    { action: "Connecting advisor with students", studentId: 12, advisorId: 5, adminId: 1 },
    { action: "Connecting advisor with students", studentId: 13, advisorId: 6, adminId: 1 },
    { action: "Connecting advisor with students", studentId: 14, advisorId: 7, adminId: 1 },
    { action: "Connecting advisor with students", studentId: 15, advisorId: 8, adminId: 1 },
    { action: "Connecting advisor with students", studentId: 16, advisorId: 9, adminId: 1 }
  ];

  console.log("เริ่มสร้างข้อมูล Admin Log...");
  
  for (const log of adminLogs) {
    await prisma.adminLog.create({
      data: {
        action: log.action,
        studentId: log.studentId,
        advisorId: log.advisorId,
        adminId: log.adminId
      }
    });
  }
  
  console.log(`สร้างข้อมูล Admin Log เสร็จสิ้น: ${adminLogs.length} รายการ`);
}