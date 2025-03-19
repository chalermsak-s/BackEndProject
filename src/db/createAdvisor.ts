import { PrismaClient} from '@prisma/client'
import bcrypt from 'bcryptjs'
import { role } from '../../node_modules/.prisma/client/index.d';
const prisma = new PrismaClient()
const numSaltAround = 10

// ข้อมูลอาจารย์ที่ปรึกษา
export async function createAdvisors() {
  const advisors = [
    {
      username: 'somchai_s',
      password: 'password123',
      firstName: 'สมชาย',
      lastName: 'สมศักดิ์',
      picture: 'somchai.jpg',
      academicPositionName: 'รองศาสตราจารย์',
      departmentName: 'นวัตกรรมดิจิทัล',
    },
    {
      username: 'sompong_l',
      password: 'password123',
      firstName: 'สมปอง',
      lastName: 'ใจดี',
      picture: 'sompong.jpg',
      academicPositionName: 'ผู้ช่วยศาสตราจารย์',
      departmentName: 'นวัตกรรมดิจิทัล',
    },
    {
      username: 'somsri_p',
      password: 'password123',
      firstName: 'สมศรี',
      lastName: 'ประเสริฐ',
      picture: 'somsri.jpg',
      academicPositionName: 'อาจารย์',
      departmentName: 'นวัตกรรมดิจิทัล',
    },
  ]

  try {
    for (const advisor of advisors) {
      // ค้นหาตำแหน่งทางวิชาการ
      const academicPosition = await prisma.academic_position.findFirst({
        where: { academic_position_name: advisor.academicPositionName },
      })

      if (!academicPosition) {
        console.error(
          `Academic position '${advisor.academicPositionName}' not found`
        )
        continue
      }

      // ค้นหาภาควิชา
      const department = await prisma.department.findFirst({
        where: { department_name: advisor.departmentName },
      })

      if (!department) {
        console.error(`Department '${advisor.departmentName}' not found`)
        continue
      }

      // เข้ารหัสรหัสผ่าน
      const hashedPassword = await bcrypt.hashSync(
        advisor.password,
        numSaltAround
      )

      // สร้าง user และ advisor ในทีเดียว
      const createdUser = await prisma.user.create({
        data: {
          username: advisor.username,
          password: hashedPassword,
          user_role: {
            connect: {
              role_name: "Advisor", // Replace "Admin" with the actual role name or use an ID
            },
          },
          advisor: {
            create: {
              first_name: advisor.firstName,
              last_name: advisor.lastName,
              picture: advisor.picture,
              academic_position: {
                connect: { id: academicPosition.id }, // Use connect to link to an existing record
              },
              department: {
                connect: { id: department.id }, // Assuming department is also a relation
              },
            },
          },
        },
        include: {
          advisor: true,
        },
      })

      console.log(
        `Created advisor: ${advisor.firstName} ${advisor.lastName} (${advisor.username})`
      )
    }

    console.log('Advisors creation completed')
  } catch (error) {
    console.error('Error creating advisors:', error)
  }
}
