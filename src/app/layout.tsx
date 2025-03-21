import "./globals.css";

import { Container } from "@radix-ui/themes/components/container";
import { Heading } from "@radix-ui/themes/components/heading";
import { Section } from "@radix-ui/themes/components/section";
import { Theme } from "@radix-ui/themes/components/theme";
import { clsx } from "clsx";
import { type Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Serif } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { type FC, type PropsWithChildren } from "react";

import Nav from "@/components/nav";
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
  adjustFontFallback: false,
  fallback: ["monospace"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  preload: false,
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body
      className={clsx(
        geist.variable,
        geistMono.variable,
        ibmPlexSerif.variable,
      )}
    >
      <Theme appearance="dark">
        <Container>
          <Section>
            <Heading mb="5" size="8">
              Shape of Dreams Tool
            </Heading>
            <Nav />
            <NuqsAdapter>{children}</NuqsAdapter>
          </Section>
        </Container>
      </Theme>
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
  metadataBase: new URL("https://shape-of-dreams-tool.vercel.app/"),
  openGraph: {
    url: "/",
    type: "website",
    siteName: "Shape of Dreams Tool",
  },
};

export default RootLayout;
