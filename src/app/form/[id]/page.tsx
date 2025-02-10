"use client";

import { Stack, Card, Button, Group, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconChevronLeft,
  IconNotesOff,
  IconPencilShare,
} from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const { back } = useRouter();
  const param = useParams();
  const isEdit = param.id !== "new";
  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      category: "",
      status: "",
    },
    validate: {
      title: (val) => {
        if (!val) {
          return "Title is required";
        }
        return null;
      },
      content: (val) => {
        if (!val) {
          return "Content is required";
        }
        return null;
      },
      category: (val) => {
        if (!val) {
          return "Category is required";
        }
        return null;
      },

      status: (val) => {
        if (!val) {
          return "Status is required";
        }

        if (val !== "published" && val !== "drafted" && val !== "trashed") {
          return "Status must be one of published, drafted, or trashed";
        }

        return null;
      },
    },
  });

  const onDraft = () => {
    // Running validation
    form.validate();

  };

  const onPublish = () => {
    // Running validation
    form.validate();
  };

  return (
    <Stack h={"100vh"} w={"100vw"} justify="center" align="center" bg={"gray"}>
      <Card
        shadow="xs"
        withBorder
        p={"xl"}
        maw={{
          base: "calc(100vw - 32px)",
          lg: "50%",
        }}
      >
        <Stack gap={"lg"}>
          <Group justify="right">
            <Button
              onClick={back}
              variant="default"
              leftSection={<IconChevronLeft size={20} />}
            >
              Kembali
            </Button>
            <Button
              type="button"
              leftSection={<IconNotesOff size={20} />}
              variant="light"
              onClick={() => {
                onDraft();
              }}
            >
              Draft
            </Button>
            <Button
              type="button"
              leftSection={<IconPencilShare size={20} />}
              onClick={() => {
                onPublish();
              }}
            >
              Publish
            </Button>
          </Group>
          <Card withBorder>
            <Card.Section withBorder inheritPadding py={"sm"} mb={"sm"}>
              Form {isEdit ? "Edit" : "Create"} Post
            </Card.Section>
            <Stack gap={"md"}>
              <TextInput
                label="Title"
                placeholder="Title"
                {...form.getInputProps("title")}
              />

              <Textarea
                label="Content"
                placeholder="Content"
                {...form.getInputProps("content")}
              />

              <TextInput
                label="Category"
                placeholder="Category"
                {...form.getInputProps("category")}
              />
            </Stack>
          </Card>
        </Stack>
      </Card>
    </Stack>
  );
}
