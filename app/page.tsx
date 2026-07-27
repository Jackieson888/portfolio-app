"use client";

import { Container, Box, Stack } from "@mui/material";
import SkillsCard from "./components/skillsCard";
import ResumeCard from "./components/resumeCard";
import ProfileCard from "./components/profileCard";
import ProjectsCard from "./components/projectsCard";
import DownloadCard from "./components/downloadCard";
import FeaturesCard from "./components/featuresCard";
import GalleryCard from "./components/galleryCard";

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
          <ProfileCard />
          <SkillsCard />
          <FeaturesCard />
          <DownloadCard />
          <ProjectsCard />
        </Stack>
      </Box>
    </Container>
  );
}
