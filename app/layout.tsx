import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohameddesign.com"),
  title: "Mohamed Design — Logo & Brand Identity Systems",
  description:
    "Sharp, modern identity work built for brands that need clarity, structure, and presence. Logos, brand identity systems, and brand boards — delivered as production-ready files.",
  icons: {
    icon: "/logo/monogram.svg",
  },
  openGraph: {
    title: "Mohamed Design — Logo & Brand Identity Systems",
    description:
      "Sharp, modern identity work built for brands that need clarity, structure, and presence.",
    url: "https://mohameddesign.com",
    siteName: "Mohamed Design",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
