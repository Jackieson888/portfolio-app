"use client";

import { Grid, Paper, Typography, Card, CardContent } from "@mui/material";
import featuresDataJson from "../data/featuresData.json";

type FeatureItem = {
  title: string;
  experience: string;
  description: string;
};

const featuresData = featuresDataJson as FeatureItem[];

export default function FeaturesCard() {
  return (
    <Card sx={{ maxWidth: "md" }}>
      <CardContent>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {featuresData.map((data, index) => {
            return (
              <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                <Paper elevation={0} sx={{ p: 2 }}>
                  <Typography variant="h5" component="div" color="primary">
                    {data.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    component="div"
                    color="secondary"
                  >
                    {data.experience}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {data.description}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}
