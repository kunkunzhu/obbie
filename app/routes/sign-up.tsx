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
import { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useForm, validationError } from "@rvf/remix";

import { withZod } from "@rvf/zod";
import { z } from "zod";
import { signup } from "~/services/auth.server";
import { UserRegistration } from "~/services/type.server";

const validator = withZod(
  z
    .object({
      username: z.string().min(1, "username cannot be empty."),
      email: z.string().email().min(1),
      password: z
        .string()
        .min(8, "Please ensure password contains at least 8 characters."),
      passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords do not match.",
      path: ["confirm"],
    })
);

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await validator.validate(await request.formData());
  if (formData.error) return validationError(formData.error);
  const user = {
    email: formData.data.email as string,
    username: formData.data.username as string,
    password: formData.data.password as string,
  } as UserRegistration;

  console.log("User:", user);
  return await signup(user); // TODO : catch error for when user already exists
};

function SignupCard() {
  const form = useForm({
    validator,
  });
  return (
    <Card className="min-w-[400px]">
      <CardHeader>
        <h2 className="px-2 text-2xl text-primary font-bold">Sign Up</h2>
      </CardHeader>
      <Divider />
      <Form method="post" action="/sign-up">
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
            label="username"
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
  );
}

export default function SignUp() {
  return (
    <div className="justify-center items-center flex flex-col w-fsull h-full">
      <div className="-mt-40">
        <SignupCard />
      </div>
    </div>
  );
}
