/**
 * Site mark, drawn inline from public/icons/portfolio-app-icon.svg (the same artwork as
 * app/icon.svg, the favicon). Keep the two in sync if the icon changes.
 */
export default function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      style={{ display: "block", borderRadius: size * 0.14 }}
      role="img"
      aria-label="Jackson Schacher"
    >
      <rect width="64" height="64" fill="#1E1E1E" />
      <path d="M0 0H16A16 16 0 0 1 0 16Z" fill="#FFA837" />
      <rect x="48" y="56" width="16" height="8" fill="#5796C1" />
      <g fill="none" strokeWidth="8" strokeLinecap="butt" strokeLinejoin="miter">
        <path d="M24 12V40A8 8 0 0 1 8 40" stroke="#EEE6D3" />
        <path d="M60 16H48A8 8 0 0 0 48 32A8 8 0 0 1 48 48H36" stroke="#EA6137" />
      </g>
    </svg>
  );
}
