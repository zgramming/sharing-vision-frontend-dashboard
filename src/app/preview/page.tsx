"use client";

import {
  Stack,
  Card,
  Grid,
  GridCol,
  Title,
  Group,
  Button,
} from "@mantine/core";
import { posts } from "../page";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import PaginationComponent, {
  PaginationSize,
} from "@/components/PaginationComponent";
import { useState } from "react";

export default function Page() {
  const [activePagination, setPagination] = useState(1);
  const [paginationSize, setPaginationSize] = useState<PaginationSize>("50");

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
        <Stack gap={"md"}>
          <Group justify="space-between" align="center">
            <h1 className="font-bold text-3xl">Published Posts</h1>
            <Group gap={"sm"}>
              <Link href={"/"}>
                <Button
                  variant="default"
                  leftSection={<IconChevronLeft size={20} />}
                >
                  Kembali
                </Button>
              </Link>
            </Group>
          </Group>
          <Grid gutter={12}>
            {posts
              .filter((post) => post.status === "published")
              .map((post) => {
                return (
                  <GridCol
                    key={post.id}
                    span={{
                      base: 12,
                      lg: 6,
                    }}
                  >
                    <Card key={post.id} shadow="xs" p="xl" withBorder>
                      <Stack gap={"lg"}>
                        <Title size="h3" fw={"bold"}>
                          {post.title}
                        </Title>
                        <p>{post.content}</p>
                      </Stack>
                    </Card>
                  </GridCol>
                );
              })}
          </Grid>
          <PaginationComponent
            activePagination={activePagination}
            onChangePagination={setPagination}
            paginationSize={paginationSize}
            onChangePaginationSize={setPaginationSize}
            total={posts.filter((post) => post.status === "published").length}
          />
        </Stack>
      </Card>
    </Stack>
  );
}
