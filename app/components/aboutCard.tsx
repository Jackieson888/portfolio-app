import { Box, Typography } from "@mui/material";
import aboutDataJson from "../data/aboutData.json";
import SectionHeader from "./sectionHeader";
import SectionShapes, { type Shape } from "./sectionShapes";
import {
  accentAt,
  bodyMuted,
  bodyStrong,
  border,
  borderThin,
  card,
  display,
  gutter,
  ink,
  maxWidth,
  mono,
  orange,
  shadow,
  yellow,
} from "@/src/tokens";

type AboutData = {
  lead: string;
  intro: string;
  chapters: { when: string; title: string; body: string }[];
  outro: string;
};

const about = aboutDataJson as AboutData;

const shapes: Shape[] = [
  {
    kind: "triangle",
    size: 130,
    color: yellow,
    opacity: 0.18,
    drift: "driftC",
    duration: 32,
    top: "12%",
    right: "3%",
  },
  {
    kind: "ring",
    size: 150,
    color: orange,
    opacity: 0.16,
    drift: "driftA",
    duration: 29,
    delay: -8,
    bottom: "6%",
    left: "-40px",
  },
];

export default function AboutCard() {
  return (
    <Box component="section" id="about" sx={{ position: "relative", px: gutter, pt: "40px", pb: "96px" }}>
      <SectionShapes shapes={shapes} />

      <Box sx={{ position: "relative", zIndex: 1, maxWidth, mx: "auto" }}>
        <SectionHeader number="02" title="About" />

        <Box
          sx={{
            display: "grid",
            gap: { xs: "28px", md: "48px" },
            gridTemplateColumns: "minmax(0, 1fr)",
            "@media (min-width: 1000px)": { gridTemplateColumns: "minmax(0, 5fr) minmax(0, 7fr)" },
            alignItems: "start",
          }}
        >
          <Box className="reveal" sx={{ "@media (min-width: 1000px)": { position: "sticky", top: "110px" } }}>
            <Typography
              sx={{
                fontFamily: display,
                fontWeight: 700,
                fontSize: "clamp(30px, 3.6vw, 44px)",
                lineHeight: 1.05,
                color: ink,
                m: 0,
                mb: "18px",
              }}
            >
              {about.lead}
            </Typography>
            <Typography sx={{ fontSize: 17, lineHeight: 1.6, color: bodyStrong, m: 0, mb: "22px" }}>
              {about.intro}
            </Typography>
            <Typography
              sx={{
                fontSize: 15,
                lineHeight: 1.55,
                color: bodyMuted,
                borderLeft: `4px solid ${yellow}`,
                pl: "14px",
                m: 0,
              }}
            >
              {about.outro}
            </Typography>
          </Box>

          <Box component="ol" sx={{ listStyle: "none", p: 0, m: 0, display: "flex", flexDirection: "column", gap: "18px" }}>
            {about.chapters.map((chapter, i) => (
              <Box
                component="li"
                key={chapter.title}
                className="reveal"
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "130px 1fr" },
                  backgroundColor: card,
                  border,
                  borderRadius: "4px",
                  boxShadow: shadow(6),
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: accentAt(i),
                    borderRight: { xs: "none", sm: borderThin },
                    borderBottom: { xs: borderThin, sm: "none" },
                    px: "16px",
                    py: { xs: "10px", sm: "18px" },
                    display: "flex",
                    flexDirection: { xs: "row", sm: "column" },
                    gap: { xs: "10px", sm: "6px" },
                    alignItems: { xs: "baseline", sm: "flex-start" },
                  }}
                >
                  <Box sx={{ fontFamily: mono, fontWeight: 700, fontSize: 13, color: ink }}>
                    {String(i + 1).padStart(2, "0")}
                  </Box>
                  <Box sx={{ fontFamily: mono, fontWeight: 700, fontSize: 13, color: ink, lineHeight: 1.3 }}>
                    {chapter.when}
                  </Box>
                </Box>
                <Box sx={{ px: { xs: "16px", sm: "20px" }, py: "16px" }}>
                  <Typography sx={{ fontFamily: display, fontWeight: 700, fontSize: 24, lineHeight: 1.1, color: ink, mb: "6px" }}>
                    {chapter.title}
                  </Typography>
                  <Typography sx={{ fontSize: 15.5, lineHeight: 1.6, color: bodyStrong }}>{chapter.body}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
