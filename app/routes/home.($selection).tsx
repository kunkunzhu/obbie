/** @format */

// import TimelineTracker from "../components/tracker/tracker-timeline";
import { Outlet, useLoaderData, useParams } from "@remix-run/react";

import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { HobbyMutationI } from "~/types";
import TimelineTracker from "~/components/tracker/TimelineTracker";
import CalTracker from "~/components/tracker/CalTracker";
import { createHobbyEntry, getHobbyEntries } from "~/lib/data";
import { getEmojiDict, timeTable } from "~/lib/example-data";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formEntry = Object.fromEntries(formData);

  const dateString = formEntry.date as string;
  const projectsString = formEntry.projects as string;

  const entry: HobbyMutationI = {
    hobby: formEntry.hobby as string,
    description: formEntry.description as string,
    projects: projectsString ? projectsString.split(",") : [],
    date: {
      year: parseInt(dateString.substring(0, 4)),
      month: parseInt(dateString.substring(5, 7)),
      day: parseInt(dateString.substring(8, 10)),
    },
    dateStr: dateString.substring(0, 10),
    star: formEntry.star ? true : false,
  };

  return await createHobbyEntry(entry);
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const entries = params
    ? await getHobbyEntries(params.selection)
    : await getHobbyEntries();
  if (!entries) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ entries });
};

export default function Home() {
  const { entries } = useLoaderData<typeof loader>();
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
            hobby={params.selection ? params.selection : "all"}
          />
        </div>
      </div>
      <div id="pt-10 pb-20" className="max-h-[65vh]">
        <TimelineTracker entries={entries} emojiDict={emojiDict} />
        <Outlet />
      </div>
    </div>
  );
}
