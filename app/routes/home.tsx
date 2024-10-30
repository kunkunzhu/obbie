/** @format */

import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigation } from "@remix-run/react";
import UserHeader from "~/components/auth/UserHeader";
import HomeTabNav from "~/components/tabnav/HomeTabNav";
import { cn, dictFromHobbies } from "~/lib/utils";
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
  const hobbiesDict = dictFromHobbies(hobbies);

  console.log("Hobbies:", hobbies);

  return { user: user, hobbies: hobbies, hobbiesDict: hobbiesDict };
};

export default function App() {
  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <div>
      {data.user && <UserHeader user={data.user} />}
      <HomeTabNav hobbies={data.hobbies} />
      <div className={cn(navigation.state === "loading" && "blur")}>
        <Outlet context={data} />
      </div>
    </div>
  );
}
