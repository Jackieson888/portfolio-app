"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Chip, Typography, Divider, Stack } from "@mui/material";
import iconData from "../data/skillIconData.json";

export default function SkillsCard() {
  return (
    <Card sx={{ maxWidth: "sm" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Skills
        </Typography>
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
            direction="row"
            useFlexGap
            sx={{ flexWrap: "wrap" }}
          >
            {iconData.map((data) => {
              return (
                <Chip key={data.title} label={data.title} color="warning" />
              );
            })}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
