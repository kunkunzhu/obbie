/** @format */

import { Outlet, useNavigation } from "@remix-run/react";
import SidebarNav from "~/components/sidebar/SidebarNav";
import { hobbiesData } from "~/lib/example-data";
import { cn } from "~/lib/utils";
import { HobbyI } from "~/types";

export default function App() {
  const exampleHobbiesData = hobbiesData as HobbyI[];
  const navigation = useNavigation();

  return (
    <div className="flex">
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
