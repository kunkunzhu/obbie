/** @format */

export interface DateI {
  year: number;
  month: number;
  day: number;
}

export interface HobbyEntryMutationI {
  hobbyName: string;
  description?: string;
  projects?: string[];
  date: string;
  starred: boolean;
}

export type ActionData = {
  error?: string;
};

export interface HobbyEntryI extends HobbyEntryMutationI {
  id: string;
}

export interface HobbyI {
  emoji: string;
  name: string;
  color: string;
}

export type SiteConfig = {
  name: string;
  description: string;
};

type HobbyDictVal = {
  emoji: string;
  color: string;
};

export type HobbyDict = {
  [name: string]: HobbyDictVal;
};
