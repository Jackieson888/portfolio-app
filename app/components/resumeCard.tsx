"use client";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, Stack } from "@mui/material";
import LoadingIndicator from "./loading";
import type { ButtonProps } from "@mui/material";

type NavItem = {
  name: string;
  color: ButtonProps["color"];
};

const navItems: Record<string, NavItem> = {
  "/gallery": {
    name: "gallery",
    color: "primary",
  },
  "/contact": {
    name: "contact me",
    color: "secondary",
  },
};

export default function ResumeCard() {
  return (
    <Card sx={{ maxWidth: "sm" }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="Profile Picture"
            src="/profile-pic.png"
            variant="rounded"
            sx={{ width: 85, height: 85 }}
          />
        }
        title={
          <Typography variant="h3" component="div">
            Jackson Schacher
          </Typography>
        }
        subheader={
          <Typography variant="h5" component="div">
            Full-Stack Engineer
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="auto"
        image="/resume-animation.gif"
        alt="Resume Animation GIF"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Full Stack Developer with 5+ years of experience building and
          improving web applications. Proficient in JavaScript, Node.js, REST
          APIs, MongoDB, AWS, and Figma, with a strong track record of shipping
          end-to-end features, integrating third-party services, and improving
          performance. Passionate about creating scalable, user-focused
          solutions with a thoughtful UI/UX approach.
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          sx={{ flexWrap: "wrap", justifyContent: "flex-end" }}
        >
          {Object.entries(navItems).map(([path, { name, color }]) => {
            return (
              <Button
                key={path}
                href={path}
                variant="contained"
                color={color}
                size="large"
              >
                <Typography variant="button" sx={{ color: "black" }}>
                  {name}
                </Typography>{" "}
                <LoadingIndicator />
              </Button>
            );
          })}
        </Stack>
      </CardActions>
    </Card>
  );
}
