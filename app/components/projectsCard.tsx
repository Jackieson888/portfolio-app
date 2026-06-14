"use client";

type ProjectItem = {
  title: string;
  path: string;
  link: string;
  color: "primary" | "secondary" | "warning" | "success" | "error" | "info";
};

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button, Typography, Divider, Stack } from "@mui/material";
import projectsDataJson from "../data/projectsData.json";
import LoadingIndicator from "./loading";

const projectsData = projectsDataJson as ProjectItem[];

export default function ProjectsCard() {
  return (
    <Card sx={{ maxWidth: "sm" }}>
      <CardContent>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          sx={{ flexWrap: "wrap", justifyContent: "space-between" }}
        >
          <Typography gutterBottom variant="h5" component="div">
            Active Projects
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {projectsData.length}
          </Typography>
        </Stack>
        <Divider />
        <Box
          sx={{
            my: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="column"
            useFlexGap
            sx={{ flexWrap: "wrap", width: "100%" }}
          >
            {projectsData.map((data) => {
              return (
                <Button
                  key={data.title}
                  href={data.link}
                  variant="contained"
                  sx={{ width: "100%" }}
                  color={data.color}
                >
                  <Typography variant="button" sx={{ color: "black" }}>
                    {data.title}
                  </Typography>{" "}
                  <LoadingIndicator />
                </Button>
              );
            })}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
