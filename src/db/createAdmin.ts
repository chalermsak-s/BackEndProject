import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { role } from '../../node_modules/.prisma/client/index.d';

const prisma = new PrismaClient();

export async function createAdmin(admin: { username: string; password: string; name:string }) {
  const numSaltRounds = 10;
  const hashedPassword = bcrypt.hashSync(admin.password, numSaltRounds);

  console.log("Creating admin data...");
  try {
    //Create user and admin in one step
    const createdUser = await prisma.user.create({
      data: {
        username: admin.username,
        password: hashedPassword,
        user_role: {
          connect: {
            role_name: "Admin", // Replace "Admin" with the actual role name or use an ID
          },
        },
        admin: {
          create: {
            name: admin.name,
          },
        },
      },
      include: {
        admin: true,
      },
    });

    // console.log(`Admin created: ${createdUser.username}`);
  } catch (error) {
    console.error("Error creating admin:", error);
  }
}
