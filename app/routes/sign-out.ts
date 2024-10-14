/** @format */

import { ActionFunctionArgs } from "@remix-run/node";
import { signout } from "~/services/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("LOG OUT TRIGGERED");
  return signout(request);
};
