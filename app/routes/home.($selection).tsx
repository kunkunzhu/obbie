/** @format */

// import TimelineTracker from "../components/tracker/tracker-timeline";
import { Outlet, useLoaderData, useParams } from "@remix-run/react";
import { useOutletContext } from "@remix-run/react";
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { HobbyDict, HobbyEntryI, HobbyEntryMutationI } from "~/types";
import TimelineTracker from "~/components/tracker/TimelineTracker";
import CalTracker from "~/components/tracker/CalTracker";
import { createHobbyEntry, getHobbyEntries } from "~/lib/data";
import { getEmojiDict, timeTable } from "~/lib/example-data";
import { createEntry, getEntry } from "~/services/entry.server";
import type { User, Hobby } from "@prisma/client";
import { requireUserId } from "~/services/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const formEntry = Object.fromEntries(formData);

  const dateString = formEntry.date as string;
  const projectsString = formEntry.projects as string;

  console.log(formEntry.starred);

  const entry: HobbyEntryMutationI = {
    hobbyName: formEntry.hobby as string,
    description: formEntry.description as string,
    projects: projectsString ? projectsString.split(",") : [],
    date: dateString.substring(0, 10),
    starred: formEntry.starred ? true : false,
  };

  console.log("Creating entry...", entry);

  return await createEntry(entry, userId);
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);

  const entries =
    params && params.selection
      ? await getEntry(userId, params.selection)
      : await getEntry(userId);

  return { entries: entries };
};

type ContextType = {
  user: User;
  hobbies: Hobby[];
  hobbiesDict: HobbyDict;
};

type LoaderDataType = {
  entries: HobbyEntryI[];
};

export default function Home() {
  const { user, hobbies, hobbiesDict } = useOutletContext<ContextType>();
  const { entries } = useLoaderData<LoaderDataType>();
  const emojiDict = getEmojiDict();
  const params = useParams();

  return (
    <div>
      <div id="pt-10 pb-20" className="max-h-[25vh]">
        <div>
          <CalTracker
            months={timeTable.months}
            days={timeTable.days}
            entries={entries}
            hobbiesDict={hobbiesDict}
            hobby={params.selection ? params.selection : "all"}
          />
        </div>
      </div>
      <div id="pt-10 pb-20" className="max-h-[65vh]">
        <TimelineTracker
          entries={entries}
          hobbiesDict={hobbiesDict}
          hobbies={hobbies}
        />
        <Outlet />
      </div>
    </div>
  );
}
