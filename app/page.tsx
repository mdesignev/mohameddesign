import AboutTeaser from "@/components/AboutTeaser";
import BrandBoards from "@/components/BrandBoards";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LogoArchive from "@/components/LogoArchive";
import SelectedWork from "@/components/SelectedWork";

// ISR: rebuild the page at most every 60s so Sanity edits publish without a redeploy.
export const revalidate = 60;

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <SelectedWork />
        <LogoArchive />
        <AboutTeaser />
        <BrandBoards />
      </main>
      <Footer />
    </>
  );
}
