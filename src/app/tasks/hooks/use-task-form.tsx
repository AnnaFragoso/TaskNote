// Logic used by form encapsulated in a hook so 
// it can be used anywhere in the project
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTRPC } from "../../../trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "../components/task-item";

interface UseTaskFormProps {
  task?: Task | null;
  onSuccess?: () => void;
}

export type TaskFormData = {
  id: string;
  title: string;
  description: string;
};

export function useTaskForm({ task, onSuccess }: UseTaskFormProps = {}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId ] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

   useEffect(() => {
    setId(task?.id ?? "");
    setTitle(task?.title ?? "");
    setDescription(task?.description ?? "");
    setError("");
  }, [task]);
  
  const mutation = useMutation(
    trpc.task.create.mutationOptions({
      onSuccess: async () => {
        setTitle("");
        setDescription("");
        setError("");

        await queryClient.invalidateQueries({
          queryKey: trpc.task.getAll.queryKey(),
        });
        onSuccess?.();
        router.refresh();
      },

      onError: () => {
        setError("Couldn't create task.");
      },
    })
  );

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    mutation.mutate({
      title: title.trim(),
      description: description
    });
    
  }

  return {
    id,
    setId,
    title,
    setTitle,
    description,
    setDescription,
    error,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    handleSubmit,
  };
}