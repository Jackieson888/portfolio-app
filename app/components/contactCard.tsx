"use client";

type ContactItem = {
  title: string;
  path: string;
  link: string;
  color: "primary" | "secondary" | "warning" | "success" | "error" | "info";
};

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button, Typography, Divider, Stack } from "@mui/material";
import contactDataJson from "../data/contactIconData.json";
import LoadingIndicator from "./loading";
import Image from "next/image";

const contactData = contactDataJson as ContactItem[];

export default function ContactCard() {
  return (
    <Card sx={{ maxWidth: "md" }}>
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
            sx={{ flexWrap: "wrap", width: "100%" }}
          >
            {contactData.map((data) => {
              return (
                <Button
                  key={data.title}
                  href={data.link}
                  variant="outlined"
                  sx={{ width: "100%" }}
                  startIcon={
                    <Image
                      src={`/icons/${data.path}`}
                      alt={data.title}
                      width={20}
                      height={20}
                    />
                  }
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
