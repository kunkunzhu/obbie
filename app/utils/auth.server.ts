/** @format */

import { LogInForm, SignUpForm } from "./type.server";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma.server";
import { createCookieSessionStorage, json, redirect } from "@remix-run/node";
import { createUser } from "./user.server";

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    // const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login`);
  }
  return userId;
}

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, userName: true },
  });
  return user;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }

  const user = getUserById(userId);
  if (!user) {
    throw logout(request);
  } else {
    return user;
  }
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function signup(user: SignUpForm) {
  const exists = await prisma.user.count({ where: { email: user.email } });
  if (exists) {
    console.log("");
    return json(
      { error: `User already exists with that email` },
      { status: 400 }
    );
  }

  const newUser = await createUser(user);
  if (!newUser) {
    return json(
      {
        error: `Uer creation is unsuccessful.`,
        fields: { email: user.email, password: user.password },
      },
      { status: 400 }
    );
  }

  return createUserSession(newUser.id, "/");
}

export async function login({ email, password }: LogInForm) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return json(
      { error: `There exists no user with the given email address.` },
      { status: 400 }
    );
  } else if (!(await bcrypt.compare(password, user.password)))
    return json({ error: `The password is incorrect` }, { status: 400 });

  return createUserSession(user.id, "/");
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "obbie-session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}
