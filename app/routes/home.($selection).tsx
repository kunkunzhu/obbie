/** @format */

import type { Hobby, User } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Outlet,
  useLoaderData,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import CalTracker from "~/components/tracker/CalTracker";
import TimelineTracker from "~/components/tracker/TimelineTracker";
import { timeTable } from "~/lib/utils";
import {
  createEntry,
  getEntry,
  getStarredEntries,
} from "~/services/entry.server";
import { requireUserId } from "~/services/session.server";
import { HobbyDict, HobbyEntryI, HobbyEntryMutationI } from "~/types";

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

  let entries;
  if (params) {
    entries =
      params.selection && params.selection == "star"
        ? await getStarredEntries(userId)
        : await getEntry(userId, params.selection);
  } else {
    entries = await getEntry(userId);
  }

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
