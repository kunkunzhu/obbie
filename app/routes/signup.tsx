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
import { ActionFunction, type ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useForm } from "@rvf/remix";

import { withZod } from "@rvf/zod";
import { z } from "zod";

const validator = withZod(
  z
    .object({
      username: z.string().min(1, "Username cannot be empty."),
      email: z.string().email().min(1, "Please enter a valid email address."),
      password: z
        .string()
        .min(8, "Please ensure password contains at least 8 characters."),
      passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords do not match",
      path: ["confirm"],
    })
);

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  console.log("FORM", formData);
  const formEntry = Object.fromEntries(formData);
  const { email, password, username, passwordCopy } = formEntry;
};

export default function Signup() {
  const actionData = useActionData<typeof action>();
  const form = useForm({
    validator,
  });

  return (
    <div className="justify-center items-center flex flex-col w-fsull h-full">
      <Card className="min-w-[400px] -mt-40">
        <CardHeader>
          <h2 className="px-2 text-2xl text-primary font-bold">Sign Up</h2>
        </CardHeader>
        <Divider />
        <Form method="post" {...form.getFormProps()}>
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
              label="Username"
              name="username"
              variant="underlined"
              isInvalid={Boolean(form.error("username"))}
              errorMessage={form.error("username")}
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
            <Input
              label="Confirm Password"
              name="passwordConfirm"
              variant="underlined"
              isInvalid={Boolean(form.error("confirm"))}
              errorMessage={form.error("confirm")}
              isRequired
            />
          </CardBody>
          <CardFooter className="px-4 pb-4 justify-end">
            <Button type="submit" color="primary">
              Sign Up
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
