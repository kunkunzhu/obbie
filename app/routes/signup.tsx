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
import { Form, json, useActionData, useSubmit } from "@remix-run/react";
import { act, useEffect, useRef, useState } from "react";
import { signup } from "~/utils/auth.server";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirmation,
} from "~/utils/validators.server";

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  console.log("FORM", formData);
  const formEntry = Object.fromEntries(formData);
  const { email, password, username, passwordCopy } = formEntry;

  if (
    typeof email != "string" ||
    typeof password != "string" ||
    typeof username != "string" ||
    typeof passwordCopy != "string"
  ) {
    return json({ error: `Invalid Form Data` });
  }

  console.log("PASS");
  const errors = {
    email: validateEmail(email),
    username: validateName(username),
    password: validatePassword(password),
    passwordCopy: validatePasswordConfirmation(password, passwordCopy),
  };

  console.log("ERRORS", errors);
  if (Object.values(errors).some(Boolean)) {
    return json({
      errors,
    });
  }
  return await signup({ email, password, username });
};

export default function Signup() {
  const actionData = useActionData<typeof action>();
  console.log("ACTION", actionData);
  const submit = useSubmit();
  const firstLoad = useRef(true);

  const [errors, setErrors] = useState(actionData?.errors || {});
  const [formError, setFormError] = useState(actionData?.error || {});
  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || "",
    username: actionData?.fields?.username || "",
    password: actionData?.fields?.password || "",
    passwordCopy: actionData?.fields?.passwordCopy || "",
  });

  return (
    <div className="justify-center items-center flex flex-col w-fsull h-full">
      <Card className="min-w-[400px] -mt-40">
        <CardHeader>
          <h2 className="px-2 text-2xl text-primary font-bold">Sign Up</h2>
        </CardHeader>
        <Divider />
        <Form method="post">
          <CardBody className="flex flex-col gap-4 px-10">
            <Input
              label="Email"
              name="email"
              variant="underlined"
              isRequired
              isInvalid={errors?.email != undefined}
              errorMessage={errors?.email}
            />
            <Input
              label="Username"
              name="username"
              variant="underlined"
              isInvalid={errors?.username != undefined}
              errorMessage={errors?.username}
              isRequired
            />
            <Input
              label="Password"
              name="password"
              variant="underlined"
              isInvalid={errors?.password != undefined}
              errorMessage={errors?.password}
              isRequired
            />
            <Input
              label="Confirm Password"
              name="passwordCopy"
              variant="underlined"
              isInvalid={errors?.passwordCopy != undefined}
              errorMessage={errors?.passwordCopy}
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
