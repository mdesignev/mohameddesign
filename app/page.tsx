import AboutTeaser from "@/components/AboutTeaser";
import BrandBoards from "@/components/BrandBoards";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LogoArchive from "@/components/LogoArchive";
import SelectedWork from "@/components/SelectedWork";
import Marquee from "@/components/motion/Marquee";
import { getBrandBoards, getLogoMarks, getProjects } from "@/sanity/fetch";

// ISR: rebuild the page at most every 60s so Sanity edits publish without a redeploy.
export const revalidate = 60;

const MARQUEE = [
  "Logo Design",
  "Brand Identity",
  "Brand Boards",
  "Art Direction",
  "Visual Systems",
];

export default async function Home() {
  const [projects, marks, boards] = await Promise.all([
    getProjects(),
    getLogoMarks(),
    getBrandBoards(),
  ]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[210] focus:rounded-sm focus:bg-paper focus:px-4 focus:py-2 focus:text-base"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <section
          aria-label="Services"
          className="border-y border-line bg-surface/40 py-6 md:py-8"
        >
          <Marquee items={MARQUEE} />
        </section>
        <SelectedWork projects={projects} />
        <LogoArchive marks={marks} />
        <AboutTeaser />
        <BrandBoards boards={boards} />
      </main>
      <Footer />
    </>
  );
}
