import { gemunu, spaceMono } from "./fonts";

/** Bauhaus design tokens — see the redesign handoff's Design Tokens section. */
export const ink = "#1E1E1E";
export const paper = "#EEE6D3";
export const card = "#FFFFFF";
export const orange = "#EA6137";
export const blue = "#5796C1";
export const yellow = "#FFA837";
export const bodyMuted = "#4a483f";
export const bodyStrong = "#33322f";
export const paperShade = "#e2d9c2";

/** Accents cycle orange → blue → yellow across repeated elements. */
export const accents = [orange, blue, yellow];
export const accentAt = (i: number) => accents[i % accents.length];

/** Darkened orange/blue for small text set directly on `paper` — the base
 *  accents read as bright fills but fail WCAG AA (~2.6:1) as text on paper. */
export const orangeText = "#AF3712";
export const blueText = "#326688";

/** Flat offset shadows only — never blurred. */
export const shadow = (n: number) => `${n}px ${n}px 0 ${ink}`;

export const border = `3px solid ${ink}`;
export const borderThin = `2px solid ${ink}`;

export const display = gemunu.style.fontFamily;
export const mono = spaceMono.style.fontFamily;

/** Space Mono uppercase label used for eyebrows and section numerals. */
export const monoLabel = {
  fontFamily: mono,
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
};

/** Horizontal page gutter shared by every section. */
export const gutter = "5vw";
export const maxWidth = 1240;

/** Solid pill button (hero CTA, nav CTA, live-project link). Inverts on hover. */
export const solidButton = (bg: string) => ({
  textTransform: "none" as const,
  fontWeight: 700,
  color: ink,
  backgroundColor: bg,
  border,
  borderRadius: "8px",
  transition: "background-color .2s ease, color .2s ease",
  "&:hover": { backgroundColor: ink, color: paper },
});
