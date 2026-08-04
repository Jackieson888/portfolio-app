"use client";

import { Box, Typography } from "@mui/material";
import featuresDataJson from "../data/featuresData.json";
import SectionHeader from "./sectionHeader";
import {
  accentAt,
  bodyMuted,
  border,
  borderThin,
  card,
  gutter,
  maxWidth,
  mono,
  paper,
  shadow,
} from "@/src/tokens";

type FeatureItem = {
  title: string;
  experience: string;
  description: string;
};

const featuresData = featuresDataJson as FeatureItem[];

export default function FeaturesCard() {
  return (
    <Box
      component="section"
      id="expertise"
      sx={{ maxWidth, mx: "auto", px: gutter, pt: "40px", pb: "96px" }}
    >
      <SectionHeader number="01" title="Core Expertise" />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {featuresData.map((data, index) => (
          <Box
            key={data.title}
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
                <Typography variant="h3" sx={{ fontSize: 22, fontWeight: 600, m: 0 }}>
                  {data.title}
                </Typography>
                <Box
                  component="span"
                  sx={{
                    fontFamily: mono,
                    fontSize: 12,
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
                sx={{ fontSize: 14.5, lineHeight: 1.55, color: bodyMuted, m: 0 }}
              >
                {data.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
