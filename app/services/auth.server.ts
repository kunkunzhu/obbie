/** @format */

import { json } from "@remix-run/node";
import { prisma } from "./prisma.server";
import { UserLogin, UserRegistration } from "./type.server";
import { createUser } from "./user.server";
import bcrypt from "bcryptjs";
import { createUserSession } from "./session.server";

export async function register(user: UserRegistration) {
  const exists = await prisma.user.count({ where: { email: user.email } });
  if (exists) {
    return json(
      { error: `User already exists with that email` },
      { status: 400 }
    );
  }
  const newUser = await createUser(user);
  if (!newUser) {
    return json(
      {
        error: `Something went wrong when trying to create a new user.`,
        fields: { email: user.email, password: user.password },
      },
      { status: 400 }
    );
  }
}

export async function signin({ email, password }: UserLogin) {
  console.log("Signing in...");
  const user = await prisma.user.findFirst({
    where: { email, username: undefined },
  }); // TO DO : figure out why username cannot be optional
  if (!user) {
    const errorMsg = "The user with the given email does not exist.";
    console.log(errorMsg);
    return { error: errorMsg, status: 400 };
  } else if (!(await bcrypt.compare(password, user.password))) {
    const errorMsg = "The password is incorrect.";
    console.log(errorMsg);
    return { error: errorMsg, status: 400 };
  }

  return createUserSession({ userId: user.id, redirectTo: "/home" });
}

export async function signup(user: UserRegistration) {
  console.log("Signing up...");
  const exists = await prisma.user.count({ where: { email: user.email } });
  if (exists) {
    const errorMsg = "User with this email already exists";
    console.log(errorMsg);
    return json({ error: errorMsg }, { status: 400 });
  }

  const newUser = await createUser(user);
  if (!newUser) {
    return json(
      {
        error: `Something went wrong when trying to create a new user.`,
        fields: { email: user.email, password: user.password },
      },
      { status: 400 }
    );
  }
  return createUserSession({ userId: newUser.id, redirectTo: "/home" });
}
