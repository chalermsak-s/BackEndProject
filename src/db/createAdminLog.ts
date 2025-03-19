import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createAdminLog() {
  console.log("Creating admin logs...");
  
  try {
    // ดึงข้อมูลผู้ดูแลระบบทั้งหมด
    const admins = await prisma.admin.findMany({
      include: {
        users: true
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
          admin_id: admin.id,
          action: "เข้าสู่ระบบ",
          log_date: "2025-06-01T10:00:00Z"
        },
        {
          admin_id: admin.id,
          action: "สร้างข้อมูลอาจารย์",
          log_date: "2025-06-03T11:00:00Z"
        },
        {
          admin_id: admin.id,
          action: "กำหนดอาจารย์ที่ปรึกษาให้นักศึกษา",
          log_date: "2025-06-05T11:11:00Z"
        },
        {
          admin_id: admin.id,
          action: "แก้ไขข้อมูลนักศึกษา",
          log_date: "2025-06-07T12:00:00Z"
        },
        {
          admin_id: admin.id,
          action: "แก้ไขข้อมูลภาควิชา",
          log_date: "2025-06-09T13:00:00Z"
        },
        {
          admin_id: admin.id,
          action: "ดูรายงานสรุป",
          log_date: "2025-06-11T14:00:00Z"
        }
      ];
      
      // สร้างบันทึกทีละรายการ
      for (const log of logs) {
        // สร้างบันทึก
        await prisma.admin_log.create({
          data: log
        });
        
        console.log(`Created admin log: '${log.action}' for admin ID ${log.admin_id}`);
      }
    }
    
    console.log("Admin logs creation completed");
  } catch (error) {
    console.error("Error creating admin logs:", error);
  }
}