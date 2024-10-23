/** @format */

import { now } from "@internationalized/date";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { Form } from "@remix-run/react";
import { FaStar } from "react-icons/fa";
import { HobbyI } from "~/types";

interface CreateModalProps {
  isOpen: boolean;
  onOpenChange: any;
  hobbies: HobbyI[];
}

function CreateModalFormContent({ hobbies }: { hobbies: HobbyI[] }) {
  return (
    <ModalBody className="flex flex-col gap-4">
      {/* TO DO: debug why the option below is not showing */}
      <Select
        variant="underlined"
        label="Hobby"
        placeholder="Which hobby did you engage in?"
        name="hobby"
        isRequired
      >
        {hobbies.map((hobby) => (
          <SelectItem key={hobby.name}>
            <div className="flex gap-2 text-lg items-center">
              <div
                className="rounded-full size-8 flex justify-center items-center"
                style={{ backgroundColor: hobby.color }}
              >
                {hobby.emoji}
              </div>
              <div className="truncate max-w-[250px]">{hobby.name}</div>
            </div>
          </SelectItem>
        ))}
      </Select>
      <Textarea
        label="Description"
        name="description"
        placeholder="What did you do?"
        variant="underlined"
      />
      <Input
        label="Projects"
        name="projects"
        placeholder="What did you do?"
        variant="underlined"
      />
      <DatePicker
        label="Date"
        name="date"
        variant="underlined"
        granularity="day"
        placeholderValue={now("America/New_York")}
        defaultValue={now("America/New_York")}
        isRequired
      />
      <Checkbox name="starred" value="starred" radius="full" icon={<FaStar />}>
        Is this a milestone?
      </Checkbox>
    </ModalBody>
  );
}

export function CreateModal({
  isOpen,
  onOpenChange,
  hobbies,
}: CreateModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="border-2 border-grey bg-background"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl lowercase">
              add an entry:
            </ModalHeader>
            <Form id="add-entry-form" method="post">
              <CreateModalFormContent hobbies={hobbies} />
              <ModalFooter className="flex justify-end">
                <Button type="submit" onPress={onClose} color="primary">
                  Submit
                </Button>
              </ModalFooter>
            </Form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
