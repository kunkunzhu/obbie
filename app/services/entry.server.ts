/** @format */

import { prisma } from "./prisma.server";
import { json } from "@remix-run/node";
import { HobbyEntryMutationI } from "~/types";

export async function createEntry(entry: HobbyEntryMutationI, userId: string) {
  const newEntry = await prisma.entry.create({
    data: {
      description: entry.description,
      projects: entry.projects,
      date: entry.date,
      starred: entry.starred,
      hobby: {
        connect: {
          name: entry.hobbyName,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  if (!newEntry) {
    const errorMsg = "Failed to add new entry";
    console.log(errorMsg);
    return { error: errorMsg, status: 400 };
  }
  console.log("Successfully added entry!", newEntry);
  return json({ status: 200 });
}

export async function getEntry(userId: string, query?: string | null) {
  const hobbyName = !query || query == "all" ? undefined : query;

  const entries = await prisma.entry.findMany({
    where: {
      hobbyName: hobbyName,
      userId: userId,
    },
  });

  if (!entries) {
    const errorMsg = "Failed to fetch entries";
    console.log(errorMsg);
    return null;
  }
  console.log("Successfully fetched entries!", entries);
  return entries;
}
