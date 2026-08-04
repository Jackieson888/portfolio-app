import * as React from "react";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import "./globals.css";
import theme from "@/src/theme";
import { roboto } from "@/src/fonts";
import { Navbar } from "./components/nav";

export const metadata: Metadata = {
  title: "Jackson Schacher — Full-Stack Engineer, Web Developer, UI/UX Designer",
  description:
    "Full-stack developer with 6+ years of experience across front-end, back-end, cloud, and AI-driven application development.",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            {props.children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
