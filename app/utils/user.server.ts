/** @format */

import bcrypt from "bcryptjs";
import { prisma } from "./prisma.server";
import { SignUpForm } from "./type.server";

export const createUser = async (user: SignUpForm) => {
  const passwordHash = await bcrypt.hash(user.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: passwordHash,
      userName: user.username,
    },
  });
  console.log("NEW USER CREATED");
  return { id: newUser.id, email: user.email };
};
