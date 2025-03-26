import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ข้อมูลประเภทผู้ตอบฟีดแบค
// ประเภทผู้ตอบฟีดแบคมี 2 ประเภท ได้แก่ นักศึกษา และ อาจารย์ที่ปรึกษา
export async function createResponder() {
  const responders = [
    { id: 1, responder: "Student" },
    { id: 2, responder: "Advisor" }
  ];

  console.log("เริ่มสร้างข้อมูลประเภทผู้ตอบฟีดแบค...");
  
  for (const responder of responders) {
    await prisma.responder.create({
      data: {
        id: responder.id,
        responder: responder.responder
      }
    });
  }
  
  console.log("สร้างข้อมูลประเภทผู้ตอบฟีดแบคเสร็จสิ้น");
}