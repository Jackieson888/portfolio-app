import { Box } from "@mui/material";
import ProfileCard from "./components/profileCard";
import FeaturesCard from "./components/featuresCard";
import SkillsCard from "./components/skillsCard";
import ProjectsCard from "./components/projectsCard";
import DownloadCard from "./components/downloadCard";
import ContactCard from "./components/contactCard";

export default function Home() {
  return (
    <Box component="main" id="main">
      <ProfileCard />
      <FeaturesCard />
      <SkillsCard />
      <ProjectsCard />
      <DownloadCard />
      <ContactCard />
    </Box>
  );
}
