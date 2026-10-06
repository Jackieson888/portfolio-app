import { Box } from "@mui/material";
import Image from "next/image";
import iconDataJson from "../data/skillIconData.json";
import SectionHeader from "./sectionHeader";
import SectionShapes, { type Shape } from "./sectionShapes";
import {
  blue,
  gutter,
  ink,
  maxWidth,
  mono,
  orange,
  paper,
  yellow,
} from "@/src/tokens";

type SkillItem = {
  title: string;
  /** Empty when no brand icon exists — the chip then renders label-only. */
  path: string;
  category: string;
};

const iconData = iconDataJson as SkillItem[];

/** Render order and label accent for each group. */
const groups = [
  { name: "Languages", accent: yellow },
  { name: "Frameworks & Libraries", accent: orange },
  { name: "Data & APIs", accent: blue },
  { name: "Cloud & DevOps", accent: yellow },
  { name: "Testing", accent: orange },
  { name: "AI Development", accent: blue },
];

// On the dark panel the shapes read as glow rather than silhouette, so they
// skip the black outline and lean on the accent colors themselves.
const shapes: Shape[] = [
  {
    kind: "circle",
    size: 200,
    color: orange,
    opacity: 0.1,
    drift: "driftA",
    duration: 32,
    outline: false,
    top: "-60px",
    right: "6%",
  },
  {
    kind: "ring",
    size: 160,
    color: blue,
    opacity: 0.22,
    drift: "driftC",
    duration: 28,
    delay: -9,
    bottom: "-40px",
    left: "3%",
  },
  {
    kind: "square",
    size: 105,
    color: yellow,
    opacity: 0.09,
    drift: "driftD",
    duration: 36,
    delay: -17,
    outline: false,
    bottom: "18%",
    right: "-30px",
  },
];

export default function SkillsCard() {
  return (
    <Box
      component="section"
      id="toolkit"
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: ink,
        px: gutter,
        py: "52px",
      }}
    >
      <SectionShapes shapes={shapes} />

      <Box sx={{ position: "relative", zIndex: 1, maxWidth, mx: "auto" }}>
        <SectionHeader number="04" title="Toolkit" accent={yellow} dark />

        {groups.map((group, index) => (
          <Box
            key={group.name}
            className="reveal"
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "190px 1fr" },
              gap: { xs: "8px", md: "16px" },
              alignItems: "baseline",
              py: "12px",
              borderTop: index === 0 ? "none" : "1px solid rgba(238,230,211,0.14)",
            }}
          >
            <Box
              sx={{
                fontFamily: mono,
                fontSize: 12,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: group.accent,
              }}
            >
              {group.name}
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {iconData
                .filter((skill) => skill.category === group.name)
                .map((skill) => (
                  <Box
                    key={skill.title}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: paper,
                      border: `2px solid ${paper}`,
                      borderRadius: "6px",
                      px: "10px",
                      py: "4px",
                      transition: "transform .15s ease",
                      "&:hover": { transform: "translateY(-2px)" },
                    }}
                  >
                    {skill.path ? (
                      <Image
                        src={`/icons/${skill.path}`}
                        alt=""
                        width={15}
                        height={15}
                      />
                    ) : null}
                    <Box
                      component="span"
                      sx={{ fontSize: 13, fontWeight: 600, color: ink }}
                    >
                      {skill.title}
                    </Box>
                  </Box>
                ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
