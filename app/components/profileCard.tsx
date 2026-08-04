"use client";

import { Box, Link as MuiLink, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  blue,
  bodyStrong,
  border,
  display,
  gutter,
  ink,
  maxWidth,
  mono,
  orange,
  paper,
  shadow,
  yellow,
} from "@/src/tokens";

const roles = [
  { title: "Full-Stack Engineer", color: orange },
  { title: "Web App Developer", color: blue },
  { title: "UI/UX Designer", color: yellow },
];

const stats = [
  { value: "6+", label: "Years Experience", color: orange },
  { value: "3", label: "Certifications", color: blue },
  { value: "3+", label: "Shipped Projects", color: yellow },
];

export default function ProfileCard() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const role = roles[roleIndex];

  return (
    <Box
      component="section"
      id="top"
      sx={{
        position: "relative",
        maxWidth,
        mx: "auto",
        px: gutter,
        pt: "72px",
        pb: "96px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        gap: "48px",
        alignItems: "center",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: "60px",
          right: "8vw",
          width: 120,
          height: 120,
          borderRadius: "50%",
          border,
          backgroundColor: blue,
          opacity: 0.18,
          animation: "slowSpin 40s linear infinite",
          zIndex: 0,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          bottom: "20px",
          left: "2vw",
          width: 0,
          height: 0,
          borderLeft: "60px solid transparent",
          borderRight: "60px solid transparent",
          borderBottom: `100px solid ${yellow}`,
          opacity: 0.15,
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            fontFamily: mono,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: blue,
            mb: "18px",
          }}
        >
          Software Engineer — Web Developer — UI/UX Designer
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontSize: "clamp(40px, 6vw, 68px)",
            lineHeight: 1.02,
            letterSpacing: "0.5px",
            m: 0,
            mb: "20px",
          }}
        >
          Howdy, I&apos;m
          <br />
          Jackson Schacher
        </Typography>

        <Box sx={{ height: 44, mb: "22px" }}>
          <Box
            aria-live="polite"
            sx={{
              display: "inline-block",
              px: "20px",
              py: "8px",
              border,
              borderRadius: "8px",
              fontFamily: display,
              fontWeight: 600,
              fontSize: 20,
              backgroundColor: role.color,
              transition: "background-color 0.4s ease",
            }}
          >
            {role.title}
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: 18,
            lineHeight: 1.6,
            maxWidth: 520,
            color: bodyStrong,
            m: 0,
            mb: "32px",
          }}
        >
          Full-stack developer with 6+ years of experience across front-end,
          back-end, cloud, and AI-driven application development. Proficient in
          TypeScript, Node.js, REST APIs, SQL/NoSQL, and AWS, with proven
          strengths in UI/UX, architecture, integrations, and intelligent
          automation.
        </Typography>

        <Box sx={{ display: "flex", gap: "16px", flexWrap: "wrap", mb: "44px" }}>
          <MuiLink
            href="#contact"
            underline="none"
            sx={{
              px: "34px",
              py: "16px",
              backgroundColor: orange,
              color: ink,
              border,
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: 17,
              boxShadow: shadow(6),
              transition:
                "background-color .2s ease, color .2s ease, box-shadow .2s ease, transform .2s ease",
              "&:hover": {
                backgroundColor: ink,
                color: paper,
                boxShadow: shadow(3),
                transform: "translate(3px, 3px)",
              },
            }}
          >
            Get In Touch
          </MuiLink>
          <MuiLink
            href="#work"
            underline="none"
            sx={{
              px: "28px",
              py: "14px",
              backgroundColor: "transparent",
              color: ink,
              border,
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: 16,
              transition: "background-color .2s ease, color .2s ease",
              "&:hover": { backgroundColor: ink, color: paper },
            }}
          >
            View My Work
          </MuiLink>
        </Box>

        <Box sx={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          {stats.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                backgroundColor: stat.color,
                border,
                borderRadius: "8px",
                px: "20px",
                py: "14px",
                minWidth: 120,
              }}
            >
              <Box
                sx={{
                  fontFamily: mono,
                  fontWeight: 700,
                  fontSize: 26,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </Box>
              <Box
                sx={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  mt: "4px",
                }}
              >
                {stat.label}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ position: "relative", width: "min(100%, 420px)" }}>
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              top: "-24px",
              left: "-24px",
              width: "70%",
              height: "70%",
              borderRadius: "50%",
              backgroundColor: blue,
              border,
              zIndex: 0,
            }}
          />
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              bottom: "-20px",
              right: "-20px",
              width: 130,
              height: 130,
              backgroundColor: yellow,
              border,
              borderRadius: "10px",
              zIndex: 0,
              animation: "floatY 6s ease-in-out infinite",
            }}
          />
          {/* Transparent-background cutout — intentionally no opaque backing. */}
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              border,
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: shadow(10),
              lineHeight: 0,
            }}
          >
            <Image
              src="/profile-pic-masked.png"
              alt="Jackson Schacher"
              width={500}
              height={500}
              priority
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
