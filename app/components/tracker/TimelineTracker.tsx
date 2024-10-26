/** @format */

import { useDisclosure } from "@nextui-org/react";
import { IoIosAdd } from "react-icons/io";
import { cn, getDateI } from "~/lib/utils";
import { DateI, HobbyDict, HobbyEntryI, HobbyI } from "~/types";
import { CreateModal } from "../modal/CreateModal";
import { FaTrash } from "react-icons/fa";

interface TimelineTrackerI {
  entries: HobbyEntryI[];
  hobbiesDict: HobbyDict;
  hobbies: HobbyI[];
}

interface TimelineEntryI {
  entry: HobbyEntryI;
  hobbiesDict: HobbyDict;
}

function TimelineEntry({ entry, hobbiesDict }: TimelineEntryI) {
  const { date } = entry;
  const { emoji, color } = hobbiesDict[entry.hobbyName];

  const dateI: DateI = getDateI(date);

  const day = dateI.day;

  return (
    <div
      className="ml-20 bg-white border-2 px-10 hover:pb-12 group transition-all py-6 border-grey rounded-xl flex flex-col gap-4 w-fit max-w-[60vw] drop-shadow-entry"
      style={{ borderColor: color }}
    >
      <div className="hidden group-hover:flex opacity-50 w-8 gap-2 absolute bottom-4 right-4">
        <FaTrash className="cursor-pointer" />
      </div>
      <div className="absolute -left-16">{day}</div>
      <div className="flex align-middle gap-4">
        <div className="flex gap-2">
          <span className="text-2xl">{emoji}</span>
          {entry.starred && <span className="text-2xl">⭐</span>}
        </div>
        {entry.projects && (
          <div className="flex my-auto gap-2">
            {entry.projects.map((project, idx) => (
              <div
                className={cn("h-6 px-2 rounded-full")}
                style={{ backgroundColor: color }}
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
  hobbiesDict,
  hobbies,
}: TimelineTrackerI) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function renderEntry({ entry, idx }: { entry: HobbyEntryI; idx: number }) {
    return (
      <div key={idx}>
        <TimelineEntry entry={entry} hobbiesDict={hobbiesDict} />
      </div>
    );
  }

  return (
    <>
      <CreateModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hobbies={hobbies}
      />
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
