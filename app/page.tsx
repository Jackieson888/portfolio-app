"use client";

import { Container, Box, Typography, Button } from "@mui/material";
import LoadingIndicator from "./components/loading";

const navItems = {
  "/gallery": {
    name: "gallery",
    color: "primary",
  },
  "/contact": {
    name: "contact me",
    color: "secondary",
  },
};

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Jackson Schacher
        </Typography>
        {Object.entries(navItems).map(([path, { name, color }]) => {
          return (
            <Button key={path} href={path} variant="contained" color={color}>
              {name} <LoadingIndicator />
            </Button>
          );
        })}
      </Box>
    </Container>
  );
}
