/** @format */

import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { NextUIProvider } from "@nextui-org/react";
import { AppLayout } from "./components/layout";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
// import { getUser } from "./services/session.server";

export const meta: MetaFunction = () => [
  {
    charset: "utf-8",
    title: "Obbie",
    description: "show up to your side quests.",
    viewport: "width=device-width,initial-scale=1",
  },
];

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
      <body className="overflow-hidden font-text bg-background text-primary">
        <NextUIProvider>
          {children}
          <ScrollRestoration />
          <Scripts />
        </NextUIProvider>
      </body>
    </html>
  );
}

// export async function loader({ request }: LoaderFunctionArgs) {
//   return json({
//     user: await getUser(request),
//   });
// }

export default function App() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
