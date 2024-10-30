/** @format */

import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigation } from "@remix-run/react";
import EtcTabNav from "~/components/tabnav/EtcTabNav";
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

  return { user: user, hobbies: hobbies, hobbiesDict: hobbiesDict };
};

export default function App() {
  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <div>
      <EtcTabNav />
      <div className={cn(navigation.state === "loading" && "blur")}>
        <Outlet context={data} />
      </div>
    </div>
  );
}
