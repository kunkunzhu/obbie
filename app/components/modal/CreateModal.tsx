/** @format */

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
import { hobbiesData } from "~/lib/example-data";
import { now } from "@internationalized/date";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: any;
}

function CreateModalFormContent() {
  return (
    <ModalBody className="flex flex-col gap-4">
      <Select
        variant="underlined"
        label="Hobby"
        placeholder="Which hobby did you engage in?"
        name="hobby"
        isRequired
      >
        {hobbiesData.map((hobby) => (
          <SelectItem key={hobby.name}>
            {hobby.emoji}&thinsp;{hobby.name}
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
      <Checkbox name="star" radius="full">
        Is this a milestone?
      </Checkbox>
    </ModalBody>
  );
}

export function CreateModal({ isOpen, onOpenChange }: ModalProps) {
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
              <CreateModalFormContent />
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
