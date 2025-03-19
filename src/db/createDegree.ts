import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createDegrees() {
  const degrees = [
    { degree_name: 'ปริญญาตรี' },
    { degree_name: 'ปริญญาโท' },
    { degree_name: 'ปริญญาเอก' },
  ]

  console.log('เริ่มสร้างข้อมูลระดับการศึกษา...')

  try {
    for (const degree of degrees) {
      await prisma.degree.create({
        data: degree,
      })

      console.log(`Created degree: ${degree.degree_name}`)
    }

    console.log('Degrees creation completed')
  } catch (error) {
    console.error('Error creating degrees:', error)
  }
}
