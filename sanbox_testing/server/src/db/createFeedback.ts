import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// ข้อมูลฟีดแบค
export async function createFeedback() {
  const feedbacks = [
    {
      feedback: 'ส่งคำขอใหม่นัดหมายใหม่ เป็นวันที่ 28/7/2025 10.00 A.M.ครับ',
      timestamp: new Date('2025-07-15T13:35:00.000Z'), // 15/7/2025 1.35 P.M.
      isFromAdvisor: true,
      student_id: 1,
      advisor_id: 1,
      responder_id: 1,
      admin_id: 1,
    },
    {
      feedback:
        'สวัสดีครับอาจารย์ ผมส่งขอนัดหมายวันที่ 30/7/2025 เวลา 15.00 น. หากอาจารย์สะดวก รบกวน Approve การนัดหมายให้หน่อยครับ ผมสงสัยเกี่ยวกับคะแนนสอบครับ',
      timestamp: new Date('2025-07-20T11:00:00.000Z'), // 20/7/2025 11 A.M.
      student_id: 1,
      advisor_id: 1,
      responder_id: 1,
      admin_id: 1,
    },
    {
      feedback:
        'สวัสดีค่ะอาจารย์ การนัดหมายของนักศึกษารหัส 662131005 ถูก reject อาจารย์พอจะสะดวกวันไหนบ้างคะ พอดีอยากปรึกษาเรื่อง Carrer Path ค่ะ',
      timestamp: new Date('2025-07-25T13:35:00.000Z'), // 25/7/2025 1.35 P.M.
      student_id: 1,
      advisor_id: 1,
      responder_id: 1,
      admin_id: 1,
    },
  ]

  console.log('เริ่มสร้างข้อมูลฟีดแบค...')

  for (const feedback of feedbacks) {
    await prisma.feedback.create({
      data: {
        feedback: feedback.feedback,
        timestamp: feedback.timestamp,
        student_id: feedback.student_id,
        advisor_id: feedback.advisor_id,
        responder_id: feedback.responder_id,
        admin_id: feedback.admin_id,
      },
    })
  }

  console.log(`สร้างข้อมูลฟีดแบคเสร็จสิ้น: ${feedbacks.length} รายการ`)

  console.log('Creating feedbacks...')

  try {
    // ดึงข้อมูลนักศึกษาทั้งหมดที่มีอาจารย์ที่ปรึกษา
    const students = await prisma.student.findMany({
      where: {
        advisor_id: {
          not: null,
        },
      },
      include: {
        advisor: true,
      },
    })

    if (students.length === 0) {
      console.error(
        'No students with advisors found in the database. Please create students with advisors first'
      )
      return
    }

    // สร้างความคิดเห็นสำหรับแต่ละคู่นักศึกษา-อาจารย์
    for (const student of students) {
      // สร้างการสนทนาระหว่างอาจารย์และนักศึกษา
      const feedbacks = [
        // อาจารย์ส่งความคิดเห็นถึงนักศึกษา
        {
          feedback: `ส่งคำขอใหม่นัดหมายใหม่ เป็นวันที่ 28/7/2025 10.00 A.M.ครับ"`,
          timestamp: new Date(new Date().setDate(new Date().getDate() - 30)), // 30 วันที่แล้ว
          student_id: 1,
          advisor_id: 1,
          responder_id: 1,
          admin_id: 1,
        },
        // นักศึกษาตอบกลับอาจารย์
        {
          feedback: `สวัสดีครับอาจารย์ ผมส่งขอนัดหมายวันที่ 30/7/2025 เวลา 15.00 น. หากอาจารย์สะดวก รบกวน Approve การนัดหมายให้หน่อยครับ ผมสงสัยเกี่ยวกับคะแนนสอบครับ`,
          timestamp: new Date(new Date().setDate(new Date().getDate() - 28)), // 28 วันที่แล้ว
          student_id: 1,
          advisor_id: 1,
          responder_id: 1,
          admin_id: 1,
        },
        // อาจารย์ส่งความคิดเห็นอีกครั้ง
        {
          feedback: `สวัสดีค่ะอาจารย์ การนัดหมายของนักศึกษารหัส 662131005 ถูก reject อาจารย์พอจะสะดวกวันไหนบ้างคะ พอดีอยากปรึกษาเรื่อง Carrer Path ค่ะ`,
          timestamp: new Date(new Date().setDate(new Date().getDate() - 15)), // 15 วันที่แล้ว
          student_id: 1,
          advisor_id: 1,
          responder_id: 1,
          admin_id: 1,
        },
      ]

      // สร้างความคิดเห็นทีละรายการ
      for (const feedback of feedbacks) {
        // Make sure senderId and receiverId are not null before creating feedback
        if (feedback.student_id !== null && feedback.advisor_id !== null) {
          // สร้างความคิดเห็น
          await prisma.feedback.create({
            data: {
              feedback: feedback.feedback,
              timestamp: feedback.timestamp,
              student_id: feedback.student_id,
              advisor_id: feedback.advisor_id,
              responder_id: feedback.responder_id,
              admin_id: feedback.admin_id,
            },
          })

          console.log(
            `Created feedback from ${feedback.student_id} ID ${feedback.advisor_id} to ${feedback.admin_id} ID ${feedback.responder_id}`
          )
        } else {
          console.log(
            `Skipping feedback creation due to null sender or receiver ID`
          )
        }
      }
    }
    console.log('Feedbacks creation completed')
  } catch (error) {
    console.error('Error creating feedbacks:', error)
  }
}
