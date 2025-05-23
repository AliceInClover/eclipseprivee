import type { Metadata } from "next";
import { Raleway, Libre_Baskerville } from "next/font/google";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import { ViewTransitions } from "next-view-transitions";

import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  display: "swap",
  weight: "400"
});

export async function generateMetdata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.site_title || "Eclipse Privée",
    description:
      settings.data.meta_description ||
      "Discover the world of Eclipse Privée, where luxury meets exclusivity.",
    keywords: settings.data.meta_keywords || "Eclipse Privée, luxury, exclusivity",
    openGraph: {
      images: isFilled.image(settings.data.fallback_og_image)
        ? [settings.data.fallback_og_image.url]
        : ["/og-image.png"],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <ViewTransitions>
      <html
        lang="fr" 
        className={`${raleway.variable} ${libreBaskerville.variable} antialiased`}
      >
        <body className="bg-neutral-900 text-white">
          <NavBar settings={settings} />
          <main className="pt-14 md:pt-16">{children}</main>
          <Footer />
        </body>
        <PrismicPreview repositoryName={repositoryName} />
      </html>
    </ViewTransitions>
  );
}
