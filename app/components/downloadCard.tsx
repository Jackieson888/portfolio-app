"use client";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import experienceDataJson from "../data/experienceData.json";
import SectionHeader from "./sectionHeader";
import {
  blue,
  bodyMuted,
  border,
  borderThin,
  gutter,
  ink,
  maxWidth,
  mono,
  orange,
} from "@/src/tokens";

type ExperienceEntry = {
  title: string;
  org: string;
  dates: string;
  logo: string;
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

export default function DownloadCard() {
  const [tab, setTab] = useState<TabKey>("work");
  const entries = experienceData[tab];

  return (
    <Box
      component="section"
      id="experience"
      sx={{ maxWidth, mx: "auto", px: gutter, pt: "40px", pb: "96px" }}
    >
      <SectionHeader number="04" title="Experience" />

      <Box sx={{ display: "flex", gap: "12px", mb: "28px", flexWrap: "wrap" }}>
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

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {entries.map((entry, index) => (
          <Box
            key={`${entry.org}-${entry.title}`}
            sx={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
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
              }}
            />
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography
                variant="h3"
                sx={{ fontSize: 20, fontWeight: 600, m: 0, mb: "2px" }}
              >
                {entry.title}
              </Typography>
              <Typography sx={{ fontSize: 14, color: bodyMuted }}>
                {entry.org}
              </Typography>
            </Box>
            <Box
              sx={{
                fontFamily: mono,
                fontSize: 13,
                fontWeight: 700,
                color: blue,
                whiteSpace: "nowrap",
              }}
            >
              {entry.dates}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
