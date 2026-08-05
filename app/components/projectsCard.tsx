"use client";

import { useState } from "react";
import { Box, Button, Chip, Link as MuiLink, Typography } from "@mui/material";
import Image from "next/image";
import projectsDataJson from "../data/projectsData.json";
import SectionHeader from "./sectionHeader";
import SectionShapes, { type Shape } from "./sectionShapes";
import {
  accentAt,
  blue,
  bodyMuted,
  border,
  borderThin,
  card,
  gutter,
  ink,
  maxWidth,
  mono,
  orange,
  paper,
  paperShade,
  shadow,
  solidButton,
  yellow,
} from "@/src/tokens";

type AppInfo = {
  description: string;
  process: string;
  outcome: string;
};

type ProjectItem = {
  title: string;
  logo: string;
  link: string;
  tags: string[];
  accent: string;
  /** "live" embeds the real deploy; "placeholder" is for sites that block framing. */
  frame: "live" | "placeholder";
  /** Key into `backdrops` — themes the panel behind the device frame. */
  backdrop: string;
  info: AppInfo;
};

const projectsData = projectsDataJson as ProjectItem[];

/** The labelled panel sections, in render order. */
const infoSections: {
  label: string;
  text: keyof AppInfo;
}[] = [
  { label: "Description", text: "description" },
  { label: "Process", text: "process" },
  { label: "Outcome", text: "outcome" },
];

/** Diagonal hatch used wherever real artwork hasn't been dropped in yet. */
const hatch = (step: number) =>
  `repeating-linear-gradient(45deg, ${paper}, ${paper} ${step}px, #d8cfb6 ${step}px, #d8cfb6 ${step * 2}px)`;

/**
 * Per-project backdrop behind the device frame, echoing each app's own visual
 * identity. Values stay light: the frame is #1E1E1E with a hard black offset
 * shadow, so a faithfully dark backdrop would swallow both.
 */
const backdrops: Record<string, string> = {
  // This vs That — synthwave dusk: sun disc over a horizon grid.
  sunset: [
    "linear-gradient(180deg, transparent 0 63%, rgba(199,86,140,0.16) 63% 64%, transparent 64%)",
    "repeating-linear-gradient(0deg, rgba(120,60,110,0.07) 0 1px, transparent 1px 15px)",
    "radial-gradient(circle at 50% 60%, rgba(234,97,55,0.30) 0 105px, transparent 106px)",
    "linear-gradient(180deg, #EDE0EE 0%, #F4E1DE 58%, #F8EAD8 100%)",
  ].join(","),

  // Game Gem — arcade treasure: gem facets lit by a gold glow.
  arcade: [
    "repeating-linear-gradient(45deg, rgba(88,58,140,0.09) 0 11px, transparent 11px 22px)",
    "repeating-linear-gradient(-45deg, rgba(88,58,140,0.09) 0 11px, transparent 11px 22px)",
    "radial-gradient(circle at 50% 44%, rgba(255,168,55,0.26) 0 115px, transparent 116px)",
    "linear-gradient(180deg, #E9E4F2 0%, #F3EEDC 100%)",
  ].join(","),

  // Tripr — plotted route across a map grid.
  map: [
    "linear-gradient(118deg, transparent 0 46%, rgba(234,97,55,0.28) 46% 47.4%, transparent 47.4%)",
    "repeating-linear-gradient(0deg, rgba(87,150,193,0.16) 0 1px, transparent 1px 27px)",
    "repeating-linear-gradient(90deg, rgba(87,150,193,0.16) 0 1px, transparent 1px 27px)",
    "linear-gradient(160deg, #E4EDF1 0%, #F1EADA 100%)",
  ].join(","),
};

const PORTRAIT = { width: 440, height: 956 };
const LANDSCAPE = { width: 956, height: 440 };

function DeviceFrame({
  project,
  landscape,
}: {
  project: ProjectItem;
  landscape: boolean;
}) {
  const size = landscape ? LANDSCAPE : PORTRAIT;

  return (
    <Box
      sx={{
        position: "relative",
        width: `min(${size.width}px, 100%)`,
        height: size.height,
        maxHeight: "70vh",
        backgroundColor: ink,
        border,
        borderRadius: "40px",
        px: landscape ? "14px" : "8px",
        py: landscape ? "8px" : "14px",
        boxShadow: shadow(6),
        transition: "width .35s ease, height .35s ease, padding .35s ease",
      }}
    >
      {/* Speaker notch — top edge in portrait, left edge in landscape. */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          backgroundColor: "#3a3a36",
          borderRadius: "3px",
          ...(landscape
            ? {
                left: "4px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "5px",
                height: "70px",
              }
            : {
                top: "5px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "70px",
                height: "5px",
              }),
        }}
      />

      {project.frame === "live" ? (
        <Box
          component="iframe"
          src={project.link}
          title={`${project.title} live preview`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          sx={{
            display: "block",
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "16px",
            backgroundColor: "#fff",
          }}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "16px",
            background: hatch(12),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              fontFamily: mono,
              fontSize: 10.5,
              letterSpacing: "0.5px",
              textAlign: "center",
              color: ink,
              backgroundColor: card,
              border: borderThin,
              borderRadius: "6px",
              px: "8px",
              py: "5px",
            }}
          >
            MOBILE
            <br />
            SCREENSHOT
          </Box>
        </Box>
      )}
    </Box>
  );
}

function AppInfoPanel({ project }: { project: ProjectItem }) {
  return (
    <Box
      sx={{
        backgroundColor: card,
        p: "22px",
        "& > *": { maxWidth: 620, mx: "auto" },
      }}
    >
      {infoSections.map((section, index) => (
        <Box key={section.label} sx={{ mb: "20px" }}>
          <Box
            sx={{
              fontFamily: mono,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: accentAt(index),
              mb: "6px",
            }}
          >
            {section.label}
          </Box>
          <Typography
            sx={{ fontSize: 13.5, lineHeight: 1.5, color: bodyMuted }}
          >
            {project.info[section.text]}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function ProjectRow({ project }: { project: ProjectItem }) {
  const [landscape, setLandscape] = useState(false);

  return (
    <Box
      className="reveal"
      sx={{
        backgroundColor: card,
        border,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: shadow(8),
        display: "flex",
        flexDirection: "column",
        transition: "transform .25s ease, box-shadow .25s ease",
        "&:hover": { transform: "translateY(-4px)", boxShadow: shadow(11) },
        "@media (min-width: 1024px)": {
          flexDirection: "row",
        },
      }}
    >
      {/* Left: live device frame. */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          background: backdrops[project.backdrop] ?? paperShade,
          borderBottom: border,
          borderRight: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          p: "28px",
          minHeight: 320,
          width: "100%",
          "@media (min-width: 1024px)": {
            borderBottom: "none",
            borderRight: border,
            width: 700,
          },
        }}
      >
        <DeviceFrame project={project} landscape={landscape} />
        <Button
          onClick={() => setLandscape((prev) => !prev)}
          sx={{
            fontFamily: mono,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.5px",
            color: ink,
            backgroundColor: paper,
            border: borderThin,
            borderRadius: "8px",
            px: "14px",
            py: "6px",
            "&:hover": { backgroundColor: ink, color: paper },
            "&:hover .rotate-glyph": { transform: "rotate(180deg)" },
          }}
        >
          <Box
            component="span"
            className="rotate-glyph"
            sx={{
              display: "inline-block",
              mr: "6px",
              transition: "transform .35s ease",
            }}
          >
            ↻
          </Box>
          View {landscape ? "Portrait" : "Landscape"}
        </Button>
      </Box>

      {/* Right: project identity and actions. */}
      <Box
        sx={{
          p: "22px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {project.logo ? (
            <Image
              src={project.logo}
              alt=""
              width={44}
              height={44}
              style={{
                borderRadius: "8px",
                border: `2px solid ${ink}`,
                objectFit: "contain",
              }}
            />
          ) : null}
          <Typography variant="h3" sx={{ fontSize: 24, m: 0 }}>
            {project.title}
          </Typography>
          <MuiLink
            href={project.link}
            target="_blank"
            rel="noopener"
            underline="none"
            sx={{
              ...solidButton(orange),
              fontSize: 14,
              px: "18px",
              py: "9px",
            }}
          >
            Live Project ↗
          </MuiLink>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {project.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
            pt: "8px",
          }}
        >
          <AppInfoPanel project={project} />
        </Box>
      </Box>
    </Box>
  );
}

const shapes: Shape[] = [
  {
    kind: "circle",
    size: 170,
    color: blue,
    opacity: 0.16,
    drift: "driftD",
    duration: 30,
    top: "4%",
    left: "-55px",
  },
  {
    kind: "square",
    size: 120,
    color: yellow,
    opacity: 0.17,
    drift: "driftA",
    duration: 27,
    delay: -11,
    top: "38%",
    right: "-45px",
  },
  {
    kind: "ring",
    size: 190,
    color: orange,
    opacity: 0.2,
    drift: "driftB",
    duration: 35,
    delay: -19,
    bottom: "6%",
    left: "8%",
  },
];

export default function ProjectsCard() {
  return (
    <Box
      component="section"
      id="work"
      sx={{
        position: "relative",
        mx: "auto",
        px: gutter,
        pt: "80px",
        pb: "96px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SectionShapes shapes={shapes} />

      <Box sx={{ position: "relative", zIndex: 1, maxWidth, width: "stretch" }}>
        <SectionHeader number="03" title="Selected Work" />

        <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {projectsData.map((project) => (
            <ProjectRow key={project.title} project={project} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
