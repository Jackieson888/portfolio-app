"use client";

import { Container, Box, Stack, Button, Typography } from "@mui/material";
import GalleryCard from "../components/galleryCard";

export default function Contact() {
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
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="column"
          useFlexGap
          sx={{ flexWrap: "wrap" }}
        >
          <GalleryCard />
          <Button
            href={"./"}
            variant="contained"
            sx={{ width: "100%" }}
            color="primary"
          >
            <Typography variant="button" sx={{ color: "black" }}>
              Go Back
            </Typography>
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
