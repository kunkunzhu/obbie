/** @format */

import { HobbyI } from "../types";

export const hobbiesData = [
  {
    emoji: "📚",
    name: "reading",
  },
  {
    emoji: "📝",
    name: "writing",
  },
  {
    emoji: "💻",
    name: "coding",
  },
  {
    emoji: "🎨",
    name: "art",
  },
];

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

export const fakeHobbyEntriesData = [
  {
    hobby: "reading",
    description: "read little fires everywhere during the hour-long commute",
    projects: ["little fires everywhere"],
    date: {
      year: 2024,
      month: 8,
      day: 12,
    },
    dateStr: "2024-08-12",
    star: false,
  },
  {
    hobby: "coding",
    description: "worked on some bug fixes for hobby tracker",
    projects: ["hobby tracker"],
    date: {
      year: 2024,
      month: 8,
      day: 11,
    },
    dateStr: "2024-08-11",
    star: false,
  },
  {
    hobby: "reading",
    description:
      "read little fires everywhere in the morning and astrophysics for people in a hurry before sleep",
    projects: ["little fires everywhere", "astrophysics for people in a hurry"],
    date: {
      year: 2024,
      month: 8,
      day: 10,
    },
    dateStr: "2024-08-10",
    star: false,
  },
  {
    hobby: "writing",
    description: "started a new draft on thoughts on traveling",
    projects: ["thoughts on traveling"],
    date: {
      year: 2024,
      month: 8,
      day: 10,
    },
    dateStr: "2024-08-10",
    star: false,
  },
  {
    hobby: "reading",
    description:
      "started reading little fires everywhere finallyyyy after having the book for so long",
    projects: ["little fires everywhere"],
    date: {
      year: 2024,
      month: 8,
      day: 9,
    },
    dateStr: "2024-08-19",
    star: true,
  },
  {
    hobby: "art",
    description: "drew some random ppl i saw at the coffee shop hehehe",
    projects: [],
    date: {
      year: 2024,
      month: 8,
      day: 9,
    },
    dateStr: "2024-08-19",
    star: false,
  },
  {
    hobby: "reading",
    description:
      "read astrophysics for people in a hurry for a couple hrs before sleep",
    projects: ["astrophysics for people in a hurry"],
    date: {
      year: 2024,
      month: 8,
      day: 7,
    },
    dateStr: "2024-08-7",
    star: true,
  },
];

export const getEmojiDict = () => {
  let hobbyEmojiDict: any = {};
  hobbiesData.forEach((hobby: HobbyI) => {
    hobbyEmojiDict[hobby.name] = hobby.emoji;
  });
  return hobbyEmojiDict;
};
