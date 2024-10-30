/** @format */

import { Hobby, User } from "@prisma/client";
import { useOutletContext } from "@remix-run/react";
import { HobbyDict } from "~/types";

type ContextType = {
  user: User;
  hobbies: Hobby[];
  hobbiesDict: HobbyDict;
};

export default function About() {
  const { user, hobbies, hobbiesDict } = useOutletContext<ContextType>();

  return (
    <div className="bg-background border-t-2 -mt-[2px] w-full p-10">
      <div>coming soon~</div>
    </div>
  );
}
