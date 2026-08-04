"use client";
import { createTheme } from "@mui/material/styles";
import { gemunu, roboto } from "./fonts";
import { blue, bodyMuted, ink, orange, paper, yellow } from "./tokens";

const theme = createTheme({
  colorSchemes: { light: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: { fontFamily: gemunu.style.fontFamily, fontWeight: 700 },
    h2: { fontFamily: gemunu.style.fontFamily, fontWeight: 700 },
    h3: { fontFamily: gemunu.style.fontFamily, fontWeight: 700 },
    h4: { fontFamily: gemunu.style.fontFamily, fontWeight: 700 },
    h5: { fontFamily: gemunu.style.fontFamily, fontWeight: 600 },
    h6: { fontFamily: gemunu.style.fontFamily, fontWeight: 600 },
  },
  palette: {
    primary: { main: orange },
    secondary: { main: blue },
    warning: { main: yellow },
    background: {
      default: paper,
      paper: "#FFFFFF",
    },
    text: {
      primary: ink,
      secondary: bodyMuted,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: `3px solid ${ink}`,
          borderRadius: "12px",
          boxShadow: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          border: `2px solid ${ink}`,
          backgroundColor: paper,
          height: "auto",
        },
        label: {
          color: ink,
          fontWeight: 600,
          fontSize: "12px",
          padding: "3px 10px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
        },
        outlined: {
          border: "3px solid",
        },
      },
    },
  },
});

export default theme;
