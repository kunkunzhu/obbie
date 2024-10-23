/** @format */

import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigation } from "@remix-run/react";
import UserHeader from "~/components/auth/UserHeader";
import SidebarNav from "~/components/sidebar/SidebarNav";
import { cn } from "~/lib/utils";
import { getUser } from "~/services/session.server";
import { getUserHobbies } from "~/services/user.server";
import { HobbyDict, HobbyI } from "~/types";

const dictFromHobbies = (hobbies: HobbyI[] | null) => {
  let hobbiesDict: HobbyDict = {};
  if (hobbies) {
    for (let i = 0; i < hobbies.length; i++) {
      const hobby = hobbies[i];
      hobbiesDict[hobby.name] = {
        emoji: hobby.emoji,
        color: hobby.color,
      };
    }
  }
  return hobbiesDict;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) {
    return redirect("/sign-in");
  }

  if (user && user.profileComplete == false) {
    return redirect("/complete-profile");
  }

  const hobbies = await getUserHobbies(user.id);
  const hobbiesDict = dictFromHobbies(hobbies);

  console.log("Hobbies:", hobbies);

  return { user: user, hobbies: hobbies, hobbiesDict: hobbiesDict };
};

export default function App() {
  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <div className="flex">
      {data.user && <UserHeader user={data.user} />}
      <div className="p-10 w-[20vw] flex flex-col justify-center relative">
        <SidebarNav hobbies={data.hobbies} />
      </div>
      <div
        className={cn(
          "w-[80vw] px-10 py-0 ml-25",
          navigation.state === "loading" && "blur"
        )}
      >
        <Outlet context={data} />
      </div>
    </div>
  );
}
