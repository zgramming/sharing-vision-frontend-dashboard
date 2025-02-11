"use client";

import { PostRepository } from "@/features/post/post.repository";
import {
  Stack,
  Card,
  Button,
  Group,
  TextInput,
  Textarea,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconChevronLeft,
  IconNotesOff,
  IconPencilShare,
} from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { back } = useRouter();
  const [isProcessing, setProcessing] = useState(false);
  const param = useParams();
  const isEdit = param.id !== "new";

  const { data, isLoading } = PostRepository.hooks.useDetail(
    param.id as string | undefined
  );

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

  const { initialize } = form;

  const onDraft = async () => {
    try {
      setProcessing(true);
      form.validate();
      const repo = PostRepository.api;

      if (data) {
        await repo.update(data.id, {
          category: form.values.category,
          content: form.values.content,
          status: "draft",
          title: form.values.title,
        });
      } else {
        await repo.create({
          category: form.values.category,
          content: form.values.content,
          status: "draft",
          title: form.values.title,
        });
      }

      back();
    } catch {
      alert("Failed to create draft post");
    } finally {
      setProcessing(false);
    }
  };

  const onPublish = async () => {
    try {
      setProcessing(true);
      form.validate();

      const repo = PostRepository.api;

      if (data) {
        await repo.update(data.id, {
          category: form.values.category,
          content: form.values.content,
          status: "publish",
          title: form.values.title,
        });
      } else {
        await repo.create({
          category: form.values.category,
          content: form.values.content,
          status: "publish",
          title: form.values.title,
        });
      }

      back();
    } catch {
      alert("Failed to create publish post");
    } finally {
      setProcessing(false);
    }
  };

  const onTrash = async () => {
    try {
      setProcessing(true);
      form.validate();

      const repo = PostRepository.api;

      if (data) {
        await repo.update(data.id, {
          category: form.values.category,
          content: form.values.content,
          status: "trash",
          title: form.values.title,
        });
      } else {
        await repo.create({
          category: form.values.category,
          content: form.values.content,
          status: "trash",
          title: form.values.title,
        });
      }

      back();
    } catch {
      alert("Failed to create trash post");
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (data) {
      initialize({
        title: data.title,
        content: data.content,
        category: data.category,
        status: data.status,
      });
    }
    return () => {};
  }, [data, initialize]);

  return (
    <Stack h={"100vh"} w={"100vw"} justify="center" align="center" bg={"gray"}>
      <LoadingOverlay visible={isLoading} />
      <Card
        shadow="xs"
        withBorder
        p={"xl"}
        maw={{
          base: "calc(100vw - 32px)",
          lg: "50%",
        }}
        miw={{
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
              loading={isProcessing}
              type="button"
              leftSection={<IconNotesOff size={20} />}
              variant="light"
              onClick={onDraft}
            >
              Draft
            </Button>
            <Button
              loading={isProcessing}
              type="button"
              leftSection={<IconPencilShare size={20} />}
              onClick={onPublish}
            >
              Publish
            </Button>

            <Button
              display={data === undefined ? "none" : "block"}
              loading={isProcessing}
              type="button"
              leftSection={<IconNotesOff size={20} />}
              color="red"
              onClick={onTrash}
            >
              Trash
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
