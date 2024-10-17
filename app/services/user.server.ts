/** @format */

import bcrypt from "bcryptjs";
import { prisma } from "./prisma.server";
import type { User } from "@prisma/client";
import { UserRegistration } from "./type.server";
import { HobbyI } from "~/types";
import { json } from "@remix-run/node";

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

export async function markUserProfileAsComplete(userId: string) {
  const completedProfile = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      profileComplete: true,
    },
  });

  if (!completedProfile) {
    const errorMsg =
      "Oops! Something went wrong while marking the profile as complete.";
    console.log(errorMsg);
    return { error: errorMsg, status: 400 };
  }

  console.log(`The user ${userId}'s profile is now complete!`);

  return json({ status: 200 });
}

export async function addUserHobbies(hobbies: HobbyI[], userId: string) {
  if (!userId) {
    const errorMsg = "No user found.";
    console.log(errorMsg);
    return { error: errorMsg, status: 400 }; // TO DO: change to more detailed HTTP error codes
  }

  const newHobbies = hobbies.map(async (hobby) => {
    const exists = await prisma.hobby.findFirst({
      where: {
        name: hobby.name,
        emoji: hobby.emoji,
        userId: userId,
      },
    });

    // TO DO: add more robust error handling (e.g. when hobby already exists, other errors)
    if (!exists) {
      const updatedHobby = await prisma.hobby.create({
        data: {
          name: hobby.name,
          emoji: hobby.emoji,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } else {
      console.log(`Hobby ${hobby.emoji} already exists!`);
    }
  });

  if (!newHobbies) {
    const errorMsg = "No user found.";
    console.log(errorMsg);
    return { error: errorMsg, status: 400 };
  }

  console.log("Hobbies successfully added!");

  return json({ status: 200 });
}
