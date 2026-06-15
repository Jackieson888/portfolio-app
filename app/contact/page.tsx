"use client";

import { Container, Box, Stack, Button, Typography } from "@mui/material";
import ContactCard from "../components/contactCard";

export default function Contact() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          my: 2,
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
          <ContactCard />
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
