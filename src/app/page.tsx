"use client";

import PaginationComponent, {
  PaginationSize,
} from "@/components/PaginationComponent";
import { PostRepository } from "@/features/post/post.repository";
import {
  ActionIcon,
  Button,
  Card,
  Group,
  LoadingOverlay,
  Stack,
  Table,
  TableTbody,
  TableTh,
  TableThead,
  TableTr,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@mantine/core";
import {
  IconPencilShare,
  IconNotesOff,
  IconTrash,
  IconEdit,
  IconEye,
  IconPlus,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

type TabsPostProps = {
  status: "publish" | "draft" | "trash";
};
const TabsPost = ({ status }: TabsPostProps) => {
  const [isProcessing, setProcessing] = useState(false);
  const [activePagination, setPagination] = useState(1);
  const [paginationSize, setPaginationSize] = useState<PaginationSize>("50");

  const {
    data: datas,
    totalData,
    isLoading,
    refetch,
  } = PostRepository.hooks.useList({
    limit: parseInt(paginationSize),
    offset: (activePagination - 1) * parseInt(paginationSize),
    status: status,
  });

  const onDeleted = async (id: string) => {
    try {
      setProcessing(true);
      const repo = PostRepository.api;

      await repo.delete(+id);
      alert("Post deleted successfully");

      refetch();
    } catch {
      alert("Failed to delete post");
    } finally {
      setProcessing(false);
    }
  };
  return (
    <Stack>
      <LoadingOverlay visible={isLoading} />
      <Table striped highlightOnHover verticalSpacing={"md"}>
        <TableThead>
          <TableTr>
            <TableTh>No</TableTh>
            <TableTh>Title</TableTh>
            <TableTh>Category</TableTh>
            <TableTh>Action</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {[...datas].map((post, index) => {
            return (
              <TableTr key={post.id}>
                <TableTh>{index + 1}</TableTh>
                <TableTh>{post.title}</TableTh>
                <TableTh>{post.category.toUpperCase()}</TableTh>
                <TableTh>
                  <Group justify="center">
                    <Link href={`form/${post.id}`}>
                      <ActionIcon loading={isProcessing}>
                        <IconEdit size={20} />
                      </ActionIcon>
                    </Link>
                    <ActionIcon
                      color="red"
                      loading={isProcessing}
                      onClick={() => onDeleted(`${post.id}`)}
                    >
                      <IconTrash size={20} />
                    </ActionIcon>
                  </Group>
                </TableTh>
              </TableTr>
            );
          })}
        </TableTbody>
      </Table>
      <PaginationComponent
        activePagination={activePagination}
        paginationSize={paginationSize}
        total={totalData}
        onChangePagination={(page) => setPagination(page)}
        onChangePaginationSize={(size) => setPaginationSize(size)}
      />
    </Stack>
  );
};

export default function Home() {
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
        miw={{
          base: "calc(100vw - 32px)",
          lg: "50%",
        }}
      >
        <Stack gap={"sm"}>
          <Group justify="end">
            <Link href="preview">
              <Button
                variant="light"
                color="blue"
                leftSection={<IconEye size={20} />}
                type="button"
              >
                Preview Site
              </Button>
            </Link>

            <Link href="form/new">
              <Button
                variant="filled"
                color="blue"
                leftSection={<IconPlus size={20} />}
                type="button"
              >
                New Post
              </Button>
            </Link>
          </Group>
          <Tabs variant="outline" defaultValue="published">
            <TabsList>
              <TabsTab
                value="published"
                leftSection={<IconPencilShare size={12} />}
              >
                Published
              </TabsTab>
              <TabsTab value="drafted" leftSection={<IconNotesOff size={12} />}>
                Drafts
              </TabsTab>
              <TabsTab value="trashed" leftSection={<IconTrash size={12} />}>
                Trashed
              </TabsTab>
            </TabsList>

            <TabsPanel value="published" py={"lg"}>
              <TabsPost status="publish" />
            </TabsPanel>

            <TabsPanel value="drafted" py={"lg"}>
              <TabsPost status="draft" />
            </TabsPanel>

            <TabsPanel value="trashed" py={"lg"}>
              <TabsPost status="trash" />
            </TabsPanel>
          </Tabs>
        </Stack>
      </Card>
    </Stack>
  );
}
