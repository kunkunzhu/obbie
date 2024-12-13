/** @format */

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { cn } from "~/lib/utils";
import { HobbyI } from "~/types";

interface AddUpdateHobbyDialogI {
  action: (hobby: HobbyI) => void;
  actionText: string;
  curHobbies: HobbyI[];
  setClose: () => void;
  defaultHobby: HobbyI;
  emojiPickerStyle?: string;
  colorPickerStyle?: string;
}

export function AddUpdateHobbyDialog({
  action,
  actionText,
  curHobbies,
  setClose,
  defaultHobby,
  emojiPickerStyle = "",
  colorPickerStyle = "",
}: AddUpdateHobbyDialogI) {
  const [emojiPicker, showEmojiPicker] = useState<Boolean>(false);
  const [colorPicker, showColorPicker] = useState<Boolean>(false);
  const [emoji, setEmoji] = useState<string>(defaultHobby.emoji);
  const [hobbyName, setHobbyName] = useState<string>("");
  const [hobbyColor, setHobbyColor] = useState<string>(defaultHobby.color);
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
        curHobbies[i].name == hobby.name ||
        curHobbies[i].color == hobby.color
      ) {
        return false;
      }
    }
    return true;
  };

  const openEmojiPicker = () => {
    setError(false);
    showEmojiPicker(true);
    showColorPicker(false);
  };

  const openColorPicker = () => {
    setError(false);
    showColorPicker(true);
    showEmojiPicker(false);
  };

  const closeEmojiPicker = () => {
    showEmojiPicker(false);
  };

  const closeColorPicker = () => {
    showColorPicker(false);
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
      color: hobbyColor,
    };

    const isUnique = checkHobbyExists(hobby);
    if (!isUnique) {
      setError(true);
      setErrorMsg(
        "Looks like there already exists a hobby with this name or emoji!"
      );
      return;
    }
    action(hobby);
    setClose();
  };

  return (
    <div className="flex flex-col gap-4 py-4 px-2 min-w-[350px]">
      <div className="flex gap-4 w-full items-center align-middle">
        <Input
          label="Hobby"
          name="hobby"
          variant="bordered"
          value={defaultHobby.name}
          isInvalid={error}
          errorMessage={errorMsg}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setError(false);
            setErrorMsg("");
            setHobbyName(e.currentTarget.value);
          }}
        />
        <div
          className="h-8 w-10 border-1 rounded-full cursor-pointer"
          style={{ backgroundColor: hobbyColor }}
          onClick={openColorPicker}
        />
        <div
          className="text-2xl hover:scale-125 transition-all cursor-pointer"
          onClick={openEmojiPicker}
        >
          {emoji}
        </div>

        {emojiPicker && (
          <div
            className={cn(
              emojiPickerStyle,
              "border-2 pt-8 bg-white border-primary rounded-xl"
            )}
          >
            <IoIosCloseCircleOutline
              className="absolute top-1 right-1 size-6 cursor-pointer"
              onClick={closeEmojiPicker}
            />
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              maxFrequentRows={0}
            />
          </div>
        )}
        {colorPicker && (
          <div
            className={cn(
              colorPickerStyle,
              "border-2 pt-8 bg-white border-primary rounded-xl"
            )}
          >
            <IoIosCloseCircleOutline
              className="absolute top-1 right-1 size-6 cursor-pointer"
              onClick={closeColorPicker}
            />
            <HexColorPicker color={hobbyColor} onChange={setHobbyColor} />
          </div>
        )}
      </div>
      <div className="w-full mx-auto flex justify-between items-center">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button color="primary" onClick={handleAddEmoji}>
          {actionText}
        </Button>
      </div>
    </div>
  );
}
