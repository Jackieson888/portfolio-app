"use client";

import { Box, Link as MuiLink, Typography } from "@mui/material";
import LogoMark from "./logoMark";
import { border, gutter, ink, mono, orange, paper } from "@/src/tokens";

const navItems = [
  { href: "#work", label: "Work" },
  { href: "#toolkit", label: "Skills" },
  { href: "#experience", label: "Experience" },
];

export function Navbar() {
  return (
    <Box
      component="nav"
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
          sx={{ fontSize: 20, fontWeight: 700, letterSpacing: "0.5px", color: ink }}
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
        {navItems.map(({ href, label }) => (
          <MuiLink
            key={href}
            href={href}
            underline="none"
            sx={{
              fontFamily: mono,
              fontWeight: 700,
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: ink,
              transition: "color .2s ease",
              "&:hover": { color: orange },
            }}
          >
            {label}
          </MuiLink>
        ))}
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
