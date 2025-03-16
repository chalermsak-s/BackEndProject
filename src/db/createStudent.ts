import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ข้อมูลนักศึกษา
export async function createStudent() {
  const students = [
    {
      studentIdCard: "612133001",
      firstName: "กันต์กรณ์",
      lastName: "สุขสวัสดิ์",
      picture: "",
      username: "612133001",
      password: "Kantakorn126",
      departmentId: 1, // SE(International Program)
      degreeId: 3 // ปริญญาเอก
    },
    {
      studentIdCard: "622133002",
      firstName: "เกษมศักดิ์",
      lastName: "บำรุงสุข",
      picture: "",
      username: "622133002",
      password: "Kasemsak456",
      departmentId: 2, // SE(Bilingual Program)
      degreeId: 3 // ปริญญาเอก
    },
    {
      studentIdCard: "632133003",
      firstName: "ขจรศักดิ์",
      lastName: "สุขเกษม",
      picture: "",
      username: "632133003",
      password: "Khajornsak789",
      departmentId: 3, // MMIT
      degreeId: 3 // ปริญญาเอก
    },
    {
      studentIdCard: "642132004",
      firstName: "คณิศร",
      lastName: "จิตต์สุข",
      picture: "",
      username: "642132004",
      password: "Kanit321",
      departmentId: 4, // ANI
      degreeId: 2 // ปริญญาโท
    },
    {
      studentIdCard: "652132005",
      firstName: "ครองชัย",
      lastName: "พรรณนา",
      picture: "",
      username: "652132005",
      password: "Krongchai654",
      departmentId: 5, // DG
      degreeId: 2 // ปริญญาโท
    },
    {
      studentIdCard: "662132006",
      firstName: "จิตติวัฒน์",
      lastName: "ศรีทอง",
      picture: "",
      username: "662132006",
      password: "Jittiwat987",
      departmentId: 6, // DII
      degreeId: 2 // ปริญญาโท
    },
    {
      studentIdCard: "642131001",
      firstName: "สรวิชญ์",
      lastName: "บุญญาวัฒน์",
      picture: "",
      username: "642131001",
      password: "Sorawit147",
      departmentId: 9, // DTM
      degreeId: 1 // ปริญญาตรี
    },
    {
      studentIdCard: "642131002",
      firstName: "สุมิตา",
      lastName: "พัฒนพร",
      picture: "",
      username: "642131002",
      password: "Sumita963",
      departmentId: 1, // SE(International Program)
      degreeId: 1 // ปริญญาตรี
    },
    {
      studentIdCard: "652131003",
      firstName: "สุชาติ",
      lastName: "จิรประเสริฐ",
      picture: "",
      username: "652131003",
      password: "Suchart258",
      departmentId: 2, // SE(Bilingual Program)
      degreeId: 1 // ปริญญาตรี
    },
    {
      studentIdCard: "652131004",
      firstName: "สุภาภรณ์",
      lastName: "โภคะจันทร์",
      picture: "",
      username: "652131004",
      password: "Supaporn741",
      departmentId: 3, // MMIT
      degreeId: 1 // ปริญญาตรี
    },
    {
      studentIdCard: "662131005",
      firstName: "หทัยรัตน์",
      lastName: "เพชรศักดิ์",
      picture: "",
      username: "662131005",
      password: "Hatairat123",
      departmentId: 4, // ANI
      degreeId: 1 // ปริญญาตรี
    },
    {
      studentIdCard: "662131006",
      firstName: "ญาณี",
      lastName: "ยุทธชัย",
      picture: "",
      username: "662131006",
      password: "Yanee987",
      departmentId: 5, // DG
      degreeId: 1 // ปริญญาตรี
    },
    {
      studentIdCard: "672131007",
      firstName: "ธิติพร",
      lastName: "ศุภเจริญ",
      picture: "",
      username: "672131007",
      password: "Thitiporn258",
      departmentId: 6, // DII
      degreeId: 1 // ปริญญาตรี
    },
    {
      studentIdCard: "672131008",
      firstName: "ธราธร",
      lastName: "อุทัยเจริญ",
      picture: "",
      username: "672131008",
      password: "Tharatorn741",
      departmentId: 7, // KIM(Bilingual Program)
      degreeId: 1 // ปริญญาตรี
    },
    {
      studentIdCard: "672131009",
      firstName: "นภัสสร",
      lastName: "ภักดีศรี",
      picture: "",
      username: "672131009",
      password: "Napatsorn963",
      departmentId: 8, // KIM(International Program)
      degreeId: 1 // ปริญญาตรี
    },
    {
      studentIdCard: "672131010",
      firstName: "คริษฐา",
      lastName: "ภูริภัทร",
      picture: "",
      username: "672131010",
      password: "Krittha147",
      departmentId: 9, // DTM
      degreeId: 1 // ปริญญาตรี
    }
  ];

  console.log("เริ่มสร้างข้อมูลนักศึกษา...");
  
  for (const student of students) {
    await prisma.student.create({
      data: {
        studentIdCard: student.studentIdCard,
        firstName: student.firstName,
        lastName: student.lastName,
        picture: student.picture || "default_student.jpg", // ถ้าไม่มีรูปให้ใช้รูป default
        username: student.username,
        password: student.password,
        departmentId: student.departmentId,
        degreeId: student.degreeId
      }
    });
  }
  
  console.log(`สร้างข้อมูลนักศึกษาเสร็จสิ้น: ${students.length} รายการ`);
}

// เรียกใช้ฟังก์ชันสร้างข้อมูลนักศึกษา
createStudent()
  .then(() => {
    console.log("สร้างข้อมูลนักศึกษาเสร็จสิ้น");
  })
  .catch((error) => {
    console.error("เกิดข้อผิดพลาดในการสร้างข้อมูลนักศึกษา:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

