// Editable homepage copy — managed in Sanity (homepage singleton),
// fetched + mapped in `sanity/fetch.ts`. This is the view model the
// components render.
export type HomepageContent = {
  hero: {
    eyebrowBrand: string;
    eyebrowLocation: string;
    headlineLines: string[];
    supportingLine: string;
    services: string;
    status: string;
  };
  marquee: string[];
  about: {
    bio: string;
    services: { name: string; desc: string }[];
  };
  contact: {
    siteName: string;
    headline: string;
    supportingLine: string;
    email: string;
    phoneDisplay: string;
    /** Derived from phoneDisplay. */
    phoneTel: string;
    /** Derived from phoneDisplay. */
    whatsappUrl: string;
    instagramUrl: string;
    behanceUrl: string;
    /** null drops the Arabic sign-off. */
    arabicSignature: string | null;
  };
};
