import { Box, Chip, Link as MuiLink, Typography } from "@mui/material";
import projectsDataJson from "../data/projectsData.json";
import SectionHeader from "./sectionHeader";
import SectionShapes, { type Shape } from "./sectionShapes";
import ProjectGallery, { type GalleryMedia } from "./projectGallery";
import {
  accentAt,
  blue,
  blueText,
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
  monoLabel,
  orange,
  orangeText,
  paper,
  shadow,
  solidButton,
  yellow,
} from "@/src/tokens";

/**
 * One case study. The copy follows the recruiter-skim order: a problem-first hook that has to
 * land on its own, then problem / what was built / role / quantified outcome in a line each,
 * with the deeper engineering story tucked into an optional "How it works" disclosure.
 */
type ProjectItem = {
  title: string;
  /** Eyebrow line: what kind of thing it is and the headline stack, e.g. "Desktop app · C# / WPF". */
  kind: string;
  year: string;
  /** Live URL. Omit for things with no hosted demo (desktop apps). */
  link?: string;
  linkLabel?: string;
  repo?: string;
  /** The first line a reviewer reads: the problem and why the project matters. */
  hook: string;
  facts: {
    problem: string;
    built: string;
    role: string;
    outcome: string;
  };
  /** Exactly three reads best: the numbers that back up the outcome. */
  metrics: { value: string; label: string }[];
  /** 5–7 skills used, most important first. */
  stack: string[];
  details?: { heading: string; body: string }[];
  /** First item is the default stage view and sets the stage's aspect ratio. */
  media: GalleryMedia[];
};

const projectsData = projectsDataJson as ProjectItem[];

/** Text-safe version of each accent, for small labels on white. */
const textAccent = (accent: string) =>
  accent === orange ? orangeText : accent === blue ? blueText : ink;

const factRows: { key: keyof ProjectItem["facts"]; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "built", label: "What I built" },
  { key: "role", label: "My role" },
  { key: "outcome", label: "Outcome" },
];

function Metrics({ metrics }: { metrics: ProjectItem["metrics"] }) {
  return (
    <Box
      component="ul"
      sx={{
        listStyle: "none",
        p: 0,
        m: 0,
        display: "grid",
        gridTemplateColumns: `repeat(${metrics.length}, minmax(0, 1fr))`,
        gap: "10px",
      }}
    >
      {metrics.map((metric, i) => (
        <Box
          component="li"
          key={metric.label}
          sx={{
            backgroundColor: accentAt(i),
            border: borderThin,
            borderRadius: "6px",
            px: "12px",
            py: "10px",
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              fontFamily: mono,
              fontWeight: 700,
              fontSize: "clamp(18px, 2vw, 24px)",
              lineHeight: 1.1,
              color: ink,
              overflowWrap: "anywhere",
            }}
          >
            {metric.value}
          </Box>
          <Box sx={{ fontSize: 12, lineHeight: 1.3, mt: "4px", color: ink }}>{metric.label}</Box>
        </Box>
      ))}
    </Box>
  );
}

function Facts({ facts, accent }: { facts: ProjectItem["facts"]; accent: string }) {
  return (
    <Box component="dl" sx={{ m: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
      {factRows.map(({ key, label }) => (
        <Box key={key} sx={{ borderLeft: `3px solid ${accent}`, pl: "12px" }}>
          <Box
            component="dt"
            sx={{ ...monoLabel, fontSize: 11, letterSpacing: "1.2px", color: textAccent(accent), mb: "2px" }}
          >
            {label}
          </Box>
          <Box component="dd" sx={{ m: 0, fontSize: 15, lineHeight: 1.55, color: bodyStrong }}>
            {facts[key]}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function Links({ project }: { project: ProjectItem }) {
  const secondary = {
    fontFamily: mono,
    fontSize: 13,
    fontWeight: 700,
    color: ink,
    backgroundColor: paper,
    border: borderThin,
    borderRadius: "8px",
    px: "16px",
    py: "9px",
    transition: "background-color .2s ease, color .2s ease",
    "&:hover": { backgroundColor: ink, color: paper },
  };

  return (
    <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {project.link ? (
        <MuiLink
          href={project.link}
          target="_blank"
          rel="noopener"
          underline="none"
          sx={{ ...solidButton(orange), fontSize: 14, px: "18px", py: "9px" }}
        >
          {project.linkLabel ?? "Live Project"} ↗
        </MuiLink>
      ) : null}
      {project.repo ? (
        <MuiLink
          href={project.repo}
          target="_blank"
          rel="noopener"
          underline="none"
          sx={project.link ? secondary : { ...solidButton(orange), fontSize: 14, px: "18px", py: "9px" }}
        >
          View Code ↗
        </MuiLink>
      ) : null}
    </Box>
  );
}

function Details({ details, accent }: { details: NonNullable<ProjectItem["details"]>; accent: string }) {
  return (
    <Box
      component="details"
      sx={{
        borderTop: borderThin,
        pt: "12px",
        "& > summary": {
          ...monoLabel,
          fontSize: 12,
          cursor: "pointer",
          listStyle: "none",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: ink,
          "&::-webkit-details-marker": { display: "none" },
          "&::before": {
            content: '"+"',
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 20,
            height: 20,
            border: borderThin,
            borderRadius: "4px",
            backgroundColor: accent,
            fontSize: 14,
            lineHeight: 1,
          },
        },
        "&[open] > summary::before": { content: '"–"' },
      }}
    >
      <Box component="summary">How it works</Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px", mt: "14px" }}>
        {details.map((d) => (
          <Box key={d.heading}>
            <Typography sx={{ fontWeight: 700, fontSize: 14.5, color: ink, mb: "2px" }}>{d.heading}</Typography>
            <Typography sx={{ fontSize: 14, lineHeight: 1.6, color: bodyMuted }}>{d.body}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function ProjectCase({ project, index }: { project: ProjectItem; index: number }) {
  const accent = accentAt(index);
  const mediaFirst = index % 2 === 0;
  const number = String(index + 1).padStart(2, "0");

  return (
    <Box
      component="article"
      className="reveal"
      aria-labelledby={`project-${index}`}
      sx={{
        backgroundColor: card,
        border,
        borderRadius: "4px",
        boxShadow: shadow(8),
        p: { xs: "18px", sm: "26px", lg: "32px" },
        display: "grid",
        gap: { xs: "24px", lg: "36px" },
        gridTemplateColumns: "minmax(0, 1fr)",
        alignItems: "start",
        "@media (min-width: 1000px)": {
          gridTemplateColumns: mediaFirst ? "minmax(0, 7fr) minmax(0, 5fr)" : "minmax(0, 5fr) minmax(0, 7fr)",
        },
      }}
    >
      <Box
        sx={{
          minWidth: 0,
          "@media (min-width: 1000px)": { order: mediaFirst ? 0 : 1, position: "sticky", top: "96px" },
        }}
      >
        <ProjectGallery media={project.media} accent={accent} title={project.title} />
      </Box>

      <Box sx={{ minWidth: 0, display: "flex", flexDirection: "column", gap: "18px" }}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: "10px", flexWrap: "wrap" }}>
            <Box
              sx={{
                fontFamily: mono,
                fontWeight: 700,
                fontSize: 13,
                backgroundColor: accent,
                border: borderThin,
                borderRadius: "4px",
                px: "8px",
                py: "1px",
              }}
            >
              {number}
            </Box>
            <Box sx={{ ...monoLabel, fontSize: 11.5, letterSpacing: "1.2px", color: bodyMuted }}>
              {project.kind} · {project.year}
            </Box>
          </Box>
          <Typography
            id={`project-${index}`}
            variant="h3"
            sx={{ fontFamily: display, fontSize: "clamp(30px, 3.4vw, 40px)", lineHeight: 1.05, m: 0, mb: "12px" }}
          >
            {project.title}
          </Typography>
          <Typography sx={{ fontSize: 18, lineHeight: 1.5, fontWeight: 600, color: ink, m: 0 }}>
            {project.hook}
          </Typography>
        </Box>

        <Metrics metrics={project.metrics} />
        <Facts facts={project.facts} accent={accent} />

        <Box>
          <Box sx={{ ...monoLabel, fontSize: 11, letterSpacing: "1.2px", color: bodyMuted, mb: "8px" }}>
            Stack
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {project.stack.map((skill, i) => (
              <Chip key={skill} label={skill} size="small" sx={i === 0 ? { backgroundColor: yellow } : undefined} />
            ))}
          </Box>
        </Box>

        <Links project={project} />
        {project.details?.length ? <Details details={project.details} accent={accent} /> : null}
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
        <SectionHeader number="01" title="Selected Work" />

        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "32px", md: "48px" } }}>
          {projectsData.map((project, index) => (
            <ProjectCase key={project.title} project={project} index={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
