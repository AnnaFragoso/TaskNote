
"use client";
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Delete from "@mui/icons-material/Delete";

export type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

type TaskItemProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
};

export function TaskItem({ 
  task, 
  onEdit,
  onDelete }: TaskItemProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "medium"
  }).format(new Date(task.createdAt));

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: "divider",
        borderRadius: 2.5,
        boxShadow: "none",
        transition: "border-color 0.2s ease",
        "&:hover": {
          borderColor: "primary.light",
        },
      }}
    >
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Stack spacing={1}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            {task.title}
          </Typography>

          <Stack 
           direction="row" 
           spacing={0.5}  
           sx={{
            marginLeft: "auto",
            flexShrink: 0,
          }}>
              <Tooltip title="Edit task">
                <span>
                  <IconButton
                    aria-label={`Edit task: ${task.title}`}
                    onClick={() => onEdit(task)}
                    size="small"
                    sx={{
                      color: "text.secondary",
                      "&:hover": {
                        color: "primary.main",
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title="Delete task">
                <span>
                  <IconButton
                    aria-label={`Delete task: ${task.title}`}
                    onClick={() => onDelete(task)}
                    size="small"
                    sx={{
                      color: "text.secondary",
                      "&:hover": {
                        color: "error.main",
                        backgroundColor: "rgba(220, 38, 38, 0.08)",
                      },
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            </Stack>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: "pre-wrap" }}
          >
            {task.description}
          </Typography>

          <Stack direction="row">
            <Typography variant="caption" color="text.secondary">
              Created at {formattedDate}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
