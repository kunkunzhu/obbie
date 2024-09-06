/** @format */

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import "./tailwind.css";
import { hobbiesData } from "./lib/example-data";
import { HobbyI } from "./types";
import NavHeader from "./components/header/NavHeader";
import SidebarNav from "./components/sidebar/SidebarNav";
import { NextUIProvider } from "@nextui-org/react";
import { cn } from "./lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anybody:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body className="flex max-w-screen max-h-screen overflow-hidden font-text bg-background text-primary">
        <NextUIProvider>
          {children}
          <ScrollRestoration />
          <Scripts />
        </NextUIProvider>
      </body>
    </html>
  );
}

export default function App() {
  const exampleHobbiesData = hobbiesData as HobbyI[];
  const navigation = useNavigation();

  return (
    <div>
      <NavHeader />
      <div className="flex">
        <div className="p-10 w-[20vw] flex flex-col justify-center">
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
    </div>
  );
}
