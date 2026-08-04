import { Box, Typography } from "@mui/material";
import { ink, mono, orange, paper } from "@/src/tokens";

type Props = {
  /** Two-digit section numeral, e.g. "01". */
  number: string;
  title: string;
  /** Accent for the numeral — orange on light sections, yellow on dark. */
  accent?: string;
  /** Dark sections flip the rule and heading to cream. */
  dark?: boolean;
};

export default function SectionHeader({
  number,
  title,
  accent = orange,
  dark = false,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "baseline",
        gap: "16px",
        mb: dark ? "36px" : "40px",
      }}
    >
      <Box
        component="span"
        sx={{ fontFamily: mono, fontSize: 15, fontWeight: 700, color: accent }}
      >
        {number}
      </Box>
      <Typography
        variant="h2"
        sx={{
          fontSize: "clamp(28px, 4vw, 42px)",
          m: 0,
          color: dark ? paper : ink,
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          flex: 1,
          height: "3px",
          minWidth: "40px",
          backgroundColor: dark ? paper : ink,
          opacity: dark ? 0.3 : 1,
        }}
      />
    </Box>
  );
}
