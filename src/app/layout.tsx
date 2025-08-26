import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { type Metadata } from "next";
import { Playfair_Display, Raleway } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { PageShell } from "@/components/page-shell";
import { siteName, siteUrl } from "@/lib/site-config";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  style: ["normal", "italic"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html
    className={`${raleway.variable} ${playfairDisplay.variable} text-pretty antialiased`}
    lang="en"
  >
    <body>
      <PageShell>
        <NuqsAdapter defaultOptions={{ shallow: false }}>
          {children}
        </NuqsAdapter>
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
    "A community-driven resource with travelers (characters), memories (skills), essences (gems), and a versatile character builder to enhance your gameplay.",
  authors: { name: "Matthew Kwong", url: "https://mwskwong.com" },
  metadataBase: new URL(siteUrl),
  openGraph: { type: "website", siteName, url: "/" },
};

export default RootLayout;
