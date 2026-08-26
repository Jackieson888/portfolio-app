import { Box, Chip, Link as MuiLink, Typography } from "@mui/material";
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
  challenge: string;
  process: string;
  outcome: string;
};

type ProjectItem = {
  title: string;
  logo: string;
  link: string;
  repo: string;
  tags: string[];
  accent: string;
  /** Static hero screenshot shown in the browser-chrome frame. */
  screenshot: string;
  screenshotWidth: number;
  screenshotHeight: number;
  /** Key into `backdrops` — themes the panel behind the frame. */
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
  { label: "Challenge", text: "challenge" },
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
  // Salmonid Sim — river current: soft ripple lines under a caustic glow.
  river: [
    "repeating-linear-gradient(3deg, rgba(74,140,132,0.10) 0 2px, transparent 2px 18px)",
    "radial-gradient(circle at 28% 68%, rgba(87,150,193,0.24) 0 130px, transparent 131px)",
    "linear-gradient(180deg, #DCEAE6 0%, #E8F0E8 55%, #F2EFE0 100%)",
  ].join(","),

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

/** Browser-chrome dots cycle the brand accents rather than literal red/amber/green. */
const chromeDots = [orange, yellow, blue];

function BrowserFrame({ project }: { project: ProjectItem }) {
  const domain = project.link.replace(/^https?:\/\//, "").replace(/\/+$/, "");

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        backgroundColor: ink,
        border,
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: shadow(6),
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          px: "14px",
          py: "10px",
          borderBottom: "1px solid #3a3a36",
        }}
      >
        <Box sx={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          {chromeDots.map((c, i) => (
            <Box
              key={i}
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: c,
              }}
            />
          ))}
        </Box>
        <Box
          sx={{
            flex: 1,
            fontFamily: mono,
            fontSize: 12,
            color: "#928f80",
            backgroundColor: "#141412",
            border: "1px solid #3a3a36",
            borderRadius: "6px",
            px: "10px",
            py: "4px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {domain}
        </Box>
      </Box>

      {project.screenshot ? (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: `${project.screenshotWidth} / ${project.screenshotHeight}`,
            overflow: "hidden",
            "& img": { transition: "transform .4s ease" },
            "&:hover img": { transform: "scale(1.035)" },
          }}
        >
          <Image
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            aspectRatio: "16 / 10",
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
            SCREENSHOT
            <br />
            COMING SOON
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
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: accentAt(index),
              mb: "6px",
            }}
          >
            {section.label}
          </Box>
          <Typography sx={{ fontSize: 16, lineHeight: 1.5, color: bodyMuted }}>
            {project.info[section.text]}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function ProjectRow({
  project,
  reversed,
}: {
  project: ProjectItem;
  reversed: boolean;
}) {
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
      {/* Preview: browser-chrome frame with a real screenshot. */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          background: backdrops[project.backdrop] ?? paperShade,
          borderBottom: border,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: "28px",
          minHeight: 320,
          width: "100%",
          "@media (min-width: 1024px)": {
            order: reversed ? 2 : 1,
            borderBottom: "none",
            borderRight: reversed ? "none" : border,
            borderLeft: reversed ? border : "none",
            width: 640,
          },
        }}
      >
        <BrowserFrame project={project} />
      </Box>

      {/* Project identity and actions. */}
      <Box
        sx={{
          p: "22px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          "@media (min-width: 1024px)": {
            order: reversed ? 1 : 2,
          },
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
          {project.repo ? (
            <MuiLink
              href={project.repo}
              target="_blank"
              rel="noopener"
              underline="none"
              sx={{
                fontFamily: mono,
                fontSize: 13,
                fontWeight: 700,
                color: ink,
                backgroundColor: paper,
                border: borderThin,
                borderRadius: "8px",
                px: "16px",
                py: "8px",
                "&:hover": { backgroundColor: ink, color: paper },
              }}
            >
              View Code ↗
            </MuiLink>
          ) : null}
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
          {projectsData.map((project, index) => (
            <ProjectRow
              key={project.title}
              project={project}
              reversed={index % 2 === 1}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
