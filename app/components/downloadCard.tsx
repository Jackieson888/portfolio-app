"use client";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import experienceDataJson from "../data/experienceData.json";
import SectionHeader from "./sectionHeader";
import SectionShapes, { type Shape } from "./sectionShapes";
import {
  blue,
  blueText,
  bodyMuted,
  border,
  borderThin,
  gutter,
  ink,
  maxWidth,
  mono,
  orange,
  yellow,
} from "@/src/tokens";

type ExperienceEntry = {
  title: string;
  org: string;
  location: string;
  dates: string;
  logo: string;
  points: string[];
};

const experienceData = experienceDataJson as {
  work: ExperienceEntry[];
  education: ExperienceEntry[];
};

const tabs = [
  { key: "work", label: "Work Experience" },
  { key: "education", label: "Education" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const shapes: Shape[] = [
  {
    kind: "ring",
    size: 175,
    color: orange,
    opacity: 0.2,
    drift: "driftC",
    duration: 29,
    top: "10%",
    right: "4%",
  },
  {
    kind: "triangle",
    size: 145,
    color: blue,
    opacity: 0.16,
    drift: "driftD",
    duration: 33,
    delay: -13,
    bottom: "8%",
    left: "-20px",
  },
  {
    kind: "circle",
    size: 95,
    color: yellow,
    opacity: 0.18,
    drift: "driftB",
    duration: 24,
    delay: -6,
    bottom: "22%",
    right: "16%",
  },
];

export default function DownloadCard() {
  const [tab, setTab] = useState<TabKey>("work");
  const entries = experienceData[tab];

  return (
    <Box
      component="section"
      id="experience"
      sx={{
        position: "relative",
        mx: "auto",
        px: gutter,
        pt: "40px",
        pb: "96px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SectionShapes shapes={shapes} />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <SectionHeader number="04" title="Experience" />

        <Box
          sx={{
            display: "flex",
            gap: "12px",
            mb: "28px",
            flexWrap: "wrap",
            maxWidth,
          }}
        >
          {tabs.map(({ key, label }) => {
            const selected = tab === key;
            return (
              <Button
                key={key}
                onClick={() => setTab(key)}
                aria-pressed={selected}
                sx={{
                  fontFamily: mono,
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  px: "22px",
                  py: "10px",
                  border,
                  borderRadius: "8px",
                  backgroundColor: selected ? orange : "transparent",
                  // Both states stay dark — cream text would vanish on this background.
                  color: ink,
                  "&:hover": {
                    backgroundColor: selected ? orange : "rgba(30,30,30,0.08)",
                  },
                }}
              >
                {label}
              </Button>
            );
          })}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", maxWidth }}>
          {entries.map((entry, index) => (
            <Box
              key={`${entry.org}-${entry.title}`}
              className="reveal"
              sx={{
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
                flexWrap: "wrap",
                py: "20px",
                borderBottom:
                  index === entries.length - 1 ? "none" : borderThin,
              }}
            >
              <Image
                src={`/icons/${entry.logo}`}
                alt={`${entry.org} logo`}
                width={64}
                height={64}
                style={{
                  border: `2px solid ${ink}`,
                  borderRadius: "8px",
                  background: "#fff",
                  padding: "6px",
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1, minWidth: 220 }}>
                <Typography
                  variant="h3"
                  sx={{ fontSize: 20, fontWeight: 600, m: 0, mb: "2px" }}
                >
                  {entry.title}
                </Typography>
                <Typography sx={{ fontSize: 14, color: bodyMuted }}>
                  {entry.org}
                  {entry.location ? ` — ${entry.location}` : ""}
                </Typography>
                {entry.points.length > 0 ? (
                  <Box
                    component="ul"
                    sx={{
                      m: 0,
                      mt: "10px",
                      pl: "18px",
                      // Tailwind preflight strips markers; restore them here.
                      listStyleType: "disc",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      "& li::marker": { color: blueText },
                    }}
                  >
                    {entry.points.map((point) => (
                      <Typography
                        key={point}
                        component="li"
                        sx={{ fontSize: 14, lineHeight: 1.5, color: bodyMuted }}
                      >
                        {point}
                      </Typography>
                    ))}
                  </Box>
                ) : null}
              </Box>
              <Box
                sx={{
                  fontFamily: mono,
                  fontSize: 13,
                  fontWeight: 700,
                  color: blueText,
                  whiteSpace: "nowrap",
                  pt: "4px",
                }}
              >
                {entry.dates}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
