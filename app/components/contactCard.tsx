"use client";

import { Box, Link as MuiLink, Typography } from "@mui/material";
import Image from "next/image";
import contactDataJson from "../data/contactIconData.json";
import SectionShapes, { type Shape } from "./sectionShapes";
import {
  blue,
  border,
  gutter,
  ink,
  mono,
  orange,
  paper,
  yellow,
} from "@/src/tokens";

type ContactItem = {
  title: string;
  path: string;
  link: string;
  accent: string;
};

const contactData = contactDataJson as ContactItem[];

const shapes: Shape[] = [
  // The original static ring, now drifting.
  {
    kind: "ring",
    size: 200,
    color: paper,
    opacity: 0.15,
    drift: "driftA",
    duration: 30,
    top: "-40px",
    right: "-40px",
  },
  {
    kind: "circle",
    size: 150,
    color: orange,
    opacity: 0.1,
    drift: "driftB",
    duration: 34,
    delay: -12,
    outline: false,
    bottom: "-50px",
    left: "6%",
  },
  {
    kind: "ring",
    size: 120,
    color: yellow,
    opacity: 0.18,
    drift: "driftD",
    duration: 26,
    delay: -5,
    top: "42%",
    left: "-45px",
  },
  {
    kind: "square",
    size: 90,
    color: blue,
    opacity: 0.12,
    drift: "driftC",
    duration: 31,
    delay: -20,
    outline: false,
    bottom: "16%",
    right: "8%",
  },
];

export default function ContactCard() {
  return (
    <Box
      component="section"
      id="contact"
      sx={{
        backgroundColor: ink,
        px: gutter,
        pt: "88px",
        pb: "64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SectionShapes shapes={shapes} />

      <Box sx={{ maxWidth: 900, mx: "auto", position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            fontFamily: mono,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "1px",
            color: yellow,
            mb: "14px",
          }}
        >
          05 — GET IN TOUCH
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontSize: "clamp(32px, 5vw, 54px)",
            lineHeight: 1.05,
            color: paper,
            m: 0,
            mb: "20px",
          }}
        >
          Let&apos;s build something great.
        </Typography>

        <Typography
          sx={{
            fontSize: 17,
            lineHeight: 1.6,
            color: "#c9c4b4",
            maxWidth: 560,
            m: 0,
            mb: "36px",
          }}
        >
          Open to full-stack engineering roles building and scaling production
          web applications — React/Next.js, distributed APIs, and AWS. Reach out
          below, or grab my resume.
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {contactData.map((data) => (
            <MuiLink
              key={data.title}
              className="reveal"
              href={data.link}
              target={data.link.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener"
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                px: "26px",
                py: "14px",
                backgroundColor: data.accent,
                color: ink,
                border,
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: 15,
                transition:
                  "background-color .2s ease, transform .2s ease, box-shadow .2s ease",
                "&:hover": {
                  backgroundColor: paper,
                  transform: "translateY(-3px)",
                  boxShadow: `4px 4px 0 ${paper}`,
                },
              }}
            >
              <Image
                src={`/icons/${data.path}`}
                alt=""
                width={20}
                height={20}
              />
              {data.title}
            </MuiLink>
          ))}
        </Box>

        <MuiLink
          href="/jackson-schacher-resume.pdf"
          target="_blank"
          rel="noopener"
          underline="none"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            mt: "20px",
            px: "26px",
            py: "14px",
            backgroundColor: "transparent",
            color: paper,
            border: `3px solid ${paper}`,
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: 15,
            transition: "background-color .2s ease, color .2s ease",
            "&:hover": { backgroundColor: paper, color: ink },
          }}
        >
          Download Resume
        </MuiLink>

        <Box
          sx={{
            mt: "56px",
            pt: "20px",
            borderTop: "1px solid #3a3a36",
            fontFamily: mono,
            fontSize: 12,
            color: "#7a776a",
            textAlign: "center",
          }}
        >
          © 2026 Jackson Schacher — Built with Next.js, React, and MUI. All
          rights reserved.
        </Box>
      </Box>
    </Box>
  );
}
