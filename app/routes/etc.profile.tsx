/** @format */

import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  Divider,
} from "@nextui-org/react";
import { IoMdAdd } from "react-icons/io";
import { Hobby, User } from "@prisma/client";
import { useOutletContext } from "@remix-run/react";
import { MdEdit } from "react-icons/md";
import { HobbyDict, HobbyI } from "~/types";
import { useState } from "react";
import { AddUpdateHobbyDialog } from "~/components/hobby/AddUpdateHobbyDialog";

type ContextType = {
  user: User;
  hobbies: Hobby[];
  hobbiesDict: HobbyDict;
};

function HobbyCard({
  hobby,
  index,
  hobbiesList,
}: {
  hobby: HobbyI;
  index: number;
  hobbiesList: HobbyI[];
}) {
  const [editDialog, setEditDialog] = useState<boolean>(false);

  return (
    <div key={index}>
      <Card className="flex flex-row p-2 items-center justify-between w-full min-w-[350px]">
        <div className="flex flex-row gap-2 items-center">
          <div className="flex gap-2 text-lg items-center">
            <div
              className="rounded-full size-8 flex justify-center items-center border-1"
              style={{ backgroundColor: hobby.color }}
            >
              {hobby.emoji}
            </div>
            <div className="truncate max-w-fit">{hobby.name}</div>
          </div>
        </div>
        <MdEdit
          className="text-secondary cursor-pointer"
          onClick={() => setEditDialog(true)}
        />
      </Card>
      {editDialog && (
        <Card className="mt-4 overflow-visible z-40">
          <AddUpdateHobbyDialog
            action={() => alert(hobby)}
            actionText="Update Hobby"
            curHobbies={hobbiesList}
            setClose={() => setEditDialog(false)}
            defaultHobby={hobby}
            colorPickerStyle="absolute left-[375px]"
            emojiPickerStyle="absolute left-[375px]"
          />
        </Card>
      )}
    </div>
  );
}

function HobbiesProfileSection({ hobbies }: { hobbies: HobbyI[] }) {
  return (
    <div className="flex flex-row gap-4 py-10 px-6 border-1 rounded-lg bg-white">
      {hobbies.map((hobby, index) => {
        const otherHobbies = hobbies.filter((h) => h.name != hobby.name);
        return (
          <HobbyCard hobby={hobby} index={index} hobbiesList={otherHobbies} />
        );
      })}
      {hobbies.length <= 5 && (
        <Button color="secondary">
          <IoMdAdd />
        </Button>
      )}
    </div>
  );
}

export default function Profile() {
  const { user, hobbies, hobbiesDict } = useOutletContext<ContextType>();

  return (
    <div className="bg-background border-t-2 -mt-[2px] w-full p-10">
      <div className="flex flex-col gap-10 mt-10 ml-10 h-[80vh]">
        <div className="font-title">
          <h1 className="text-4xl font-semibold">
            Welcome, <span>{user.username} ᵕ̈</span>
          </h1>
        </div>
        <Divider />
        <div className="flex flex-col gap-4">
          <Accordion>
            <AccordionItem
              aria-label="My Hobbies"
              title="My Hobbies"
              startContent={<img src="/icon.png" className="size-8" />}
              subtitle="Edit or archive your existing hobbies."
            >
              <HobbiesProfileSection hobbies={hobbies} />
            </AccordionItem>
            <AccordionItem
              aria-label="Accordion 1"
              title="Accordion 1"
              startContent={<img src="/icon.png" className="size-8" />}
              subtitle="etc"
            >
              This is just a placeholder
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
