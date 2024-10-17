/** @format */

import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigation } from "@remix-run/react";
import UserHeader from "~/components/auth/UserHeader";
import SidebarNav from "~/components/sidebar/SidebarNav";
import { hobbiesData } from "~/lib/example-data";
import { cn } from "~/lib/utils";
import { getUser } from "~/services/session.server";
import { HobbyI } from "~/types";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (user && user.profileComplete == false) {
    return redirect("/complete-profile");
  }
  return { user: user };
};

export default function App() {
  const { user } = useLoaderData<typeof loader>();
  const exampleHobbiesData = hobbiesData as HobbyI[];
  const navigation = useNavigation();

  return (
    <div className="flex">
      {user && <UserHeader user={user} />}
      <div className="p-10 w-[20vw] flex flex-col justify-center relative">
        <SidebarNav hobbies={exampleHobbiesData} />
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
