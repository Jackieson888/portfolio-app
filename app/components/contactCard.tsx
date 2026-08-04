"use client";

import { Box, Link as MuiLink, Typography } from "@mui/material";
import Image from "next/image";
import contactDataJson from "../data/contactIconData.json";
import { border, gutter, ink, mono, paper, yellow } from "@/src/tokens";

type ContactItem = {
  title: string;
  path: string;
  link: string;
  accent: string;
};

const contactData = contactDataJson as ContactItem[];

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
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: `3px solid ${paper}`,
          opacity: 0.15,
        }}
      />

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
          Open to full-stack engineering, web development, and UI/UX roles. Reach
          out below — I&apos;d love to talk about how I can help your team ship.
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {contactData.map((data) => (
            <MuiLink
              key={data.title}
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
                transition: "background-color .2s ease",
                "&:hover": { backgroundColor: paper },
              }}
            >
              <Image src={`/icons/${data.path}`} alt="" width={20} height={20} />
              {data.title}
            </MuiLink>
          ))}
        </Box>

        <Box
          sx={{
            mt: "56px",
            pt: "20px",
            borderTop: "1px solid #3a3a36",
            fontFamily: mono,
            fontSize: 12,
            color: "#7a776a",
          }}
        >
          © 2026 Jackson Schacher — Built with Bauhaus in mind.
        </Box>
      </Box>
    </Box>
  );
}
