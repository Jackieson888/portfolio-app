"use client";

import { Box, Typography } from "@mui/material";
import featuresDataJson from "../data/featuresData.json";
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
  maxWidth,
  mono,
  orange,
  paper,
  shadow,
  yellow,
} from "@/src/tokens";

type FeatureItem = {
  title: string;
  experience: string;
  description: string;
};

const featuresData = featuresDataJson as FeatureItem[];

const shapes: Shape[] = [
  {
    kind: "circle",
    size: 150,
    color: blue,
    opacity: 0.17,
    drift: "driftA",
    duration: 26,
    top: "6%",
    right: "-40px",
  },
  {
    kind: "square",
    size: 110,
    color: orange,
    opacity: 0.16,
    drift: "driftB",
    duration: 31,
    delay: -8,
    bottom: "12%",
    left: "-30px",
  },
  {
    kind: "triangle",
    size: 130,
    color: yellow,
    opacity: 0.18,
    drift: "driftC",
    duration: 34,
    delay: -14,
    bottom: "2%",
    right: "12%",
  },
];

export default function FeaturesCard() {
  return (
    <Box
      component="section"
      id="expertise"
      sx={{
        position: "relative",
        mx: "auto",
        px: gutter,
        pt: "40px",
        pb: "96px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SectionShapes shapes={shapes} />

      <Box sx={{ position: "relative", zIndex: 1, maxWidth }}>
        <SectionHeader number="01" title="Core Expertise" />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {featuresData.map((data, index) => (
            <Box
              key={data.title}
              className="reveal"
              sx={{
                backgroundColor: card,
                border,
                borderRadius: "10px",
                overflow: "hidden",
                transition: "transform .2s ease, box-shadow .2s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: shadow(8),
                },
              }}
            >
              <Box sx={{ height: "10px", backgroundColor: accentAt(index) }} />
              <Box sx={{ p: "22px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px",
                    mb: "10px",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{ fontSize: 22, fontWeight: 600, m: 0 }}
                  >
                    {data.title}
                  </Typography>
                  <Box
                    component="span"
                    sx={{
                      fontFamily: mono,
                      fontSize: 14,
                      backgroundColor: paper,
                      border: borderThin,
                      borderRadius: "6px",
                      px: "8px",
                      py: "3px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.experience}
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontSize: 16,
                    lineHeight: 1.55,
                    color: bodyMuted,
                    m: 0,
                  }}
                >
                  {data.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
