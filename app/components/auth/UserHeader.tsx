/** @format */

import { Avatar, Button, Tooltip } from "@nextui-org/react";
import type { User } from "@prisma/client";
import { useFetcher } from "@remix-run/react";

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
      <Tooltip content={user.user.username}>
        <Avatar isBordered />
      </Tooltip>
      <SignOutButton />
    </div>
  );
}
