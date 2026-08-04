"use client";

import { useEffect, useState } from "react";
import { Box, Link as MuiLink, Typography } from "@mui/material";
import LogoMark from "./logoMark";
import { border, gutter, ink, mono, orange, paper } from "@/src/tokens";

const navItems = [
  { href: "#toolkit", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
];

/** Highlights the section currently under the nav. Purely additive — without
 *  JS the links simply render in their default state. */
function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = navItems
      .map(({ href }) => document.getElementById(href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // Track the full intersecting set across callbacks: each callback only
    // reports sections whose state changed, so filtering `entries` alone would
    // both miss still-visible sections and leave a stale highlight in the hero.
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const topmost = sections.find((section) => visible.has(section.id));
        setActive(topmost ? `#${topmost.id}` : "");
      },
      // Band just below the nav, so "active" tracks what you're actually reading.
      { rootMargin: "-72px 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Navbar() {
  const active = useActiveSection();

  return (
    <Box
      component="nav"
      aria-label="Main"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: paper,
        borderBottom: border,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        px: gutter,
        py: "14px",
        flexWrap: "wrap",
      }}
    >
      <MuiLink
        href="#top"
        underline="none"
        sx={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <LogoMark />
        <Typography
          variant="h6"
          component="span"
          sx={{
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "0.5px",
            color: ink,
          }}
        >
          Jackson Schacher
        </Typography>
      </MuiLink>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "22px",
          flexWrap: "wrap",
        }}
      >
        {navItems.map(({ href, label }) => {
          const isActive = active === href;
          return (
            <MuiLink
              key={href}
              href={href}
              underline="none"
              aria-current={isActive ? "true" : undefined}
              sx={{
                position: "relative",
                fontFamily: mono,
                fontWeight: 700,
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: ink,
                transition: "color .2s ease",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: "-6px",
                  height: "3px",
                  width: "100%",
                  backgroundColor: orange,
                  transformOrigin: "left center",
                  transform: isActive ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform .25s ease",
                },
                "&:hover": { color: orange },
                "&:hover::after": { transform: "scaleX(1)" },
              }}
            >
              {label}
            </MuiLink>
          );
        })}
        <MuiLink
          href="#contact"
          underline="none"
          sx={{
            fontFamily: mono,
            fontWeight: 700,
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "1px",
            px: "18px",
            py: "9px",
            backgroundColor: orange,
            color: ink,
            border,
            borderRadius: "8px",
            transition: "background-color .2s ease, color .2s ease",
            "&:hover": { backgroundColor: ink, color: paper },
          }}
        >
          Let&apos;s Talk
        </MuiLink>
      </Box>
    </Box>
  );
}

export default Navbar;
