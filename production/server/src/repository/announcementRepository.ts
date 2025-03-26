import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export function getAllAnnouncements() {
  return prisma.announcement.findMany({
    select: {
      id: true,
      topic: true,
      description: true,
      file: true,
      posted_date: true,
      advisor_id: true,
      advisor: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
    orderBy: {
      posted_date: 'desc',
    },
  })
}

export function getAnnouncementByAdvisorId(id: number) {
  return prisma.announcement.findMany({
    where: { advisor_id: id },
    select: {
      id: true,
      topic: true,
      description: true,
      file: true,
      posted_date: true,
      advisor_id: true,
      advisor: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
  })
}

export function getAnnouncementById(id: number) {
  return prisma.announcement.findUnique({
    where: { id },
    select: {
      id: true,
      topic: true,
      description: true,
      file: true,
      posted_date: true,
      advisor_id: true,
      advisor: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
  })
}

export function getAnnouncementByStudentId(id: number) {
  return prisma.announcement.findMany({
      where: {
        advisor: {
          students: {
            some: {
              id: id,
            },
          },
        },
      },select: {
        id: true,
        topic: true,
        description: true,
        file: true,
        posted_date: true,
        advisor_id: true,
        advisor: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
      orderBy: {
        posted_date: 'desc',
      }
  })
}

export async function addAnnouncementByAdvisorId(
  advisorId: number,
  topic: string,
  description: string,
  file?: string // ไฟล์อัปโหลดอาจเป็นตัวเลือก (optional)
) {
  return await prisma.announcement.create({
    data: {
      topic: topic,
      description: description,
      file: file || null, // ถ้าไม่มีไฟล์ให้ใส่ค่า null
      posted_date: new Date(), // ใช้วันที่ปัจจุบันเป็นวันโพสต์
      advisor_id: advisorId,
    },
  });
}