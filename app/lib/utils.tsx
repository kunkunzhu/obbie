/** @format */

import { User } from "@prisma/client";
import { useMatches } from "@remix-run/react";
import { clsx, type ClassValue } from "clsx";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { DateI } from "../types";

export const timeTable = {
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  days: ["S", "M", "T", "W", "T", "F", "S"],
};

export function getDateI(date: string): DateI {
  return {
    year: parseInt(date.substring(0, 4)),
    month: parseInt(date.substring(5, 7)),
    day: parseInt(date.substring(8, 10)),
  };
}

export function dateIntoYear(date: DateI) {
  let dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let dayOfYear = dayCount[date.month] + date.day;
  let isLeapYear = new Date(date.year, 1, 29).getMonth() === 1;
  if (date.day > 1 && isLeapYear) dayOfYear++;
  return dayOfYear;
}

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data as Record<string, unknown>;
}

function isUser(user: unknown): user is User {
  return (
    user != null &&
    typeof user === "object" &&
    "email" in user &&
    typeof user.email === "string"
  );
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser(): User {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}
