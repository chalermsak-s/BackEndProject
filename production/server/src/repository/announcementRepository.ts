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
