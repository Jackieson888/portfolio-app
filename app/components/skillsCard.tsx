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
  { name: "AI Development", accent: orange },
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
        py: "64px",
      }}
    >
      <SectionShapes shapes={shapes} />

      <Box sx={{ position: "relative", zIndex: 1, maxWidth, mx: "auto" }}>
        <SectionHeader number="02" title="Toolkit" accent={yellow} dark />

        {groups.map((group, index) => (
          <Box
            key={group.name}
            className="reveal"
            sx={{ mb: index === groups.length - 1 ? 0 : "28px" }}
          >
            <Box
              sx={{
                fontFamily: mono,
                fontSize: 12,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: group.accent,
                mb: "14px",
              }}
            >
              {group.name}
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {iconData
                .filter((skill) => skill.category === group.name)
                .map((skill) => (
                  <Box
                    key={skill.title}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      backgroundColor: paper,
                      border: `2px solid ${paper}`,
                      borderRadius: "8px",
                      px: "14px",
                      py: "8px",
                      transition: "transform .15s ease",
                      "&:hover": { transform: "translateY(-3px)" },
                    }}
                  >
                    {skill.path ? (
                      <Image
                        src={`/icons/${skill.path}`}
                        alt=""
                        width={18}
                        height={18}
                      />
                    ) : null}
                    <Box
                      component="span"
                      sx={{ fontSize: 14, fontWeight: 600, color: ink }}
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
