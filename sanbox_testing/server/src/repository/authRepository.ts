import { PrismaClient,role} from '@prisma/client';
const prisma = new PrismaClient()
export function findByUserId(userId: number) {
  return prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      user_role: true,
    },
  })
}
export function findByUsername(username: string) {
  return prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      user_role: true,
    },
  })
}

export async function registerAdmin(
  roleId: number,
  username: string,
  password: string
) {
  
  // Create the user with associated roles

  return prisma.user.create({
    data: {
      username: username,
      password: password,
      user_role: {
        connect: {
          id: roleId
        },
      },
      admin: {
        create: {
          name: username,
        },
      },
    },
    include: {
      admin: true,
    },
  });
}

export async function updatePassword(userId: number, password: string) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: password,
    },
  })
}
