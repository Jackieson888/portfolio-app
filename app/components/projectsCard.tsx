"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button, Typography, Divider, Stack } from "@mui/material";
import projectsData from "../data/projectsData.json";
import LoadingIndicator from "./loading";

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
            sx={{ flexWrap: "wrap" }}
          >
            {projectsData.map((data) => {
              return (
                <Button
                  key={data.title}
                  href={data.link}
                  variant="outlined"
                  color={data.color}
                >
                  {data.title} <LoadingIndicator />
                </Button>
              );
            })}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
