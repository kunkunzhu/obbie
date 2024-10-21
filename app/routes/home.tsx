/** @format */

import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigation } from "@remix-run/react";
import UserHeader from "~/components/auth/UserHeader";
import SidebarNav from "~/components/sidebar/SidebarNav";
import { cn } from "~/lib/utils";
import { getUser } from "~/services/session.server";
import { getUserHobbies } from "~/services/user.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) {
    return redirect("/sign-in");
  }

  if (user && user.profileComplete == false) {
    return redirect("/complete-profile");
  }

  const hobbies = await getUserHobbies(user.id);

  console.log("Hobbies:", hobbies);

  return { user: user, hobbies: hobbies };
};

export default function App() {
  const { user, hobbies } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <div className="flex">
      {user && <UserHeader user={user} />}
      <div className="p-10 w-[20vw] flex flex-col justify-center relative">
        <SidebarNav hobbies={hobbies} />
      </div>
      <div
        className={cn(
          "w-[80vw] px-10 py-0 ml-25",
          navigation.state === "loading" && "blur"
        )}
      >
        <Outlet />
      </div>
    </div>
  );
}
