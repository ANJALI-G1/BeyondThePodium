import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { revealScript } from "@/components/Reveal";

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });

const title = `${site.brand} with ${site.shortName} | Communication & Public Speaking Coach`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.brand}` },
  description: site.description,
  keywords: [
    "public speaking coach",
    "communication skills trainer",
    "soft skills trainer",
    "corporate soft skills training",
    "interview preparation",
    "presentation skills",
    site.name,
    site.brand,
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.brand,
    title,
    description: site.description,
    url: "/",
    images: [{ url: site.headshot, width: 400, height: 400, alt: site.name }],
  },
  twitter: { card: "summary", title, description: site.description, images: [site.headshot] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#4f2d57" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-plum-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
