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

const description =
  "Full-stack software engineer with 6+ years building, deploying, and scaling production web applications. React/Next.js, distributed API design, and AWS cloud architecture.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jackson-schacher.com"),
  title: "Jackson Schacher — Full-Stack Software Engineer",
  description,
  keywords: [
    "Full-Stack Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "AWS",
    "GraphQL",
    "PostgreSQL",
    "UI/UX Design",
  ],
  authors: [{ name: "Jackson Schacher" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: "Jackson Schacher — Full-Stack Software Engineer",
    description,
    url: "/",
    siteName: "Jackson Schacher",
    images: [{ url: "/profile-pic.png", width: 500, height: 500, alt: "Jackson Schacher" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jackson Schacher — Full-Stack Software Engineer",
    description,
    images: ["/profile-pic.png"],
  },
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <a href="#main" className="skip-link">
              Skip to content
            </a>
            <Navbar />
            {props.children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
