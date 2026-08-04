"use client";

import { useState } from "react";
import { Box, Button, Chip, IconButton, Link as MuiLink, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import projectsDataJson from "../data/projectsData.json";
import SectionHeader from "./sectionHeader";
import {
  accentAt,
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
} from "@/src/tokens";

type CaseStudy = {
  problem: string;
  problemImg: string;
  approach: string;
  approachImg: string;
  outcome: string;
  outcomeImg: string;
  design: string;
  designImg: string;
  wireframing: string;
  wireframingImg: string;
  assets: string;
  assetsImg: string;
};

type ProjectItem = {
  title: string;
  logo: string;
  link: string;
  tags: string[];
  accent: string;
  /** "live" embeds the real deploy; "placeholder" is for sites that block framing. */
  frame: "live" | "placeholder";
  description: string;
  caseStudy: CaseStudy;
};

const projectsData = projectsDataJson as ProjectItem[];

/** The six labelled panel sections, in render order. */
const caseSections: { label: string; text: keyof CaseStudy; img: keyof CaseStudy }[] = [
  { label: "Problem", text: "problem", img: "problemImg" },
  { label: "Approach", text: "approach", img: "approachImg" },
  { label: "Outcome", text: "outcome", img: "outcomeImg" },
  { label: "Design", text: "design", img: "designImg" },
  { label: "Wireframing", text: "wireframing", img: "wireframingImg" },
  { label: "Asset Creation", text: "assets", img: "assetsImg" },
];

/** Diagonal hatch used wherever real artwork hasn't been dropped in yet. */
const hatch = (step: number) =>
  `repeating-linear-gradient(45deg, ${paper}, ${paper} ${step}px, #d8cfb6 ${step}px, #d8cfb6 ${step * 2}px)`;

const PORTRAIT = { width: 300, height: 650 };
const LANDSCAPE = { width: 650, height: 300 };

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

function CaseStudyPanel({
  project,
  open,
  onClose,
}: {
  project: ProjectItem;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Box
      inert={!open}
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 3,
        backgroundColor: card,
        p: "22px",
        overflowY: "auto",
        transform: open ? "translateX(0)" : "translateX(105%)",
        transition: "transform .4s ease",
        // Keep line length and image slots readable when the cell is wide.
        "& > *": { maxWidth: 620, mx: "auto" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "12px",
          mb: "18px",
        }}
      >
        <Box>
          <Box
            sx={{
              fontFamily: mono,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "1px",
              color: project.accent,
              mb: "4px",
            }}
          >
            CASE STUDY
          </Box>
          <Typography variant="h3" sx={{ fontSize: 24, m: 0 }}>
            {project.title}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          aria-label={`Close ${project.title} case study`}
          sx={{
            border: borderThin,
            borderRadius: "8px",
            color: ink,
            p: "4px",
            flexShrink: 0,
            "&:hover": { backgroundColor: ink, color: paper },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {caseSections.map((section, index) => {
        const img = project.caseStudy[section.img];
        return (
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
            <Box
              sx={{
                position: "relative",
                height: 100,
                borderRadius: "8px",
                overflow: "hidden",
                border: borderThin,
                mb: "8px",
                background: img ? "none" : hatch(10),
              }}
            >
              {img ? (
                <Image
                  src={img}
                  alt={`${project.title} — ${section.label}`}
                  fill
                  sizes="280px"
                  style={{ objectFit: "cover" }}
                />
              ) : null}
            </Box>
            <Typography sx={{ fontSize: 13.5, lineHeight: 1.5, color: bodyMuted }}>
              {project.caseStudy[section.text]}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

function ProjectRow({ project }: { project: ProjectItem }) {
  const [landscape, setLandscape] = useState(false);
  const [caseOpen, setCaseOpen] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: card,
        border,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: shadow(8),
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 280px" },
      }}
    >
      {/* Left: live device frame, with the case-study panel sliding in over it. */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: paperShade,
          borderBottom: { xs: border, md: "none" },
          borderRight: { xs: "none", md: border },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          p: "28px",
          minHeight: 320,
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
          }}
        >
          ↻ View {landscape ? "Portrait" : "Landscape"}
        </Button>

        <CaseStudyPanel
          project={project}
          open={caseOpen}
          onClose={() => setCaseOpen(false)}
        />
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
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {project.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Box>

        <Typography sx={{ fontSize: 14.5, lineHeight: 1.6, color: bodyMuted }}>
          {project.description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
            pt: "8px",
          }}
        >
          <Button
            onClick={() => setCaseOpen(true)}
            aria-expanded={caseOpen}
            sx={{
              fontWeight: 700,
              fontSize: 14,
              color: ink,
              backgroundColor: orange,
              border,
              borderRadius: "8px",
              px: "18px",
              py: "9px",
              "&:hover": { backgroundColor: ink, color: paper },
            }}
          >
            View Case Study →
          </Button>
          <MuiLink
            href={project.link}
            target="_blank"
            rel="noopener"
            underline="none"
            sx={{
              fontWeight: 700,
              fontSize: 14,
              color: project.accent,
              transition: "color .2s ease",
              "&:hover": { color: orange },
            }}
          >
            Live Project ↗
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
}

export default function ProjectsCard() {
  return (
    <Box
      component="section"
      id="work"
      sx={{ maxWidth, mx: "auto", px: gutter, pt: "80px", pb: "96px" }}
    >
      <SectionHeader number="03" title="Selected Work" />

      <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {projectsData.map((project) => (
          <ProjectRow key={project.title} project={project} />
        ))}
      </Box>
    </Box>
  );
}
