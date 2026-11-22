// Handles task form fields and user input
import { TextField, Button, Stack, Alert, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { TaskFormData } from "../hooks/use-task-form";



type TaskFormProps = {
  task?: TaskFormData;
  onSubmit?: (data: TaskFormData) => void;
  isLoading?: boolean;
  error?: string | null;
  successMessage?: string | null;
};

export function TaskForm({ 
    task, 
    onSubmit,
    isLoading = false,
    error: mutationError,
    successMessage
  }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      id: task?.id ?? "",
      title: task?.title ?? "",
      description: task?.description ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          type="hidden"
          {...register("id")}
          sx={{ display: "none" }}
          slotProps={{
            htmlInput: { readOnly: true },
          }}
        />

        <TextField
          label="Title"
            {...register("title", {
              required: "Tile is required.",
              validate: (value) =>
                value.trim().length > 0 || "Space can't contain just spaces.",
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
        />

        <TextField
          label="Description"
          multiline
          rows={4}
          {...register("description")}
        />

       <Button
          disabled={isLoading}
          type="submit"
          variant="contained"
        >
          {isLoading ? "Saving..." : task ? "Update" : "Create"}
        </Button>

        {successMessage && (
          <Alert severity="success">
            {successMessage}
          </Alert>
        )}

        {mutationError && (
          <Alert severity="error">
            {mutationError}
          </Alert>
        )}
      </Stack>
    </form>
  );
}