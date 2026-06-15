"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  ImageList,
  ImageListItem,
} from "@mui/material";

type File = {
  url: string;
  key: string;
  type: string;
};

const IMG_GRID_RATIOS = [
  { cols: 4, rows: 3, ratio: 4 / 3 },
  { cols: 3, rows: 2, ratio: 3 / 2 },
  { cols: 2, rows: 1, ratio: 2 / 1 },
  { cols: 1, rows: 1, ratio: 1 / 1 },
  { cols: 3, rows: 4, ratio: 3 / 4 },
  { cols: 2, rows: 3, ratio: 2 / 3 },
  { cols: 1, rows: 2, ratio: 1 / 2 },
];

function MediaItem({ file }: { file: File }) {
  const isVideo = file.type === "mp4";
  const ratio = useAspectRatio(file.url, file.type);

  if (isVideo) return;
  return (
    <ImageListItem key={file.key} cols={ratio.cols || 1} rows={ratio.rows || 1}>
      <img
        {...srcset(file.url, 100, ratio.rows, ratio.cols)}
        alt={file.key}
        loading="lazy"
      />
    </ImageListItem>
  );
}

function getClosestRatio(ratio: number) {
  let closest = IMG_GRID_RATIOS[0];
  let smallestDiff = Math.abs(ratio - closest.ratio);

  for (const r of IMG_GRID_RATIOS) {
    const diff = Math.abs(ratio - r.ratio);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closest = r;
    }
  }

  return closest;
}

function useAspectRatio(url: string, type: string) {
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    if (type === "mp4") return;

    const img = new window.Image();
    img.src = url;
    img.onload = () => {
      setRatio(img.width / img.height);
    };
  }, [url, type]);

  return getClosestRatio(ratio);
}

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function GalleryCard() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFiles() {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setFiles(Array.isArray(data.objects) ? data.objects : []);
      setLoading(false);
    }
    fetchFiles();
  }, []);

  return (
    <Card sx={{ maxWidth: "sm" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Gallery
        </Typography>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading && <p>Loading...</p>}
          <ImageList
            sx={{ width: "100%", height: "40em", marginBlockEnd: 0 }}
            variant="quilted"
            cols={4}
            rowHeight="auto"
          >
            {files.map((item) => (
              <MediaItem key={item.key} file={item} />
            ))}
          </ImageList>
        </Box>
      </CardContent>
    </Card>
  );
}
