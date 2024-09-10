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
import { Form, json, NavLink, redirect } from "@remix-run/react";
import { useState } from "react";

import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { validateEmail, validatePassword } from "~/utils/validators.server";
import { getUser, login } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return (await getUser(request)) ? redirect("/") : null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const email = form.get("email");
  const password = form.get("password");

  if (typeof email != "string" || typeof password != "string") {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  return await login({ email, password });
};

function LoginCard() {
  return (
    <Card className="min-w-[400px] -mt-40">
      <CardHeader className="px-4 pt-4">
        <div className="flex gap-2">
          <img src="/icon.png" className="size-8" />
          <h2 className="px-2 text-2xl text-primary font-bold">Log In</h2>
        </div>
      </CardHeader>
      <Divider />
      <Form method="post" id="login-form" action="/login">
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
            <NavLink to="/signup" className="text-blue-500 underline">
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

export default function Login() {
  const [action, setAction] = useState<string>("");

  return (
    <div className="justify-center items-center flex flex-col w-full  h-full">
      {action == "" && (
        <Card className="-mt-40 py-4 min-h-[30vh]">
          <CardHeader className="px-4 pt-4 justify-center">
            <div className="flex gap-2">
              <img src="/icon.png" className="size-8" />
              <h2 className="px-2 text-2xl text-primary font-bold">Hello!</h2>
            </div>
          </CardHeader>

          <CardBody className="flex justify-center px-10">
            To get started, select an option below (˶˃ ᵕ ˂˶)
          </CardBody>
          <CardFooter className="px-4 pb-4 flex gap-10 flex-row justify-center">
            <Button color="primary" onClick={() => setAction("login")}>
              Log In
            </Button>
            <NavLink to="/signup">
              <Button>Sign Up</Button>
            </NavLink>
          </CardFooter>
        </Card>
      )}
      {action == "login" && <LoginCard />}
    </div>
  );
}
