import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type WebSite, type WithContext } from "schema-dts";

import logo from "@/images/logo.png";
import { siteName, siteUrl } from "@/lib/site-config";

const Home = () => (
  <>
    <div className="hero min-h-[calc(100svh-64px)]">
      <div className="hero-content prose md:prose-lg prose-headings:mb-0 text-center">
        <div className="flex flex-col items-center">
          <Image
            priority
            alt="Shape of Dreams logo"
            className="not-prose w-full max-w-lg"
            sizes="(width > 512px) 512px, 100vw"
            src={logo}
          />
          <h1>Shape of Dreams Tool</h1>
          <p>
            A community-driven resource with travelers, memories, essences, and
            a versatile character builder to enhance your gameplay. This project
            is not affiliated with the game&apos;s official developers.
          </p>
          <Link
            className="btn btn-primary md:btn-lg btn-wide"
            href="/builds/new"
          >
            Shape Your Build
            <MoveRight size="1.2em" />
          </Link>
        </div>
      </div>
    </div>
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName,
          url: siteUrl,
        } satisfies WithContext<WebSite>),
      }}
      type="application/ld+json"
    />
  </>
);

export default Home;
