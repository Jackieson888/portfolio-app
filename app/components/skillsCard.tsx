"use client";

import {
  Card,
  CardContent,
  Box,
  Chip,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import iconData from "../data/skillIconData.json";
import Image from "next/image";

export default function SkillsCard() {
  return (
    <Card sx={{ maxWidth: "md" }}>
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
                <Chip
                  key={data.title}
                  label={data.title}
                  color="warning"
                  icon={
                    <Image
                      src={`icons/${data.path}`}
                      alt={data.title}
                      width={24}
                      height={24}
                    />
                  }
                />
              );
            })}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
