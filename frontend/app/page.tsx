import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Hotello — Il tuo hotel, online",
  description:
    "Sito ufficiale della struttura: camere, tariffe, servizi e contatti diretti per prenotare il tuo soggiorno.",
  openGraph: {
    title: "Hotello — Il tuo hotel, online",
    description:
      "Sito ufficiale della struttura: camere, tariffe, servizi e contatti diretti per prenotare il tuo soggiorno.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotello — Il tuo hotel, online",
    description:
      "Sito ufficiale della struttura: camere, tariffe, servizi e contatti diretti per prenotare il tuo soggiorno.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Hotello",
  description:
    "Sito ufficiale della struttura: camere, tariffe, servizi e contatti diretti per prenotare il tuo soggiorno.",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent />
    </>
  );
}
