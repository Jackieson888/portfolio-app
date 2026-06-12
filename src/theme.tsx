"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto_Condensed } from "next/font/google";

const roboto = Roboto_Condensed({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  typography: {
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
  },
});

export default theme;
