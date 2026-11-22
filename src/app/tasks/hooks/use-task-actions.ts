// Centralizes task mutations and their feedback handling
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "../../../trpc/client";

export function useTaskActions() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function refreshTasks() {
    // Function created to invalidate cache 
    // and refresh list with the new updates made by user
    await queryClient.invalidateQueries({
      queryKey: trpc.task.getAll.infiniteQueryKey(),
    });

    router.refresh();
  }

  function handleSuccess(message: string) {
    setError(null);
    setSuccessMessage(message);
  }

  function handleError() {
    setSuccessMessage(null);
    setError("Something went wrong. Please try again.");
  }

  const createMutation = useMutation(
    trpc.task.create.mutationOptions({
      onSuccess: async () => {
        await refreshTasks();
        handleSuccess("Task created successfully!");
      },
      onError: handleError,
    })
  );

  const updateMutation = useMutation(
    trpc.task.update.mutationOptions({
      onSuccess: async () => {
        await refreshTasks();
        handleSuccess("Task updated successfully!");
      },
      onError: handleError,
    })
  );

  const deleteMutation = useMutation(
    trpc.task.delete.mutationOptions({
      onSuccess: async () => {
        await refreshTasks();
        handleSuccess("Task deleted successfully!");
      },
      onError: handleError,
    })
  );

  return {
    createTask: createMutation.mutateAsync,
    updateTask: updateMutation.mutateAsync,
    deleteTask: deleteMutation.mutateAsync,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,

    error,
    successMessage,

    clearFeedback: () => {
      setError(null);
      setSuccessMessage(null);
    },
  };
}
