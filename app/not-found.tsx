import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main"
        className="container-site relative flex min-h-[70svh] flex-col justify-center overflow-hidden py-24"
      >
        <span
          aria-hidden="true"
          className="glow left-1/3 top-1/4 h-[30vw] w-[30vw] max-h-[360px] max-w-[360px] opacity-[0.12]"
        />
        <p className="meta-label relative z-10 flex items-center gap-2.5 text-accent-soft">
          <span aria-hidden="true" className="h-2 w-2 bg-accent" />
          Error 404
        </p>
        <h1 className="relative z-10 mt-6 font-display text-[clamp(2.75rem,8vw,6rem)] font-medium leading-[0.98] tracking-[-0.03em] text-paper">
          Page not found.
        </h1>
        <p className="relative z-10 mt-6 max-w-[44ch] text-lg leading-relaxed text-stone">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <a href="/" data-cursor className="btn btn-solid relative z-10 mt-10 self-start">
          Back home
        </a>
      </main>
      <Footer />
    </>
  );
}
