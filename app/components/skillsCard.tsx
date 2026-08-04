"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import iconDataJson from "../data/skillIconData.json";
import SectionHeader from "./sectionHeader";
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
  path: string;
  category: string;
};

const iconData = iconDataJson as SkillItem[];

/** Render order and label accent for each group. */
const groups = [
  { name: "Languages", accent: yellow },
  { name: "Frameworks & Libraries", accent: orange },
  { name: "Cloud & Tools", accent: blue },
];

export default function SkillsCard() {
  return (
    <Box
      component="section"
      id="toolkit"
      sx={{ backgroundColor: ink, px: gutter, py: "64px" }}
    >
      <Box sx={{ maxWidth, mx: "auto" }}>
        <SectionHeader number="02" title="Toolkit" accent={yellow} dark />

        {groups.map((group, index) => (
          <Box
            key={group.name}
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
                    <Image
                      src={`/icons/${skill.path}`}
                      alt=""
                      width={18}
                      height={18}
                    />
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
