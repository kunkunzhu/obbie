/** @format */

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { MdCancel } from "react-icons/md";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";
import { ActionData, HobbyI } from "~/types";
import {
  ActionFunction,
  ActionFunctionArgs,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import {
  addUserHobbies,
  markUserProfileAsComplete,
} from "~/services/user.server";
import { getUserId } from "~/services/session.server";

function AddHobby({
  addHobby,
  curHobbies,
  setClose,
}: {
  addHobby: (hobby: HobbyI) => void;
  curHobbies: HobbyI[];
  setClose: () => void;
}) {
  const [emojiPicker, showEmojiPicker] = useState<Boolean>(false);
  const [emoji, setEmoji] = useState<string>("🌟");
  const [hobbyName, setHobbyName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleEmojiSelect = (emoji: any) => {
    console.log("Selected emoji:", emoji);
    setEmoji(emoji.native);
    showEmojiPicker(false);
  };

  const checkHobbyExists = (hobby: HobbyI) => {
    for (let i = 0; i < curHobbies.length; i++) {
      if (
        curHobbies[i].emoji == hobby.emoji ||
        curHobbies[i].name == hobby.name
      ) {
        return false;
      }
    }
    return true;
  };

  const openEmojiPicker = () => {
    setError(false);
    showEmojiPicker(true);
  };

  const handleCancel = () => {
    setHobbyName("");
    setEmoji("🌟");
    setError(false);
    setClose();
  };

  const handleAddEmoji = () => {
    if (!hobbyName) {
      setError(true);
      setErrorMsg("Hobby name cannot be empty.");
      return;
    }

    const hobby = {
      emoji: emoji,
      name: hobbyName,
    };

    const isUnique = checkHobbyExists(hobby);
    if (!isUnique) {
      setError(true);
      setErrorMsg(
        "Looks like there already exists a hobby with this name or emoji!"
      );
      return;
    }
    addHobby(hobby);
    setClose();
  };

  return (
    <div className="flex flex-col gap-4 py-4 px-2 min-w-[350px]">
      <div className="flex gap-4 w-full items-center align-middle">
        <Input
          label="Hobby"
          name="hobby"
          variant="bordered"
          isInvalid={error}
          errorMessage={errorMsg}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setError(false);
            setErrorMsg("");
            setHobbyName(e.currentTarget.value);
          }}
        />
        <div
          className="text-2xl hover:scale-125 transition-all cursor-pointer"
          onClick={openEmojiPicker}
        >
          {emoji}
        </div>
        {emojiPicker && (
          <div className="absolute left-[375px]">
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              maxFrequentRows={0}
            />
          </div>
        )}
      </div>
      <div className="w-full mx-auto flex justify-between items-center">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button color="primary" onClick={handleAddEmoji}>
          Add Hobby
        </Button>
      </div>
    </div>
  );
}

function HobbyList({
  hobbies,
  deleteHobby,
}: {
  hobbies: HobbyI[];
  deleteHobby: (hobby: HobbyI) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {hobbies.map((hobby, index) => (
        <Card
          key={index}
          className="flex flex-row p-2 items-center justify-between"
        >
          <div className="flex flex-row gap-2 items-center ">
            <div className="border-1 items-center justify-center flex rounded-full size-8 text-secondary">
              {index + 1}
            </div>
            <div className="flex gap-2 text-lg">
              <div>{hobby.emoji}</div>
              <div>{hobby.name}</div>
            </div>
          </div>
          <MdCancel
            className="text-secondary cursor-pointer"
            onClick={() => deleteHobby(hobby)}
          />
        </Card>
      ))}
    </div>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/sign-in");
  }
  console.log("USER", userId);
  return { userId: userId };
};

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const userId = formData.get("userId") as string;
  const hobbiesString = formData.get("hobbies");

  let hobbies: HobbyI[] = [];
  if (typeof hobbiesString === "string") {
    hobbies = JSON.parse(hobbiesString);
  }

  console.log("Hobbies:", hobbies);
  console.log("User ID:", userId);

  const addHobbiesRes = (await addUserHobbies(hobbies, userId)) as ActionData;
  const markProfileAsCompleteRes = (await markUserProfileAsComplete(
    userId
  )) as ActionData;

  if (addHobbiesRes.error || markProfileAsCompleteRes.error) {
    return json<ActionData>({ error: addHobbiesRes.error });
  }

  return redirect("/home");
};

const sampleHobbyList: HobbyI[] = [
  {
    emoji: "📖",
    name: "reading",
  },
  {
    emoji: "📝",
    name: "writing",
  },
  {
    emoji: "💻",
    name: "smol software",
  },
  {
    emoji: "🎨",
    name: "art",
  },
];

export default function CompleteProfile() {
  const submit = useSubmit();
  const { userId } = useLoaderData<typeof loader>();

  const [hobbyList, updateHobbyList] = useState<HobbyI[]>(sampleHobbyList);
  const [addDialog, setAddDialog] = useState<boolean>(false);

  const hobbyListAdd = (hobby: HobbyI) => {
    updateHobbyList([...hobbyList, hobby]);
  };

  const hobbyListDelete = (hobby: HobbyI) => {
    const newHobbyList = hobbyList.filter((h) => h.name !== hobby.name);
    updateHobbyList(newHobbyList);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("hobbies", JSON.stringify(hobbyList));
    formData.append("userId", userId);

    submit(formData, { method: "post", action: "/complete-profile" });
  };

  return (
    <div className="justify-center items-center flex flex-col w-full  h-full">
      <Card className="min-w-[400px] -mt-80">
        <CardHeader className="px-4 pt-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <img src="/icon.png" className="size-8" />
              <h2 className="px-2 text-2xl text-primary font-bold">Welcome!</h2>
            </div>
            <span className="text-sm">
              To get started, let's add up to 5 hobbies that you would like to
              focus on:
            </span>
            <span className="text-sm text-secondary">
              (Please make sure each hobby has a unique name and emoji!)
            </span>
          </div>
        </CardHeader>
        <Divider />
        <Form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4 px-10">
            <HobbyList hobbies={hobbyList} deleteHobby={hobbyListDelete} />
            <div className="flex justify-between gap-10">
              {hobbyList.length <= 5 && (
                <Popover placement="bottom" showArrow={true} isOpen={addDialog}>
                  <PopoverTrigger>
                    <Button
                      onClick={() => setAddDialog(true)}
                      className="w-full"
                    >
                      Add a Hobby
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <AddHobby
                      addHobby={hobbyListAdd}
                      curHobbies={hobbyList}
                      setClose={() => setAddDialog(false)}
                    />
                  </PopoverContent>
                </Popover>
              )}
              {hobbyList.length > 0 && (
                <Button type="submit" color="primary" className="w-full">
                  Submit
                </Button>
              )}
            </div>
          </CardBody>
        </Form>
      </Card>
    </div>
  );
}
