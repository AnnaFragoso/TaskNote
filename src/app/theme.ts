import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#D9468F",
      light: "#F9A8D4",
      dark: "#BE185D",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#64748B",
    },

    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#1E293B",
      secondary: "#64748B",
    },

    divider: "#E2E8F0",

    error: {
      main: "#DC2626",
    },

    success: {
      main: "#16A34A",
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',

    h4: {
      fontWeight: 700,
      fontSize: "1.75rem",
    },

    h6: {
      fontWeight: 600,
    },

    body1: {
      fontSize: "0.95rem",
    },

    body2: {
      fontSize: "0.875rem",
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "9px 18px",
          boxShadow: "none",
        },
        contained: {
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "small",
        fullWidth: true,
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #E2E8F0",
          boxShadow: "0px 2px 8px rgba(72, 76, 87, 0.04)",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          color: "#64748B",
          backgroundColor: "#F8FAFC",
        },
        root: {
          borderColor: "#E2E8F0",
        },
      },
    },
  },
});

export default theme;