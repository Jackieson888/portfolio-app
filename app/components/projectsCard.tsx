"use client";

type ProjectItem = {
  title: string;
  logo: string;
  link: string;
  tags: string[];
  description: string;
  color: "primary" | "secondary" | "warning" | "success" | "error" | "info";
};

import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  Box,
  Button,
  Grid,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import projectsDataJson from "../data/projectsData.json";
import LoadingIndicator from "./loading";

const projectsData = projectsDataJson as ProjectItem[];

export default function ProjectsCard() {
  return (
    <Card sx={{ maxWidth: "md" }}>
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
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ mt: 2 }}
        >
          {projectsData.map((data, index) => {
            return (
              <Grid key={index} size={{ xs: 12, sm: 12, md: 6 }}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt={data.title}
                        src={data.logo}
                        aria-label="recipe"
                      ></Avatar>
                    }
                    action={<IconButton aria-label="settings"></IconButton>}
                    title={data.title}
                    subheader={data.tags.join(", ")}
                  />
                  <Box
                    component="iframe"
                    height="700px"
                    src={data.link}
                    title={data.title}
                    sx={{ width: "100%", border: "none" }}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {data.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
    //     <Box
    //       sx={{
    //         my: 2,
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "center",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Stack
    //         spacing={{ xs: 1, sm: 2 }}
    //         direction="column"
    //         useFlexGap
    //         sx={{ flexWrap: "wrap", width: "100%" }}
    //       >
    //         {projectsData.map((data) => {
    //           return (
    //             <Button
    //               key={data.title}
    //               href={data.link}
    //               variant="contained"
    //               sx={{ width: "100%" }}
    //               color={data.color}
    //             >
    //               <Typography variant="button" sx={{ color: "black" }}>
    //                 {data.title}
    //               </Typography>{" "}
    //               <LoadingIndicator />
    //             </Button>
    //           );
    //         })}
    //       </Stack>
    //     </Box>
    //   </CardContent>
    // </Card>
  );
}
