import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main"
        className="container-site flex min-h-[60svh] flex-col justify-center py-24"
      >
        <p className="meta-label flex items-center gap-2.5 text-ink">
          <span aria-hidden="true" className="h-2 w-2 bg-accent" />
          Error 404
        </p>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.02em]">
          Page not found.
        </h1>
        <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-stone">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <a href="/" className="btn btn-solid mt-10 self-start">
          Back home
        </a>
      </main>
      <Footer />
    </>
  );
}
