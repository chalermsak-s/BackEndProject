import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// ข้อมูลประกาศ
export async function createAnnouncement() {
  const announcements = [
    {
      topic: 'Quiz 1 - Midterm',
      description: 'รายละเอียดการสอบ Quiz 1 ก่อนสอบ Midterm',
      file: 'pdf',
      postedDate: new Date('2025-06-14T16:59:56.000Z'),
      advisorId: 1,
    },
    {
      topic: 'CUM Tracking',
      description: 'การติดตามความก้าวหน้าโครงการ CUM',
      file: 'jpg',
      postedDate: new Date('2025-06-15T16:59:56.000Z'),
      advisorId: 2,
    },
    {
      topic: 'Quiz 2 - Final',
      description: 'รายละเอียดการสอบ Quiz 2 ก่อนสอบ Final',
      file: 'pdf',
      postedDate: new Date('2025-06-16T16:59:56.000Z'),
      advisorId: 3,
    },
    {
      topic: 'Group Project - Media Campaign',
      description: 'รายละเอียดโครงงานกลุ่ม Media Campaign',
      file: 'jpg',
      postedDate: new Date('2025-06-17T16:59:56.000Z'),
      advisorId: 3,
    },
    {
      topic: 'Media Critique Assignment',
      description:
        'ออกแบบและสร้างแคมเปญสื่อที่มีเป้าหมายในการส่งเสริมความรู้หรือค่านิยมบางอย่างให้กับผู้ชม เช่น การทำแคมเปญโฆษณาสำหรับสินค้า หรือการสร้างการรับรู้ในประเด็นสังคมที่สำคัญ',
      file: 'jpg',
      postedDate: new Date('2025-06-18T16:59:56.000Z'),
      advisorId: 2,
    },
    {
      topic: 'Design Thinking Workshop',
      description: 'เชิญเข้าร่วม Workshop การคิดเชิงออกแบบ',
      file: 'pdf',
      postedDate: new Date('2025-06-19T16:59:56.000Z'),
      advisorId: 1,
    },
    {
      topic: 'UX Research Method',
      description: 'วิธีการวิจัย UX และการนำไปประยุกต์ใช้',
      file: 'pdf',
      postedDate: new Date('2025-06-20T16:59:56.000Z'),
      advisorId: 2,
    },
    {
      topic: 'Guest Speaker - Digital Marketing',
      description: 'การบรรยายพิเศษหัวข้อ Digital Marketing',
      file: 'jpg',
      postedDate: new Date('2025-06-21T16:59:56.000Z'),
      advisorId: 3,
    },
    {
      topic: 'Internship Opportunity',
      description: 'โอกาสฝึกงานกับบริษัทพาร์ทเนอร์',
      file: 'pdf',
      postedDate: new Date('2025-06-22T16:59:56.000Z'),
      advisorId: 2,
    },
  ]

  console.log('เริ่มสร้างข้อมูลประกาศ...')

  for (const announcement of announcements) {
    await prisma.announcement.create({
      data: {
        topic: announcement.topic,
        description: announcement.description,
        file: announcement.file,
        posted_date: announcement.postedDate,
        advisor_id:announcement.advisorId
      },
    })
  }

  console.log(`สร้างข้อมูลประกาศเสร็จสิ้น: ${announcements.length} รายการ`)
}
