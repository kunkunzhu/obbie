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
import { getUser, login } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return (await getUser(request)) ? redirect("/") : null;
};

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
  return (
    <div className="justify-center items-center flex flex-col w-full  h-full">
      <div className="-mt-40">
        <SignInCard />
      </div>
    </div>
  );
}
