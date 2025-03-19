// Description: Create advisor data in the database using Prisma.
// This script creates advisor users with hashed passwords and assigns them to academic positions and departments.
// It also includes error handling for missing academic positions and departments.

import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const numSaltAround = 10;

// Create advisor data in the database
export async function createAdvisors() {
  const advisors = [
    {
      username: "praveena_duangsee@cmu.ac.th",
      password: "Praveena123",
      firstName: "ประวีณา",
      lastName: "ดวงศรี",
      picture: "",
      academicPositionName: "SE(International Program)",
      departmentName: "SE(International Program)"
    },
    {
      username: "punnaporn_nammongkol@cmu.ac.th",
      password: "Punnaporn456",
      firstName: "ปุณณพร",
      lastName: "นามมงคล",
      picture: "",
      academicPositionName: "SE(Bilingual Program)",
      departmentName: "SE(Bilingual Program)"
    },
    {
      username: "peeranat_sunthornphit@cmu.ac.th",
      password: "Peeranat789",
      firstName: "พีรณัฐ",
      lastName: "สุนทรพิทักษ์",
      picture: "",
      academicPositionName: "MMIT",
      departmentName: "MMIT"
    },
    {
      username: "mahathana_sompakkee@cmu.ac.th",
      password: "Mahathana321",
      firstName: "มหาธนา",
      lastName: "สมภักดี",
      picture: "",
      academicPositionName: "ANI",
      departmentName: "ANI"
    },
    {
      username: "marut_rattanapat@cmu.ac.th",
      password: "Marut654",
      firstName: "มารุต",
      lastName: "รัตนาภัทร์",
      picture: "",
      academicPositionName: "DG",
      departmentName: "DG"
    },
    {
      username: "ronnachai_thanatham@cmu.ac.th",
      password: "Ronnachai987",
      firstName: "รณชัย",
      lastName: "ธนธรรม",
      picture: "",
      academicPositionName: "DII",
      departmentName: "DII"
    },
    {
      username: "worachot_wattanamanee@cmu.ac.th",
      password: "Worachot741",
      firstName: "วรโชติ",
      lastName: "วัฒนามณี",
      picture: "",
      academicPositionName: "KIM(Bilingual Program)",
      departmentName: "KIM(Bilingual Program)"
    },
    {
      username: "chatchai_phurisawas@cmu.ac.th",
      password: "Chatchai852",
      firstName: "ชัชชาย",
      lastName: "ภูริสวัสดิ์",
      picture: "",
      academicPositionName: "KIM(International Program)",
      departmentName: "KIM(International Program)"
    },
    {
      username: "chanitha_kiatpong@cmu.ac.th",
      password: "Chanitha963",
      firstName: "ชนิตา",
      lastName: "เกียรติพงษ์",
      picture: "",
      academicPositionName: "DTM",
      departmentName: "DTM"
    }
  ];

  console.log("Creating advisors...");

  for (const advisor of advisors) {
    const academicPosition = await prisma.academicPosition.findFirst({
      where: { academicPositionName: advisor.academicPositionName }
    });
    
    if (!academicPosition) {
      console.error(`Academic position '${advisor.academicPositionName}' not found`);
      continue;
    }
    
    // Check if the department exists
    const department = await prisma.department.findFirst({
      where: { departmentName: advisor.departmentName }
    });
    
    if (!department) {
      console.error(`Department '${advisor.departmentName}' not found`);
      continue;
    }
    
    const hashedPassword = await bcrypt.hashSync(advisor.password, numSaltAround);
    
    // Create user with hashed password and advisor in one go
    const createdUser = await prisma.user.create({
      data: {
        username: advisor.username,
        password: hashedPassword,
        role: UserRole.ADVISOR,
        advisor: {
          create: {
            firstName: advisor.firstName,
            lastName: advisor.lastName,
            picture: advisor.picture,
            academicPositionId: academicPosition.id,
            departmentId: department.id
          }
        }
      },
      include: {
        advisor: true
      }
    });
    
    console.log(`Created advisor: ${advisor.firstName} ${advisor.lastName} (${advisor.username})`);
  }
  console.log("Advisors creation completed");
}