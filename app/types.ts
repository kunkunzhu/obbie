/** @format */

export interface DateI {
  year: number;
  month: number;
  day: number;
}

export interface HobbyMutationI {
  hobby: string;
  description?: string;
  projects?: string[];
  pictureURL?: string;
  date: DateI;
  dateStr: string;
  star: boolean;
}

export interface HobbyEntryI extends HobbyMutationI {
  id: string;
}

export interface HobbyI {
  emoji: string;
  name: string;
  // color: string;
}

export type SiteConfig = {
  name: string;
  description: string;
};
