// Description: Create announcement data in the database using Prisma.
// This script creates announcements with various topics, descriptions, files, posted dates, and advisor IDs.
// It also includes error handling for missing advisor IDs.

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create announcement data in the database
export async function createAnnouncement() {
  const announcements = [
    {
      topic: "Quiz 1 - Midterm",
      description: "รายละเอียดการสอบ Quiz 1 ก่อนสอบ Midterm",
      file: "pdf",
      postedDate: new Date("2025-06-14T16:59:56.000Z"),
      advisorId: 1
    },
    {
      topic: "CUM Tracking",
      description: "การติดตามความก้าวหน้าโครงการ CUM",
      file: "jpg",
      postedDate: new Date("2025-06-15T16:59:56.000Z"),
      advisorId: 2
    },
    {
      topic: "Quiz 2 - Final",
      description: "รายละเอียดการสอบ Quiz 2 ก่อนสอบ Final",
      file: "pdf",
      postedDate: new Date("2025-06-16T16:59:56.000Z"),
      advisorId: 3
    },
    {
      topic: "Group Project - Media Campaign",
      description: "รายละเอียดโครงงานกลุ่ม Media Campaign",
      file: "jpg",
      postedDate: new Date("2025-06-17T16:59:56.000Z"),
      advisorId: 4
    },
    {
      topic: "Media Critique Assignment",
      description: "ออกแบบและสร้างแคมเปญสื่อที่มีเป้าหมายในการส่งเสริมความรู้หรือค่านิยมบางอย่างให้กับผู้ชม",
      file: "jpg",
      postedDate: new Date("2025-06-18T16:59:56.000Z"),
      advisorId: 5
    },
    {
      topic: "Design Thinking Workshop",
      description: "เชิญเข้าร่วม Workshop การคิดเชิงออกแบบ",
      file: "pdf",
      postedDate: new Date("2025-06-19T16:59:56.000Z"),
      advisorId: 6
    },
    {
      topic: "UX Research Method",
      description: "วิธีการวิจัย UX และการนำไปประยุกต์ใช้",
      file: "pdf",
      postedDate: new Date("2025-06-20T16:59:56.000Z"),
      advisorId: 7
    },
    {
      topic: "Guest Speaker - Digital Marketing",
      description: "การบรรยายพิเศษหัวข้อ Digital Marketing",
      file: "jpg",
      postedDate: new Date("2025-06-21T16:59:56.000Z"),
      advisorId: 8
    },
    {
      topic: "Internship Opportunity",
      description: "โอกาสฝึกงานกับบริษัทพาร์ทเนอร์",
      file: "pdf",
      postedDate: new Date("2025-06-22T16:59:56.000Z"),
      advisorId: 9
    }
  ];

  console.log("Creating announcement data...");
  
  for (const announcement of announcements) {
    await prisma.announcement.create({
      data: {
        topic: announcement.topic,
        description: announcement.description,
        file: announcement.file,
        postedDate: announcement.postedDate,
        advisorId: announcement.advisorId
      }
    });
  }
  console.log("Announcement data creation completed");
}