"use client";

import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import type { ButtonProps } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";

type NavItem = {
  name: string;
  color: ButtonProps["color"];
};

const titles = ["Full-Stack Engineer", "Web App Developer", "UI/UX Designer"];
const colors = ["#EA6137", "#5796C1", "#FFA837"];

export default function ProfileCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 5000); // flip every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="md">
      <Image
        src="/profile-pic-masked.png"
        alt="Profile Picture"
        width={500}
        height={500}
        style={{
          position: "relative",
          zIndex: 101,
          width: "60%",
          marginLeft: "38%",
        }}
      />
      <Card
        sx={{
          position: "relative",
          zIndex: 100,
          marginTop: "-300px",
          minHeight: "20em",
        }}
      >
        <CardHeader
          sx={{ paddingBottom: 0 }}
          title={
            <Typography variant="h4" component="div">
              Howdy, <br />
              I&apos;m Jackson Schacher
            </Typography>
          }
          subheader={
            <Box
              sx={{
                perspective: "1000px",
                height: "40px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Paper
                key={index}
                elevation={3}
                sx={{
                  display: "inline-block",
                  transformStyle: "preserve-3d",
                  animation: "flip 0.7s ease-in-out",
                  padding: "8px 16px",
                  background: colors[index],
                }}
              >
                <Typography variant="h5">{titles[index]}</Typography>
              </Paper>

              <style>
                {`
          @keyframes flip {
            0% {
              transform: rotateX(90deg);
              opacity: 0;
            }
            40% {
              transform: rotateX(20deg);
              opacity: 1;
            }
            100% {
              transform: rotateX(0deg);
              opacity: 1;
            }
          }
        `}
              </style>
            </Box>
          }
        />
        <CardContent
          sx={{
            width: "52%",
          }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Full‑stack developer with 6+ years of experience across front‑end,
            back‑end, cloud, and AI‑driven application development. Proficient
            in TypeScript, Node.js, REST APIs, SQL/NoSQL, and AWS, with proven
            strengths in UI/UX, architecture, integrations, and intelligent
            automation.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
