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
    apple: "/logo/monogram.svg",
  },
  openGraph: {
    title: "Mohamed Design — Logo & Brand Identity Systems",
    description:
      "Sharp, modern identity work built for brands that need clarity, structure, and presence.",
    url: "https://mohameddesign.com",
    siteName: "Mohamed Design",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Design — Logo & Brand Identity Systems",
    description:
      "Sharp, modern identity work built for brands that need clarity, structure, and presence.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Mohamed Design",
  description:
    "Logo and brand identity systems for businesses that need clear, distinctive, and professionally delivered visual assets.",
  url: "https://mohameddesign.com",
  email: "me@mohameddesign.com",
  founder: { "@type": "Person", name: "Mohamed" },
  sameAs: [
    "https://instagram.com/mdesignev",
    "https://behance.net/mdesignev",
  ],
  areaServed: "Worldwide",
  knowsAbout: ["Logo design", "Brand identity", "Brand boards"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
