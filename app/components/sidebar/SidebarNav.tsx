/** @format */

import { ReactNode } from "react";
import { NavLink } from "@remix-run/react";
import { HobbyI } from "~/types";
import { cn } from "~/lib/utils";

interface SidebarNavI {
  hobbies: HobbyI[];
  // colorDict: any;
}

export default function SidebarNav({ hobbies }: SidebarNavI) {
  const renderHobbies = (hobbies: HobbyI[]): ReactNode[] => {
    let hobbiesArray: ReactNode[] = [];
    hobbies.map((hobby, index) => {
      hobbiesArray.push(
        <NavLink
          key={index}
          to={`/home/${hobby.name}`}
          className={({ isActive, isPending }) =>
            cn(
              "transition-all text-3xl flex justify-center rounded-full border-2 size-14 border-secondary",
              hobby.name,
              isActive && "!border-primary",
              isPending && "brightness-110"
            )
          }
        >
          <div className="hover:opacity-100 opacity-80 my-auto hover:scale-110 transition-all">
            {hobby.emoji}
          </div>
        </NavLink>
      );
    });
    hobbiesArray.push(
      <NavLink
        key={9}
        to={`/home/star`}
        className={({ isActive, isPending }) =>
          cn(
            "transition-all text-3xl flex justify-center rounded-full border-2 size-14 border-secondary",
            isActive && "!border-primary",
            isPending && "brightness-110"
          )
        }
      >
        <div className="hover:opacity-100 opacity-80 my-auto hover:scale-110 transition-all">
          ⭐
        </div>
      </NavLink>
    );
    hobbiesArray.push(
      <NavLink
        key={10}
        to={`/home/all`}
        className={({ isActive, isPending }) =>
          cn(
            "transition-all text-3xl flex justify-center rounded-full border-2 size-14 border-secondary",
            isActive && "!border-primary",
            isPending && "brightness-110"
          )
        }
      >
        <div className="hover:opacity-100 opacity-80 my-auto hover:scale-110 transition-all">
          ⚪
        </div>
      </NavLink>
    );
    return hobbiesArray;
  };

  return (
    <div className="flex flex-col-reverse gap-4 mx-auto my-0">
      {renderHobbies(hobbies)}
    </div>
  );
}
