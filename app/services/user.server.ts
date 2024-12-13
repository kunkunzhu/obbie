/** @format */

import type { User } from "@prisma/client";
import { json } from "@remix-run/node";
import bcrypt from "bcryptjs";
import { HobbyI } from "~/types";
import { prisma } from "./prisma.server";
import { UserRegistration } from "./type.server";

export type { User } from "@prisma/client";

export async function createUser(user: UserRegistration) {
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
}

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
        color: hobby.color,
        userId: userId,
      },
    });

    // TO DO: add more robust error handling (e.g. when hobby already exists, other errors)
    if (!exists) {
      await prisma.hobby.create({
        data: {
          name: hobby.name,
          emoji: hobby.emoji,
          color: hobby.color,
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

export async function updateUserHobbies(
  hobbyName: string,
  userId: string,
  updateData: any
) {
  if (!userId) {
    const errorMsg = "No user found.";
    console.log(errorMsg);
    return { error: errorMsg, status: 400 }; // TO DO: change to more detailed HTTP error codes
  }

  const updatedHobby = await prisma.hobby.update({
    where: {
      name: hobbyName,
      userId: userId,
    },
    data: updateData,
  });

  if (!updatedHobby) {
    const errorMsg = "Hobby update not successful.";
    console.log(errorMsg);
    return { error: errorMsg, status: 400 };
  }

  console.log("Hobbies successfully updated!", updatedHobby);

  return json({ status: 200 });
}

export async function getUserHobbies(userId: string) {
  const hobbies = await prisma.hobby.findMany({
    where: {
      userId: userId,
    },
  });

  if (!hobbies) {
    const errorMsg = "No hobbies found for the user!";
    console.log(errorMsg);
    return null;
  }

  return hobbies;
}
