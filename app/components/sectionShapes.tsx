import { Box } from "@mui/material";
import { ink } from "@/src/tokens";

export type Shape = {
  kind: "circle" | "square" | "triangle" | "ring";
  size: number;
  color: string;
  opacity: number;
  /** One of the drift keyframes in globals.css. */
  drift: "driftA" | "driftB" | "driftC" | "driftD";
  duration: number;
  delay?: number;
  /** CSS offsets — give exactly the two you need (e.g. top + right). */
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  /** Outline weight for ring/geometry; omit for a borderless blob. */
  outline?: boolean;
};

function shapeStyles(shape: Shape) {
  const outline = shape.outline === false ? undefined : `3px solid ${ink}`;

  switch (shape.kind) {
    case "circle":
      return {
        width: shape.size,
        height: shape.size,
        borderRadius: "50%",
        backgroundColor: shape.color,
        border: outline,
      };
    case "ring":
      return {
        width: shape.size,
        height: shape.size,
        borderRadius: "50%",
        border: `3px solid ${shape.color}`,
      };
    case "square":
      return {
        width: shape.size,
        height: shape.size,
        borderRadius: "10px",
        backgroundColor: shape.color,
        border: outline,
      };
    case "triangle":
      // Border trick — width/height stay 0, so `size` drives the silhouette.
      return {
        width: 0,
        height: 0,
        borderLeft: `${shape.size / 2}px solid transparent`,
        borderRight: `${shape.size / 2}px solid transparent`,
        borderBottom: `${shape.size * 0.85}px solid ${shape.color}`,
      };
  }
}

/**
 * Decorative drifting shapes for a section background.
 *
 * Renders into an inset, clipped, non-interactive layer so shapes can sit near
 * section edges without ever creating horizontal scroll or swallowing clicks.
 * The parent section must be `position: relative`, and its content should sit
 * in a `position: relative; zIndex: 1` wrapper to paint above this layer.
 */
export default function SectionShapes({ shapes }: { shapes: Shape[] }) {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {shapes.map((shape, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            top: shape.top,
            bottom: shape.bottom,
            left: shape.left,
            right: shape.right,
            opacity: shape.opacity,
            animation: `${shape.drift} ${shape.duration}s ease-in-out infinite`,
            animationDelay: `${shape.delay ?? 0}s`,
            ...shapeStyles(shape),
          }}
        />
      ))}
    </Box>
  );
}
