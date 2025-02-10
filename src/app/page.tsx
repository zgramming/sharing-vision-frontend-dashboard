import {
  ActionIcon,
  Button,
  Card,
  Group,
  Stack,
  Table,
  TableScrollContainer,
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

export const posts = [
  {
    id: 1,
    title: "How to write a blog post 1",
    content: "This is a blog post content",
    category: "Blog",
    status: "published",
  },
  {
    id: 2,
    title: "How to write a blog post 2",
    content: "This is a blog post content",
    category: "Blog",
    status: "drafted",
  },
  {
    id: 3,
    title: "How to write a blog post 3",
    content: "This is a blog post content",
    category: "Blog",
    status: "trashed",
  },
  {
    id: 4,
    title: "How to write a blog post 4",
    content: "This is a blog post content",
    category: "Blog",
    status: "published",
  },
  {
    id: 5,
    title: "How to write a blog post 5",
    content: "This is a blog post content",
    category: "Blog",
    status: "drafted",
  },
  {
    id: 6,
    title: "How to write a blog post 6",
    content: "This is a blog post content",
    category: "Blog",
    status: "trashed",
  },
  {
    id: 7,
    title: "How to write a blog post 7",
    content: "This is a blog post content",
    category: "Blog",
    status: "published",
  },
  {
    id: 8,
    title: "How to write a blog post 8",
    content: "This is a blog post content",
    category: "Blog",
    status: "drafted",
  },
  {
    id: 9,
    title: "How to write a blog post 9",
    content: "This is a blog post content",
    category: "Blog",
    status: "trashed",
  },
  {
    id: 10,
    title: "How to write a blog post 10",
    content: "This is a blog post content",
    category: "Blog",
    status: "published",
  },
  {
    id: 11,
    title: "How to write a blog post 11",
    content: "This is a blog post content",
    category: "Blog",
    status: "drafted",
  },
  {
    id: 12,
    title: "How to write a blog post 12",
    content: "This is a blog post content",
    category: "Blog",
    status: "trashed",
  },
  {
    id: 13,
    title: "How to write a blog post 13",
    content: "This is a blog post content",
    category: "Blog",
    status: "published",
  },
  {
    id: 14,
    title: "How to write a blog post 14",
    content: "This is a blog post content",
    category: "Blog",
  },
];

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
              <TableScrollContainer minWidth={500}>
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
                    {[...posts]
                      .filter((post) => post.status === "published")
                      .map((post, index) => {
                        return (
                          <TableTr key={post.id}>
                            <TableTh>{index + 1}</TableTh>
                            <TableTh>{post.title}</TableTh>
                            <TableTh>{post.category.toUpperCase()}</TableTh>
                            <TableTh>
                              <Group justify="center">
                                <Link href={`form/${post.id}`}>
                                  <ActionIcon>
                                    <IconEdit size={20} />
                                  </ActionIcon>
                                </Link>
                                <ActionIcon color="red">
                                  <IconTrash size={20} />
                                </ActionIcon>
                              </Group>
                            </TableTh>
                          </TableTr>
                        );
                      })}
                  </TableTbody>
                </Table>
              </TableScrollContainer>
            </TabsPanel>

            <TabsPanel value="drafted" py={"lg"}>
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
                  {[...posts]
                    .filter((post) => post.status === "drafted")
                    .map((post, index) => {
                      return (
                        <TableTr key={post.id}>
                          <TableTh>{index + 1}</TableTh>
                          <TableTh>{post.title}</TableTh>
                          <TableTh>{post.category.toUpperCase()}</TableTh>
                          <TableTh>
                            <Group justify="center">
                              <Link href={`form/${post.id}`}>
                                <ActionIcon>
                                  <IconEdit size={20} />
                                </ActionIcon>
                              </Link>
                              <ActionIcon color="red">
                                <IconTrash size={20} />
                              </ActionIcon>
                            </Group>
                          </TableTh>
                        </TableTr>
                      );
                    })}
                </TableTbody>
              </Table>{" "}
            </TabsPanel>

            <TabsPanel value="trashed" py={"lg"}>
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
                  {[...posts]
                    .filter((post) => post.status === "trashed")
                    .map((post, index) => {
                      return (
                        <TableTr key={post.id}>
                          <TableTh>{index + 1}</TableTh>
                          <TableTh>{post.title}</TableTh>
                          <TableTh>{post.category.toUpperCase()}</TableTh>
                          <TableTh>
                            <Group justify="center">
                              <Link href={`form/${post.id}`}>
                                <ActionIcon>
                                  <IconEdit size={20} />
                                </ActionIcon>
                              </Link>
                              <ActionIcon color="red">
                                <IconTrash size={20} />
                              </ActionIcon>
                            </Group>
                          </TableTh>
                        </TableTr>
                      );
                    })}
                </TableTbody>
              </Table>{" "}
            </TabsPanel>
          </Tabs>
        </Stack>
      </Card>
    </Stack>
  );
}
