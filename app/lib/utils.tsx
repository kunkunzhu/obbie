/** @format */

import { DateI } from "../types";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

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
