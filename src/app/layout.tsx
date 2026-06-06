import type { Metadata } from "next";
import {
  Inter,
  Orbitron,
  Space_Grotesk,
  Sora,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "700", "900"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "700", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "700"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "TECHFEST'26 — 30 Years of Human Imagination",
  description:
    "Three decades of innovation converge into one emerging intelligence. Asia's largest science and technology festival returns for its 30th edition.",
  keywords: [
    "TECHFEST",
    "IIT Bombay",
    "Tech Festival",
    "Innovation",
    "AI",
    "Robotics",
    "Hackathon",
  ],
  openGraph: {
    title: "TECHFEST'26 — One Emerging Intelligence",
    description:
      "30 Years of Human Imagination. One Emerging Intelligence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} ${spaceGrotesk.variable} ${sora.variable}`}
    >
      <body className="font-inter antialiased">{children}</body>
    </html>
  );
}
