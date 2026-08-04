import { gemunu } from "@/src/fonts";
import { blue, ink, orange, paper } from "@/src/tokens";

/** Bauhaus "JS" mark — circle + triangle in a rounded square. */
export default function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      style={{ display: "block" }}
      role="img"
      aria-label="Jackson Schacher"
    >
      <rect
        x="1.5"
        y="1.5"
        width="33"
        height="33"
        rx="8"
        fill={paper}
        stroke={ink}
        strokeWidth="3"
      />
      <circle cx="13" cy="13" r="9" fill={blue} stroke={ink} strokeWidth="2" />
      <polygon points="36,36 18,36 36,18" fill={orange} stroke={ink} strokeWidth="2" />
      <text
        x="18"
        y="23"
        fontFamily={gemunu.style.fontFamily}
        fontWeight="700"
        fontSize="13"
        fill={ink}
        textAnchor="middle"
      >
        JS
      </text>
    </svg>
  );
}
