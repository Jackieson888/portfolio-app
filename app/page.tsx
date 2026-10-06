import { Box } from "@mui/material";
import ProfileCard from "./components/profileCard";
import FeaturesCard from "./components/featuresCard";
import SkillsCard from "./components/skillsCard";
import ProjectsCard from "./components/projectsCard";
import DownloadCard from "./components/downloadCard";
import ContactCard from "./components/contactCard";
import AboutCard from "./components/aboutCard";
import PortfolioChat from "./components/portfolioChat";

export default function Home() {
  return (
    // overflowX "clip" (not "hidden") trims decorative shapes at the screen edge without
    // breaking the sticky project galleries.
    <Box component="main" id="main" sx={{ overflowX: "clip" }}>
      <ProfileCard />
      <ProjectsCard />
      <AboutCard />
      <FeaturesCard />
      <SkillsCard />
      <DownloadCard />
      <ContactCard />
      <PortfolioChat />
    </Box>
  );
}
