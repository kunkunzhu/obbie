/** @format */

import {
  Avatar,
  Button,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import type { User } from "@prisma/client";
import { NavLink, useFetcher } from "@remix-run/react";

function SignOutButton() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" action="/sign-out">
      <Button color="primary" type="submit">
        <span className="capitalize"> log out</span>
      </Button>
    </fetcher.Form>
  );
}

export default function UserHeader(user: { user: User }) {
  return (
    <div className="flex gap-4 align-middle absolute top-0 right-0 px-12 py-8">
      {/* TO DO: allow customizable avatars */}
      <Popover placement="bottom" showArrow={true} className="mt-2">
        <PopoverTrigger className="cursor-pointer">
          <Avatar isBordered />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2 py-2 min-w-[120px] max-w-[150px]">
          <div className="flex flex-col text-center">
            <span className="opacity-50 text-xs">Logged in as</span>
            <span className="px-2 truncate text-medium">
              {user.user.username}
            </span>
          </div>
          <Divider />
          <div className="gap-2 flex flex-col">
            <NavLink to="/etc/profile">
              <Button>Profile</Button>
            </NavLink>
            <SignOutButton />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
