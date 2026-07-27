"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto_Condensed } from "next/font/google";
import { Gemunu_Libre } from "next/font/google";

const roboto = Roboto_Condensed({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const gemunu = Gemunu_Libre({
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "auto",
});

const theme = createTheme({
  colorSchemes: { light: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  typography: {
    h3: {
      fontFamily: gemunu.style.fontFamily,
      fontWeight: 700,
    },
    h4: {
      fontFamily: gemunu.style.fontFamily,
      fontWeight: 700,
    },
    h5: {
      fontFamily: gemunu.style.fontFamily,
      fontWeight: 600,
    },
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#EA6137",
    },
    secondary: {
      main: "#5796C1",
    },
    warning: {
      main: "#FFA837",
    },
    background: {
      default: "#1E1E1E",
      paper: "#E8E3D0",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: "3px solid black",
          borderRadius: "12px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
        label: {
          color: "black",
          fontWeight: 500,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderRadius: "8px",
          border: "3px solid",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: "4px",
          "--mui-spacing": "4px",
        },
      },
    },
  },
});

export default theme;
