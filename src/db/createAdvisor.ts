import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ข้อมูลอาจารย์ที่ปรึกษา
export async function createAdvisor() {
  const advisors = [
    {
      firstName: "ประวีณา",
      lastName: "ดวงศรี",
      picture: "", // ใส่ path รูปภาพ หรือถ้าไม่มีก็เป็น string ว่าง
      username: "praveena_duangsee@cmu.ac.th",
      password: "Praveena123",
      academicPositionId: 1, // อาจารย์
      departmentId: 1, // SE(International Program)
      adminId: 1
    },
    {
      firstName: "ปุณณพร",
      lastName: "นามมงคล",
      picture: "",
      username: "punnaporn_nammongkol@cmu.ac.th",
      password: "Punnaporn456",
      academicPositionId: 2, // ผู้ช่วยศาสตราจารย์
      departmentId: 2, // SE(Bilingual Program)
      adminId: 1
    },
    {
      firstName: "พีรณัฐ",
      lastName: "สุนทรพิศ",
      picture: "",
      username: "peeranat_sunthornphit@cmu.ac.th",
      password: "Peeranat789",
      academicPositionId: 3, // รองศาสตราจารย์
      departmentId: 3, // MMIT
      adminId: 1
    },
    {
      firstName: "มหัทธนา",
      lastName: "สมภักดี",
      picture: "",
      username: "mahatthana_sompakdee@cmu.ac.th",
      password: "Mahatthana321",
      academicPositionId: 4, // ศาสตราจารย์
      departmentId: 4, // ANI
      adminId: 1
    },
    {
      firstName: "มรุต",
      lastName: "รัตนภัทร",
      picture: "",
      username: "marut_rattanapat@cmu.ac.th",
      password: "Marut654",
      academicPositionId: 1, // อาจารย์
      departmentId: 5, // DG
      adminId: 1
    },
    {
      firstName: "รณชัย",
      lastName: "ธนาธรรม",
      picture: "",
      username: "ronnachai_thanatham@cmu.ac.th",
      password: "Ronnachai987",
      academicPositionId: 2, // ผู้ช่วยศาสตราจารย์
      departmentId: 6, // DII
      adminId: 1
    },
    {
      firstName: "วรโชติ",
      lastName: "วัฒนมณี",
      picture: "",
      username: "worachot_wattanamanee@cmu.ac.th",
      password: "Worachot741",
      academicPositionId: 3, // รองศาสตราจารย์
      departmentId: 7, // KIM(Bilingual Program)
      adminId: 1
    },
    {
      firstName: "ชาติชาย",
      lastName: "ภูริสวัสดิ์",
      picture: "",
      username: "chatchai_phurisawas@cmu.ac.th",
      password: "Chatchai852",
      academicPositionId: 4, // ศาสตราจารย์
      departmentId: 8, // KIM(International Program)
      adminId: 1
    },
    {
      firstName: "ฌานิธา",
      lastName: "เกียรติพงษ์",
      picture: "",
      username: "chanitha_kiatpong@cmu.ac.th",
      password: "Chanitha963",
      academicPositionId: 1, // อาจารย์
      departmentId: 9, // DTM
      adminId: 1
    }
  ];

    console.log(`สร้างข้อมูลอาจารย์ที่ปรึกษาเสร็จสิ้น: ${advisors.length} รายการ`);
}