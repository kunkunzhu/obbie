/** @format */

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, NavLink, redirect } from "@remix-run/react";
import { getUserId } from "~/services/session.server";
import { signin } from "~/services/auth.server";
import { UserLogin } from "~/services/type.server";

// export async function loader({ request }: LoaderFunctionArgs) {
//   const userId = await getUserId(request);
//   if (userId) return redirect("/");
//   return json({});
// }

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // TODO : perform validation (as done with signup.tsx)
  const user = {
    email: email,
    password: password,
  } as UserLogin;

  console.log("User:", user);

  return await signin(user);
}

function SignInCard() {
  return (
    <Card className="min-w-[400px] -mt-40">
      <CardHeader className="px-4 pt-4">
        <div className="flex gap-2">
          <img src="/icon.png" className="size-8" />
          <h2 className="px-2 text-2xl text-primary font-bold">Log In</h2>
        </div>
      </CardHeader>
      <Divider />
      <Form method="post" id="signin-form" action="/sign-in">
        <CardBody className="flex flex-col gap-4 px-10">
          <Input label="Email" name="email" variant="underlined" isRequired />
          <Input
            label="Password"
            name="password"
            variant="underlined"
            isRequired
          />
          <span className="text-xs opacity-75">
            Don't have an account yet?{" "}
            <NavLink to="/sign-up" className="text-blue-500 underline">
              Sign up
            </NavLink>{" "}
            instead.
          </span>
        </CardBody>
        <CardFooter className="px-4 pb-4 justify-end">
          <Button type="submit" color="primary">
            Log In
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
}

export default function SignIn() {
  return (
    <div className="justify-center items-center flex flex-col w-full  h-full">
      <div className="-mt-40">
        <SignInCard />
      </div>
    </div>
  );
}
