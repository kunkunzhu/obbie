/** @format */

import { NavLink } from "@remix-run/react";
import { useState } from "react";
import { cn } from "~/lib/utils";

interface EtcTabNavItemI {
  redirect: string;
  key: number;
  name: string;
}

export function EtcTabNavItem({ redirect, key, name }: EtcTabNavItemI) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavLink
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      to={redirect}
      key={key}
      className={({ isActive, isPending }) =>
        cn(
          "transition-all bg-background text-2xl border-b-black flex justify-center rounded-t-xl border-t-2 border-x-2 p-1 border-secondary",
          !(isActive || isPending) && "border-b-2"
        )
      }
    >
      {({ isActive, isPending }) => (
        <div className="my-auto flex gap-2 transition-all rounded-xl px-6 py-1">
          <span
            className={cn(
              "lowercase",
              isActive || isHovered || isPending
                ? "text-primary"
                : "text-secondary",
              isPending && "opacity-70"
            )}
          >
            {name}
          </span>
        </div>
      )}
    </NavLink>
  );
}

export default function EtcTabNav() {
  return (
    <div className="flex flex-row-reverse justify-end ml-20 p-4 pb-0 gap-1">
      <EtcTabNavItem key={1} name="profile" redirect="/etc/profile" />
      <EtcTabNavItem key={2} name="about" redirect="/etc/about" />
    </div>
  );
}
