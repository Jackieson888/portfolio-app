"use client";

type DownloadItem = {
  title: string;
  path: string;
  link: string;
  color: "primary" | "secondary" | "warning" | "success" | "error" | "info";
};
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Box,
  Button,
  Typography,
  Divider,
  Stack,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import downloadDataJson from "../data/downloadData.json";
import LoadingIndicator from "./loading";

const downloadData = downloadDataJson as DownloadItem[];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DownloadCard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Card sx={{ maxWidth: "md" }}>
      <CardContent>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Education" {...a11yProps(0)} />
              <Tab label="Work Experience" {...a11yProps(1)} />
              <Tab label="Resume Download" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              <ListItem alignItems="center">
                <ListItemAvatar sx={{ marginTop: 0, marginRight: 2 }}>
                  <Avatar
                    alt="Boise CodeWorks Logo"
                    src="/icons/cw-logo.png"
                    slotProps={{
                      img: {
                        sx: {
                          objectFit: "contain",
                        },
                      },
                    }}
                    sx={{
                      width: 85,
                      height: 85,
                      padding: "8px",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Full-Stack Development Certificate"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        Boise CodeWorks
                      </Typography>
                      {" — 2021"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="center">
                <ListItemAvatar sx={{ marginTop: 0, marginRight: 2 }}>
                  <Avatar
                    alt="University of Idaho Logo"
                    src="/icons/ui-logo.png"
                    slotProps={{
                      img: {
                        sx: {
                          objectFit: "contain",
                        },
                      },
                    }}
                    sx={{
                      width: 85,
                      height: 85,
                      padding: "8px",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Bachelor of Science in Virtual Technology and Design"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        University of Idaho
                      </Typography>
                      {" — 2020"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="center">
                <ListItemAvatar sx={{ marginTop: 0, marginRight: 2 }}>
                  <Avatar
                    alt="IxDF Logo"
                    src="/icons/ixdf-logo.png"
                    slotProps={{
                      img: {
                        sx: {
                          objectFit: "contain",
                        },
                      },
                    }}
                    sx={{
                      width: 85,
                      height: 85,
                      padding: "8px",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Human Centered Design Certificate"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        IxDF (Interaction Design Foundation)
                      </Typography>
                      {" — 2024"}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              <ListItem alignItems="center">
                <ListItemAvatar sx={{ marginTop: 0, marginRight: 2 }}>
                  <Avatar
                    alt="Sekady Capital Logo"
                    src="/icons/sekady-logo.png"
                    slotProps={{
                      img: {
                        sx: {
                          objectFit: "contain",
                        },
                      },
                    }}
                    sx={{
                      width: 85,
                      height: 85,
                      padding: "8px",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Full-Stack Engineer"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        Sekady Capital LLC
                      </Typography>
                      <br />
                      {"2021 — 2026"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="center">
                <ListItemAvatar sx={{ marginTop: 0, marginRight: 2 }}>
                  <Avatar
                    alt="Consumer Direct Care Network Logo"
                    src="/icons/cdid-logo.png"
                    slotProps={{
                      img: {
                        sx: {
                          objectFit: "contain",
                        },
                      },
                    }}
                    sx={{
                      width: 85,
                      height: 85,
                      padding: "8px",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Behavior Support Specialist"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        Developmental Concepts | Consumer Direct Care Network
                        Idaho
                      </Typography>
                      <br />
                      {"2014 — 2020"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="center">
                <ListItemAvatar sx={{ marginTop: 0, marginRight: 2 }}>
                  <Avatar
                    alt="Galexis Logo"
                    src="/icons/galexis-logo.png"
                    slotProps={{
                      img: {
                        sx: {
                          objectFit: "contain",
                        },
                      },
                    }}
                    sx={{
                      width: 85,
                      height: 85,
                      padding: "8px",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Technical Support Analyst"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        Galexis Technologies
                      </Typography>
                      {"2013 — 2014"}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
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
                {downloadData.map((data) => {
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
          </CustomTabPanel>
        </Box>
      </CardContent>
    </Card>
  );
}
