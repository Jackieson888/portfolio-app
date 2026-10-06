"use client";

import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import OpenInFullRounded from "@mui/icons-material/OpenInFullRounded";
import { bodyMuted, borderThin, ink, mono, paper, shadow } from "@/src/tokens";

export type GalleryMedia = {
  type: "image" | "video";
  src: string;
  /** Required for video: shown before playback, as the thumbnail, and for reduced motion. */
  poster?: string;
  /** Real pixel dimensions; the stage takes its aspect ratio from the first item. */
  width: number;
  height: number;
  /** One short line, shown under the stage and used as alt text. */
  caption: string;
};

function mimeType(src: string) {
  return src.endsWith(".webm") ? "video/webm" : "video/mp4";
}

/**
 * Plays a muted loop only while the stage is on screen, so a page of three projects never
 * decodes three videos at once. Users with reduced motion get the poster plus native controls.
 */
function StageVideo({ media }: { media: GalleryMedia }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, media.src]);

  return (
    <video
      key={media.src}
      ref={ref}
      muted
      loop
      playsInline
      controls={reduced}
      preload="metadata"
      poster={media.poster}
      aria-label={media.caption}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
    >
      <source src={media.src} type={mimeType(media.src)} />
    </video>
  );
}

/**
 * Large media stage plus a thumbnail strip. Media is the first thing a reviewer sees on each
 * case study, so it gets most of the row; thumbnails swap the stage instead of each clip
 * competing for space at postage-stamp size.
 */
export default function ProjectGallery({
  media,
  accent,
  title,
}: {
  media: GalleryMedia[];
  accent: string;
  title: string;
}) {
  const [index, setIndex] = useState(0);
  if (media.length === 0) return null;

  const current = media[Math.min(index, media.length - 1)];
  const stageAspect = `${media[0].width} / ${media[0].height}`;
  const counter = (n: number) => String(n).padStart(2, "0");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: 0 }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: stageAspect,
          maxHeight: { xs: "70vh", md: 620 },
          backgroundColor: ink,
          border: borderThin,
          borderRadius: "4px",
          overflow: "hidden",
          boxShadow: shadow(6),
        }}
      >
        {current.type === "video" ? (
          <StageVideo media={current} />
        ) : (
          <Image
            key={current.src}
            src={current.src}
            alt={current.caption}
            fill
            sizes="(min-width: 1000px) 720px, 100vw"
            style={{ objectFit: "contain" }}
            priority={false}
          />
        )}
        {current.type === "image" ? (
          <Box
            component="a"
            href={current.src}
            target="_blank"
            rel="noopener"
            aria-label={`Open full size: ${current.caption}`}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: paper,
              border: borderThin,
              borderRadius: "6px",
              color: ink,
              opacity: 0.85,
              transition: "opacity .2s ease, background-color .2s ease",
              "&:hover, &:focus-visible": { opacity: 1, backgroundColor: accent },
            }}
          >
            <OpenInFullRounded sx={{ fontSize: 16 }} />
          </Box>
        ) : null}
      </Box>

      <Box
        aria-live="polite"
        sx={{ display: "flex", gap: "10px", alignItems: "baseline", minHeight: 40 }}
      >
        <Box
          component="span"
          sx={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: "1px", flexShrink: 0 }}
        >
          {counter(index + 1)} / {counter(media.length)}
        </Box>
        <Box component="span" sx={{ fontSize: 14, lineHeight: 1.45, color: bodyMuted }}>
          {current.caption}
        </Box>
      </Box>

      {media.length > 1 ? (
        <Box
          role="group"
          aria-label={`${title} screenshots and clips`}
          sx={{ display: "grid", gridTemplateColumns: `repeat(${media.length}, 1fr)`, gap: "10px" }}
        >
          {media.map((item, i) => {
            const selected = i === index;
            const thumb = item.type === "video" ? (item.poster ?? "") : item.src;
            return (
              <Box
                key={item.src}
                component="button"
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={selected}
                aria-label={`Show ${item.type === "video" ? "clip" : "image"} ${i + 1}: ${item.caption}`}
                sx={{
                  position: "relative",
                  aspectRatio: "16 / 10",
                  p: 0,
                  cursor: "pointer",
                  overflow: "hidden",
                  borderRadius: "4px",
                  border: borderThin,
                  backgroundColor: ink,
                  outline: selected ? `3px solid ${accent}` : "none",
                  outlineOffset: "2px",
                  opacity: selected ? 1 : 0.72,
                  transition: "opacity .2s ease, transform .2s ease",
                  "&:hover": { opacity: 1, transform: "translateY(-2px)" },
                }}
              >
                {thumb ? (
                  <Image src={thumb} alt="" fill sizes="160px" style={{ objectFit: "cover", objectPosition: "top" }} />
                ) : null}
                {item.type === "video" ? (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "6px",
                      right: "6px",
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.9)",
                      border: `1.5px solid ${ink}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PlayArrowRounded sx={{ color: ink, fontSize: 13 }} />
                  </Box>
                ) : null}
              </Box>
            );
          })}
        </Box>
      ) : null}
    </Box>
  );
}
