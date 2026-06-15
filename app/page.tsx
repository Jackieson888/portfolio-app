"use client";

import { Container, Box, Stack } from "@mui/material";
import SkillsCard from "./components/skillsCard";
import ResumeCard from "./components/resumeCard";
import ContactCard from "./components/contactCard";
import ProjectsCard from "./components/projectsCard";

export default function Home() {
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
          <ResumeCard />
          <SkillsCard />
          <ProjectsCard />
        </Stack>
      </Box>
    </Container>
  );
}
