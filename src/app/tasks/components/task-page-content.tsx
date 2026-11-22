// Created to manage with interation like dialog, selected task, 
// form submissions and user feedback. 
// Responsable to separate interaction from components
"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";

import { TaskForm } from "./task-form";
import { TaskList } from "./task-list";
import { useTaskDialog } from "../hooks/use-task-dialog";
import { useTaskActions } from "../hooks/use-task-actions";
import { TaskFormData } from "../hooks/use-task-form";
import { Task } from "./task-item";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseIcon from "@mui/icons-material/Close";

export function TaskPageContent() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const { isOpen, openDialog, closeDialog } = useTaskDialog();
  const {
    createTask,
    updateTask,
    deleteTask,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    successMessage,
    clearFeedback
  } = useTaskActions();

  function handleEdit(task: Task) {
    setSelectedTask(task);
    openDialog();
  }

  function handleDelete(taskId: string) {
    setTaskToDelete(taskId);
  }

  function handleCreate() {
    setSelectedTask(null);
    openDialog();
  }

  async function handleSubmit(data: TaskFormData) {
    try {
      if (data.id) {
        await updateTask(data);
      } else {
        await createTask({
          title: data.title,
          description: data.description,
        });
      }
      closeDialog();
    } catch {
      // Keep the window open for user to retry
      // Error already being handled by mutation
    }
  }

  const handleCloseDialog = () => {
    closeDialog();
    setSelectedTask(null);
    clearFeedback();
  };

  return (
    <>
      <Box sx={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      gap: 3,
    }}>
       <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 3,
        }}
      >
      <Typography variant="h2" sx={{ mb: 2.0 }}>Task Note</Typography>
         <Button
          variant="contained"
          color="primary"
          startIcon={<AddOutlinedIcon />}
          onClick={handleCreate}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
            New task
        </Button>
      </Box>
      <Box sx={{ width: "100%" }}>
        <TaskList
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Dialog
          open={isOpen}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {selectedTask ? "Edit task" : "New task"}
          </DialogTitle>
          <IconButton
            aria-label="Fechar"
            onClick={closeDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <TaskForm
              key={selectedTask?.id ?? "new-task"}
              task={selectedTask}
              onSubmit={handleSubmit}
              isLoading={isCreating || isUpdating}
            />
          </DialogContent>
        </Dialog>


        <Dialog
          open={Boolean(taskToDelete)}
          onClose={() => setTaskToDelete(null)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>
            Confirm
          </DialogTitle>

          <DialogContent>
            <Typography>
              Are you sure you want to delete this task? This action cannot be undone.
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => setTaskToDelete(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>

            <Button
              color="error"
              variant="contained"
              disabled={isDeleting}
              onClick={async () => {
                if (!taskToDelete) return;

                try {
                  await deleteTask({ id: taskToDelete.id });
                  setTaskToDelete(null);
                } catch {}
              }}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={Boolean(successMessage || error)}
          onClose={clearFeedback}
          autoHideDuration={4000}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}>
          <Alert
            onClose={clearFeedback}

            severity={error ? "error" : "success"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {error || successMessage}
          </Alert>
        </Snackbar>
        </Box>
      </Box>
    </>
  );
}
