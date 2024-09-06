/** @format */

import { HobbyEntryI } from "~/types";
import { IoIosAdd } from "react-icons/io";
import { useSearchParams } from "@remix-run/react";
import { cn } from "~/lib/utils";
import { useDisclosure } from "@nextui-org/react";
import { CreateModal } from "../modal/CreateModal";

interface TimelineTrackerI {
  entries: HobbyEntryI[];
  emojiDict: any;
}

interface TimelineEntryI {
  entry: HobbyEntryI;
  emoji: string;
  key: number;
}

function TimelineEntry({ entry, emoji, key }: TimelineEntryI) {
  const { hobby, date } = entry;

  const cardClassName = hobby + "card";

  const day = date.day;

  return (
    <div
      className={cn(
        cardClassName,
        "ml-20 bg-white border-2 px-10 py-6 border-grey rounded-xl flex flex-col gap-4 w-fit max-w-[60vw] drop-shadow-entry"
      )}
      key={key}
    >
      <div className="absolute -left-16">{day}</div>
      <div className="flex align-middle gap-4">
        <div className="flex gap-2">
          <span className="text-2xl">{emoji}</span>
          {entry.star && <span className="text-2xl">⭐</span>}
        </div>
        {entry.projects && (
          <div className="flex my-auto gap-2">
            {entry.projects.map((project, idx) => (
              <div
                className={cn("h-6 px-2 text-white rounded-full", hobby)}
                key={idx}
              >
                {project}
              </div>
            ))}
          </div>
        )}
      </div>
      {entry.description && (
        <div className="my-auto mx-0">{entry.description}</div>
      )}
    </div>
  );
}

export default function TimelineTracker({
  entries,
  emojiDict,
}: TimelineTrackerI) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function renderEntry({ entry, idx }: { entry: HobbyEntryI; idx: number }) {
    const emoji = emojiDict[entry.hobby];
    return <TimelineEntry key={idx} entry={entry} emoji={emoji} />;
  }

  return (
    <>
      <CreateModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className="timeline-wrapper overflow-x-visible overflow-y-scroll mt-12 w-full h-[60vh] border-t-2 border-t-grey">
        <div
          className="-mt-6 ml-6 cursor-pointer absolute bg-primary size-12 flex justify-center rounded-full"
          onClick={onOpen}
        >
          <IoIosAdd className="size-12 text-background" />
        </div>
        <div className="my-12 flex relative">
          {entries.length > 0 ? (
            <div className="flex flex-col gap-6">
              {entries.map((entry, idx) => renderEntry({ entry, idx }))}
            </div>
          ) : (
            <div className="mx-auto my-0">
              There are no entries yet... Start by logging one! (˶˃ ᵕ ˂˶) .ᐟ.ᐟ
            </div>
          )}
        </div>
      </div>
    </>
  );
}
