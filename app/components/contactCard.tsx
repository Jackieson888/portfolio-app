"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button, Typography, Divider, Stack } from "@mui/material";
import contactData from "../data/contactIconData.json";
import LoadingIndicator from "./loading";

export default function ContactCard() {
  return (
    <Card sx={{ maxWidth: "sm" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Contact Me
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
            direction="column"
            useFlexGap
            sx={{ flexWrap: "wrap" }}
          >
            {contactData.map((data) => {
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
