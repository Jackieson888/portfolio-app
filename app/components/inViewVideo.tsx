"use client";

import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import { ink } from "@/src/tokens";

type Props = {
  src: string;
  poster: string;
  alt: string;
  /** Hide the built-in corner play dot when the caller supplies its own badge. */
  showIndicator?: boolean;
};

/** Derives the <source> MIME type from the file extension — clips get shot/exported as mp4 or webm. */
function mimeType(src: string) {
  return src.endsWith(".webm") ? "video/webm" : "video/mp4";
}

/**
 * Shared media slot for the hero + breakdown thumbnails: a static poster at rest that plays a
 * muted loop on hover/focus for hover-capable pointers, or plays with native controls on tap for
 * touch devices — same interaction across all four media slots on a project card.
 */
export function HoverPlayVideo({ src, poster, alt, showIndicator = true }: Props) {
  const [canHover] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );
  const [active, setActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !canHover) return;
    if (active) el.play().catch(() => {});
    else el.currentTime = 0;
  }, [active, canHover]);

  if (canHover) {
    return (
      <Box
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        tabIndex={0}
        aria-label={alt}
        sx={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {active ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            autoPlay
            aria-label={alt}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src={src} type={mimeType(src)} />
          </video>
        ) : (
          <Box
            component="img"
            src={poster}
            alt={alt}
            sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
        {showIndicator ? <PlayDot /> : null}
      </Box>
    );
  }

  if (active) {
    return (
      <video
        autoPlay
        controls
        playsInline
        poster={poster}
        aria-label={alt}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src={src} type={mimeType(src)} />
      </video>
    );
  }

  return (
    <Box
      component="button"
      onClick={() => setActive(true)}
      aria-label={`Play: ${alt}`}
      sx={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        p: 0,
        border: "none",
        cursor: "pointer",
        backgroundImage: `url(${poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {showIndicator ? <PlayDot /> : null}
    </Box>
  );
}

/** Small always-visible play-indicator dot, bottom-right corner of a media slot. */
function PlayDot() {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "8px",
        right: "8px",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "rgba(255,255,255,0.85)",
        border: `1.5px solid ${ink}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <PlayArrowRounded sx={{ color: ink, fontSize: 13 }} />
    </Box>
  );
}
