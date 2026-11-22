// Displays task data in a infinite scroll pagination
"use client";

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import { Task, TaskItem } from "./task-item";
import { useTRPC } from "../../../trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

interface TaskListProps {
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskList({
  onEdit,
  onDelete,
}: TaskListProps) {
  const trpc = useTRPC();
  const observerTarget = useRef<HTMLDivElement>(null);

  const { 
    data, isLoading, error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
   } = useInfiniteQuery(
    trpc.task.getAll.infiniteQueryOptions(
       { limit: 10 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    )
  );

  const tasks = data?.pages.flatMap((page) => page.items) ?? [];

  useEffect(() => {
    const target = observerTarget.current;

    if (
      !target ||
      !hasNextPage ||
      isFetchingNextPage ||
      isFetchNextPageError
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  ]);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error when loading tasks.</p>;

  if (tasks?.length === 0) {
    return (
      <Box
        sx={{
          py: 7,
          px: 3,
          textAlign: "center",
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: 3,
          backgroundColor: "background.paper",
        }}
      >
        <ChecklistOutlinedIcon
          sx={{
            fontSize: 42,
            color: "primary.light",
            mb: 1.5,
          }}
        />

        <Typography variant="h6" sx={{ mb: 0.5 }}>
          No tasks here
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Add a new task to your note.
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      <Typography variant="body2" color="text.secondary">
        {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
      </Typography>

      <Stack spacing={1.5}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </Stack>
       {hasNextPage && (
      <Box
        ref={observerTarget}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 50,
          py: 2,
        }}
      >
        {isFetchingNextPage && <CircularProgress size={24} />}
      </Box>
    )}

    {isFetchNextPageError && (
      <Button
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
      >
        Try again
      </Button>
    )}
    </Stack>
  );
}
