import type { ReactNode } from "react";
import { Box, Chip, Link as MuiLink, Typography } from "@mui/material";
import Image from "next/image";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import projectsDataJson from "../data/projectsData.json";
import SectionHeader from "./sectionHeader";
import SectionShapes, { type Shape } from "./sectionShapes";
import { HoverPlayVideo } from "./inViewVideo";
import {
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

type MediaSection = "hero" | "description" | "challenge" | "process" | "outcome";

type ProjectMedia = {
  type: "image" | "video";
  src: string;
  /** Required in practice for type: "video" — first-frame JPG for layout-stable loading. */
  poster?: string;
  width: number;
  height: number;
  /** Short human-readable line, also used as the image alt / video aria-label. */
  caption: string;
  section: MediaSection;
};

type ProjectItem = {
  title: string;
  logo: string;
  link: string;
  repo: string;
  tags: string[];
  accent: string;
  /** Legacy static hero screenshot — hero fallback when no `media` entry has section: "hero". */
  screenshot: string;
  screenshotWidth: number;
  screenshotHeight: number;
  backdrop: string;
  info: AppInfo;
  /** Optional per-section clips/images. Absent = hero-screenshot + hatch-placeholder render. */
  media?: ProjectMedia[];
};

const projectsData = projectsDataJson as ProjectItem[];

const heroMedia = (project: ProjectItem) =>
  project.media?.find((m) => m.section === "hero");

const mediaFor = (project: ProjectItem, section: MediaSection) =>
  project.media?.find((m) => m.section === section);

/** Diagonal hatch used wherever real artwork hasn't been dropped in yet. */
const hatch = (step: number) =>
  `repeating-linear-gradient(45deg, ${paper}, ${paper} ${step}px, #d8cfb6 ${step}px, #d8cfb6 ${step * 2}px)`;

/** Small mono section label — e.g. CHALLENGE/PROCESS/OUTCOME — tinted per its accent. */
function RowLabel({ text, color, marker }: { text: string; color: string; marker?: ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: mono,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color,
        mb: "6px",
      }}
    >
      {marker}
      {text}
    </Box>
  );
}

function TriangleMarker() {
  return (
    <Box
      sx={{
        width: 0,
        height: 0,
        borderLeft: "5px solid transparent",
        borderRight: "5px solid transparent",
        borderBottom: `9px solid ${yellow}`,
        flexShrink: 0,
      }}
    />
  );
}

function HeroMedia({ project }: { project: ProjectItem }) {
  const hero = heroMedia(project);

  return (
    <Box sx={{ position: "relative", width: "100%", height: "clamp(170px, 22vw, 210px)", overflow: "hidden" }}>
      {hero || project.screenshot ? (
        hero?.type === "video" ? (
          <HoverPlayVideo src={hero.src} poster={hero.poster ?? ""} alt={hero.caption} />
        ) : (
          <Image
            src={hero?.src ?? project.screenshot}
            alt={hero?.caption ?? `${project.title} screenshot`}
            fill
            sizes="(min-width: 900px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        )
      ) : (
        <Box sx={{ position: "absolute", inset: 0, background: hatch(12) }} />
      )}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(0deg, rgba(28,26,23,.75) 0%, transparent 45%)",
          display: "flex",
          alignItems: "flex-end",
          p: "14px",
          pointerEvents: "none",
        }}
      >
        <Typography variant="h3" sx={{ fontSize: 22, color: "#fff", m: 0 }}>
          {project.title}
        </Typography>
      </Box>
    </Box>
  );
}

function MetaRow({ project }: { project: ProjectItem }) {
  const [primaryTag, ...restTags] = project.tags;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
        p: "14px",
        borderBottom: borderThin,
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {primaryTag ? <Chip label={primaryTag} size="small" sx={{ backgroundColor: yellow }} /> : null}
        {restTags.map((tag) => (
          <Chip key={tag} label={tag} size="small" />
        ))}
      </Box>
      <Box sx={{ display: "flex", gap: "8px" }}>
        <MuiLink
          href={project.link}
          target="_blank"
          rel="noopener"
          underline="none"
          sx={{ ...solidButton(orange), fontSize: 13, px: "14px", py: "7px" }}
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
              fontSize: 12,
              fontWeight: 700,
              color: ink,
              backgroundColor: paper,
              border: borderThin,
              borderRadius: "8px",
              px: "14px",
              py: "7px",
              "&:hover": { backgroundColor: ink, color: paper },
            }}
          >
            View Code ↗
          </MuiLink>
        ) : null}
      </Box>
    </Box>
  );
}

function DescriptionBlock({ project }: { project: ProjectItem }) {
  return (
    <Typography
      sx={{
        fontSize: 13,
        lineHeight: 1.6,
        color: bodyMuted,
        borderLeft: `3px solid ${blue}`,
        pl: "12px",
      }}
    >
      {project.info.description}
    </Typography>
  );
}

function ChallengeRow({ project }: { project: ProjectItem }) {
  const media = mediaFor(project, "challenge");

  return (
    <Box
      sx={{
        border: borderThin,
        borderRadius: "4px",
        backgroundColor: card,
        p: "12px",
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <RowLabel
          text="Challenge"
          color={orange}
          marker={<Box sx={{ width: 8, height: 8, backgroundColor: orange, flexShrink: 0 }} />}
        />
        <Typography sx={{ fontSize: 13, lineHeight: 1.5, color: bodyMuted }}>
          {project.info.challenge}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "relative",
          width: 78,
          height: 58,
          flexShrink: 0,
          borderRadius: "6px",
          overflow: "hidden",
          border: borderThin,
          boxShadow: shadow(3),
          transform: "rotate(-2deg)",
        }}
      >
        {media ? (
          media.type === "video" ? (
            <HoverPlayVideo src={media.src} poster={media.poster ?? ""} alt={media.caption} />
          ) : (
            <Image src={media.src} alt={media.caption} fill sizes="78px" style={{ objectFit: "cover" }} />
          )
        ) : (
          <Box sx={{ position: "absolute", inset: 0, background: hatch(6) }} />
        )}
      </Box>
    </Box>
  );
}

function ProcessRow({ project }: { project: ProjectItem }) {
  const media = mediaFor(project, "process");

  return (
    <Box sx={{ border: borderThin, borderRadius: "4px", backgroundColor: card, overflow: "hidden" }}>
      <Box sx={{ position: "relative", width: "100%", height: 38 }}>
        {media ? (
          media.type === "video" ? (
            <HoverPlayVideo src={media.src} poster={media.poster ?? ""} alt={media.caption} showIndicator={false} />
          ) : (
            <Image src={media.src} alt={media.caption} fill sizes="100vw" style={{ objectFit: "cover" }} />
          )
        ) : (
          <Box sx={{ position: "absolute", inset: 0, background: hatch(6) }} />
        )}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.9)",
            border: borderThin,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <PlayArrowRounded sx={{ color: ink, fontSize: 18 }} />
        </Box>
      </Box>
      <Box sx={{ p: "12px" }}>
        <RowLabel text="Process" color={blue} />
        <Typography sx={{ fontSize: 13, lineHeight: 1.5, color: bodyMuted }}>
          {project.info.process}
        </Typography>
      </Box>
    </Box>
  );
}

function OutcomeRow({ project }: { project: ProjectItem }) {
  const media = mediaFor(project, "outcome");

  return (
    <Box
      sx={{
        border: borderThin,
        borderRadius: "4px",
        backgroundColor: card,
        p: "12px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 52,
          height: 52,
          flexShrink: 0,
          borderRadius: "50%",
          overflow: "hidden",
          border: borderThin,
        }}
      >
        {media ? (
          media.type === "video" ? (
            <HoverPlayVideo src={media.src} poster={media.poster ?? ""} alt={media.caption} />
          ) : (
            <Image src={media.src} alt={media.caption} fill sizes="52px" style={{ objectFit: "cover" }} />
          )
        ) : (
          <Box sx={{ position: "absolute", inset: 0, background: hatch(4) }} />
        )}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <RowLabel text="Outcome" color={yellow} marker={<TriangleMarker />} />
        <Typography sx={{ fontSize: 13, lineHeight: 1.5, color: bodyMuted }}>
          {project.info.outcome}
        </Typography>
      </Box>
    </Box>
  );
}

function ProjectRow({ project }: { project: ProjectItem }) {
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
      }}
    >
      <HeroMedia project={project} />
      <MetaRow project={project} />
      <Box sx={{ p: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
        <DescriptionBlock project={project} />
        <ChallengeRow project={project} />
        <ProcessRow project={project} />
        <OutcomeRow project={project} />
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

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "24px",
            "@media (min-width: 900px)": { gridTemplateColumns: "repeat(2, 1fr)" },
          }}
        >
          {projectsData.map((project) => (
            <ProjectRow key={project.title} project={project} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
