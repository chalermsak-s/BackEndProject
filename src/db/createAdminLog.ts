import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createAdminLog() {
  console.log("Creating admin logs...");
  
  try {
    // ดึงข้อมูลผู้ดูแลระบบทั้งหมด
    const admins = await prisma.admin.findMany({
      include: {
        user: true
      }
    });
    
    if (admins.length === 0) {
      console.error("No admins found in the database. Please create admins first");
      return;
    }
    
    // สร้างบันทึกการทำงานสำหรับแต่ละ admin
    for (const admin of admins) {
      const logs = [
        {
          adminId: admin.id,
          action: "เข้าสู่ระบบ",
          date: "2025-06-01T10:00:00Z"
        },
        {
          adminId: admin.id,
          action: "สร้างข้อมูลอาจารย์",
          date: "2025-06-03T11:00:00Z"
        },
        {
          adminId: admin.id,
          action: "กำหนดอาจารย์ที่ปรึกษาให้นักศึกษา",
          date: "2025-06-05T11:11:00Z"
        },
        {
          adminId: admin.id,
          action: "แก้ไขข้อมูลนักศึกษา",
          date: "2025-06-07T12:00:00Z"
        },
        {
          adminId: admin.id,
          action: "แก้ไขข้อมูลภาควิชา",
          date: "2025-06-09T13:00:00Z"
        },
        {
          adminId: admin.id,
          action: "ดูรายงานสรุป",
          date: "2025-06-11T14:00:00Z"
        }
      ];
      
      // สร้างบันทึกทีละรายการ
      for (const log of logs) {
        // สร้างบันทึก
        await prisma.adminLog.create({
          data: log
        });
        
        console.log(`Created admin log: '${log.action}' for admin ID ${log.adminId}`);
      }
    }
    
    console.log("Admin logs creation completed");
  } catch (error) {
    console.error("Error creating admin logs:", error);
  }
}