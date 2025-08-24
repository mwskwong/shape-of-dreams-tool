import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { type Metadata } from "next";
import { Raleway, Spectral } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { PageShell } from "@/components/page-shell";
import { siteName, siteUrl } from "@/lib/site-config";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400"],
  style: "italic",
  variable: "--font-spectral",
  preload: false,
});

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html
    className={`${raleway.variable} ${spectral.variable} text-pretty antialiased`}
    lang="en"
  >
    <body>
      <PageShell>
        <NuqsAdapter defaultOptions={{ shallow: true }}>{children}</NuqsAdapter>
      </PageShell>
      <Analytics
        mode={
          process.env.VERCEL_ENV === "production" ? "production" : "development"
        }
      />
    </body>
  </html>
);

export const metadata: Metadata = {
  title: {
    template: "%s | Shape of Dreams Tool",
    default: "Shape of Dreams Tool",
  },
  description:
    "Discover Shape of Dreams Tool, featuring detailed character profiles, skills and items descriptions, and a character builder for an immersive gaming experience.",
  authors: { name: "Matthew Kwong", url: "https://mwskwong.com" },
  metadataBase: new URL(siteUrl),
  openGraph: { type: "website", siteName, url: "/" },
};

export default RootLayout;
