/** @format */

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { NavLink } from "@remix-run/react";

function GetStartedCard() {
  return (
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
        <NavLink to="/sign-in">
          <Button color="primary">Sign In</Button>
        </NavLink>
        <NavLink to="/sign-up">
          <Button>Sign Up</Button>
        </NavLink>
      </CardFooter>
    </Card>
  );
}

export default function AppPage() {
  return (
    <div className="justify-center items-center flex flex-col w-full  h-full">
      <GetStartedCard />
    </div>
  );
}
