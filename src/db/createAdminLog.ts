// Description: This script creates admin logs in the database using Prisma.
// It generates logs for each admin user with various actions and timestamps.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create admin logs in the database
export async function createAdminLog() {
  console.log("Creating admin logs...");
  
  try {
    const admins = await prisma.admin.findMany({
      include: {
        user: true
      }
    });
    
    // Create logs for each admin
    for (const admin of admins) {
      const logs = [
        { adminId: admin.id, action: "เข้าสู่ระบบ", date: "2025-06-01T10:00:00Z" },
        { adminId: admin.id, action: "สร้างข้อมูลอาจารย์", date: "2025-06-03T11:00:00Z" },
        { adminId: admin.id, action: "กำหนดอาจารย์ที่ปรึกษาให้นักศึกษา", date: "2025-06-05T11:11:00Z" },
        { adminId: admin.id, action: "แก้ไขข้อมูลนักศึกษา", date: "2025-06-07T12:00:00Z" },
        { adminId: admin.id, action: "แก้ไขข้อมูลภาควิชา", date: "2025-06-09T13:00:00Z" },
        { adminId: admin.id, action: "ดูรายงานสรุป", date: "2025-06-11T14:00:00Z" }
      ];
      
      for (const log of logs) {
        await prisma.adminLog.create({
          data: log
        });        
      }
    }
    console.log("Admin logs creation completed");
  } catch (error) {
    console.error("Error creating admin logs:", error);
  }
}