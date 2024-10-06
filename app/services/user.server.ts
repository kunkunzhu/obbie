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
  const user = (await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, username: true },
  })) as User;
  return user;
}
// }
