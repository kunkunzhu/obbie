/** @format */

import { NavLink } from "@remix-run/react";
import { ReactNode, useState } from "react";
import { cn } from "~/lib/utils";
import { HobbyI } from "~/types";

interface SidebarNavI {
  hobbies: HobbyI[];
}

interface SidebarNavItemI {
  key: number;
  name: string;
  hobbyType: string;
  color: string;
  emoji: string;
}

function SidebarNavItem({
  key,
  name,
  hobbyType,
  color,
  emoji,
}: SidebarNavItemI) {
  const [isHovered, setIsHovered] = useState(false);
  let redirect = "/home/";
  if (hobbyType) {
    redirect = redirect.concat(hobbyType);
  }

  return (
    <NavLink
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      key={key}
      to={redirect}
      className={({ isActive, isPending }) =>
        cn(
          "transition-all bg-background text-2xl border-b-black flex justify-center rounded-t-xl border-t-2 border-x-2 p-1 border-secondary",
          !(isActive || isPending) && "border-b-2"
        )
      }
    >
      {({ isActive, isPending }) => (
        <div
          className="my-auto flex gap-2 transition-all rounded-xl px-6 py-1"
          style={{
            backgroundColor:
              (isActive || isHovered) && !isPending ? color : "transparent",
          }}
        >
          <span>{emoji}</span>
          <span style={{ display: isActive ? "block" : "none" }}>{name}</span>
        </div>
      )}
    </NavLink>
  );
}

export default function SidebarNav({ hobbies }: SidebarNavI) {
  const renderHobbies = (hobbies: HobbyI[]): ReactNode[] => {
    let hobbiesArray: ReactNode[] = [];
    hobbies.map((hobby, index) => {
      hobbiesArray.push(
        <SidebarNavItem
          key={index}
          name={hobby.name}
          hobbyType={hobby.name}
          color={hobby.color}
          emoji={hobby.emoji}
        />
      );
    });
    hobbiesArray.push([
      <SidebarNavItem
        key={9}
        name="star"
        hobbyType="star"
        color="transparent"
        emoji="⭐"
      />,
      <SidebarNavItem
        key={10}
        name=":)"
        hobbyType="all"
        color="transparent"
        emoji="⚪"
      />,
    ]);

    return hobbiesArray;
  };

  return (
    <div className="flex flex-row-reverse justify-end ml-20 p-4 pb-0 gap-1">
      {renderHobbies(hobbies)}
    </div>
  );
}
