// Description: This script creates feedbacks between students and advisors in the database.

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create feedbacks between students and advisors in the database
export async function createFeedback() {

  console.log("Creating feedbacks...");

  // ดึงข้อมูลนักศึกษาทั้งหมดที่มีอาจารย์ที่ปรึกษา
  const students = await prisma.student.findMany({
    where: {
      advisorId: {
        not: null
      }
    },
    include: {
      advisor: true
    }
  });
  
  for (const student of students) {
    const feedbacks = [
      {
        message: `ส่งคำขอใหม่นัดหมายใหม่ เป็นวันที่ 28/7/2025 10.00 A.M.ครับ"`,
        timestamp: new Date(new Date().setDate(new Date().getDate() - 30)), // 30 วันที่แล้ว
        isFromAdvisor: true,
        senderId: student.advisorId,
        senderType: "ADVISOR",
        receiverId: student.id,
        receiverType: "STUDENT"
      },
      {
        message: `สวัสดีครับอาจารย์ ผมส่งขอนัดหมายวันที่ 30/7/2025 เวลา 15.00 น. หากอาจารย์สะดวก รบกวน Approve การนัดหมายให้หน่อยครับ ผมสงสัยเกี่ยวกับคะแนนสอบครับ`,
        timestamp: new Date(new Date().setDate(new Date().getDate() - 28)), // 28 วันที่แล้ว
        isFromAdvisor: false,
        senderId: student.id,
        senderType: "STUDENT",
        receiverId: student.advisorId,
        receiverType: "ADVISOR"
      },
      {
        message: `สวัสดีค่ะอาจารย์ การนัดหมายของนักศึกษารหัส 662131005 ถูก reject อาจารย์พอจะสะดวกวันไหนบ้างคะ พอดีอยากปรึกษาเรื่อง Carrer Path ค่ะ`,
        timestamp: new Date(new Date().setDate(new Date().getDate() - 15)), // 15 วันที่แล้ว
        isFromAdvisor: true,
        senderId: student.advisorId,
        senderType: "ADVISOR",
        receiverId: student.id,
        receiverType: "STUDENT"
      }
    ];
    
    for (const feedback of feedbacks) {
      if (feedback.senderId !== null && feedback.receiverId !== null) {
        await prisma.feedback.create({
          data: {
            message: feedback.message,
            timestamp: feedback.timestamp,
            isFromAdvisor: feedback.isFromAdvisor,
            senderId: feedback.senderId,
            senderType: feedback.senderType,
            receiverId: feedback.receiverId,
            receiverType: feedback.receiverType
          }
        });
        
        console.log(`Created feedback from ${feedback.senderType} ID ${feedback.senderId} to ${feedback.receiverType} ID ${feedback.receiverId}`);
      } else {
        console.log(`Skipping feedback creation due to null sender or receiver ID`);
      }        
    }
  }
  console.log("Feedbacks creation completed");
}