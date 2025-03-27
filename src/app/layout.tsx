import "./globals.css";

import { Box } from "@radix-ui/themes/components/box";
import { Container } from "@radix-ui/themes/components/container";
import { Heading } from "@radix-ui/themes/components/heading";
import { Link } from "@radix-ui/themes/components/link";
import { Section } from "@radix-ui/themes/components/section";
import { Text } from "@radix-ui/themes/components/text";
import { Theme } from "@radix-ui/themes/components/theme";
import { Analytics } from "@vercel/analytics/next";
import { clsx } from "clsx";
import { type Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Serif } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { type FC, type PropsWithChildren } from "react";

import Nav from "@/components/nav";

import styles from "./layout.module.css";

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
            <Heading mb="9" size="8" wrap="pretty">
              Shape of Dreams Tool
            </Heading>
            <Nav />
            <NuqsAdapter>{children}</NuqsAdapter>
          </Section>
          <Box asChild mb="9">
            <footer>
              <Text as="p" className={styles.copyright} color="gray" size="2">
                Copyright © {new Date().getFullYear()} KWONG, Matthew Wang
                Shun. Images and data copyright Lizard Smoothie Co., Ltd. Used
                under license.{" "}
                <Link
                  href="https://github.com/mwskwong/shape-of-dreams-tool/blob/main/LICENSE"
                  rel="noreferrer"
                  target="_blank"
                >
                  View licenses for code and resources
                </Link>
                .
              </Text>
            </footer>
          </Box>
        </Container>
      </Theme>
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
  openGraph: {
    url: "/",
    type: "website",
    siteName: "Shape of Dreams Tool",
  },
};

export default RootLayout;
