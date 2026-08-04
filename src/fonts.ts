import { Gemunu_Libre, Roboto_Condensed, Space_Mono } from "next/font/google";

export const gemunu = Gemunu_Libre({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const roboto = Roboto_Condensed({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});
