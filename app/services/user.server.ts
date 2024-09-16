/** @format */

import bcrypt from "bcryptjs";
import { prisma } from "./prisma.server";
import type { User } from "@prisma/client";
import { UserRegistration } from "./type.server";

export type { User } from "@prisma/client";

export const createUser = async (user: UserRegistration) => {
  const passwordHash = await bcrypt.hash(user.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: passwordHash,
      username: user.username,
    },
  });
  console.log("NEW USER CREATED");
  return { id: newUser.id, email: user.email };
};

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, username: true },
  });
  return user;
}

// export async function getUserById(id: User["id"]) {
//   return prisma.user.findUnique({ where: { id } });
// }

// export async function getUserByEmail(email: User["email"]) {
//   return prisma.user.findUnique({ where: { email } });
// }

// export async function deleteUserByEmail(email: User["email"]) {
//   return prisma.user.delete({ where: { email } });
// }

// export async function verifysignin(email: User["email"], password: string) {
//   const user = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (!user) {
//     return null;
//   }

//   const isValid = await bcrypt.compare(password, user.password);

//   if (!isValid) {
//     return null;
//   }

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { password: _password, ...userProfile } = user;

//   return userProfile;
// }
