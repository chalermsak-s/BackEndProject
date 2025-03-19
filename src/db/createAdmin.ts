// Description: Create an admin user in the database using Prisma.
// This script creates an admin user with a hashed password and assigns the role of ADMIN.

import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const numSaltAround = 10;

// Create an admin user in the database
export async function createAdmin() {
  const admin = {
    username: "adminPhu",
    password: "adminPhu123"
  };
  
  const hashedPassword = await bcrypt.hashSync(admin.password, numSaltAround);

  console.log("Creating admin data...");
  
  const createdUser = await prisma.user.create({
    data: {
      username: admin.username,
      password: hashedPassword,
      role: UserRole.ADMIN,
      admin: {
        create: {} // Create an empty admin object
      }
    },
    include: {
      admin: true
    }
  });
  console.log(`Admin created: ${createdUser.username}`);
}