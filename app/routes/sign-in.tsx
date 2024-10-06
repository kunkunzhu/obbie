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
import { withZod } from "@rvf/zod";
import { z } from "zod";
import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { Form, json, NavLink, redirect, useActionData } from "@remix-run/react";
import { getUser } from "~/services/session.server";
import { signin } from "~/services/auth.server";
import { UserLogin } from "~/services/type.server";
import { useForm, validationError } from "@rvf/remix";
import { ActionData } from "~/types";

const validator = withZod(
  z.object({
    email: z.string().email().min(1),
    password: z.string().min(1, "Please enter a password"),
  })
);

export const loader: LoaderFunction = async ({ request }) => {
  return (await getUser(request)) ? redirect("/home") : null;
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await validator.validate(await request.formData());
  if (formData.error) return validationError(formData.error);

  const user = {
    email: formData.data.email as string,
    password: formData.data.password as string,
  } as UserLogin;

  console.log("User:", user);
  const result = (await signin(user)) as ActionData;

  if (result.error) {
    return json<ActionData>({ error: result.error });
  }

  return result;
}

function SignInCard() {
  const actionData = useActionData<ActionData>();
  const form = useForm({
    validator,
  });

  return (
    <Card className="min-w-[400px] -mt-40">
      <CardHeader className="px-4 pt-4">
        <div className="flex gap-2">
          <img src="/icon.png" className="size-8" />
          <h2 className="px-2 text-2xl text-primary font-bold">Log In</h2>
        </div>
      </CardHeader>
      <Divider />
      <Form method="post" action="/sign-in">
        <CardBody className="flex flex-col gap-4 px-10">
          <Input
            label="Email"
            name="email"
            variant="underlined"
            isInvalid={Boolean(form.error("email"))}
            errorMessage={form.error("email")}
            isRequired
          />
          <Input
            label="Password"
            name="password"
            variant="underlined"
            isInvalid={Boolean(form.error("password"))}
            errorMessage={form.error("password")}
            isRequired
          />
          <span className="text-xs opacity-75">
            Don't have an account yet?{" "}
            <NavLink to="/sign-up" className="text-blue-500 underline">
              Sign up
            </NavLink>{" "}
            instead.
          </span>
          {actionData?.error && (
            <span className="text-xs text-warning">{actionData.error}</span>
          )}
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
