import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootComponents from "./(components)/RootComponents";
import Script from "next/script";
import { Providers } from "./providers";
import ThemeWrapper from "./(components)/ThemeWrapper";
import { headers } from "next/headers";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const headerList = await headers();
    const host = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DOMAIN : headerList.get("host");

    return (
        <html suppressHydrationWarning>
            <head>
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            </head>
            <body className={inter.className}>
                <Providers>
                    <ThemeWrapper>
                        <RootComponents />
                        {children}
                    </ThemeWrapper>
                </Providers>

                <SpeedInsights />

                {/* Google tag (gtag.js) */}
                <Script id="google-analytics" strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-JWL8THWGRD" async />

                <Script id="google-analytics-config" strategy="lazyOnload">
                    {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-JWL8THWGRD');
        `}
                </Script>
                <Script id="faviconchange">
                    {`
          if (typeof window !== "undefined") {
            const location = window.location.href;
          if (!location.includes("epicxplorer.com")) {
            let faviconLink = document.querySelector('link[rel="icon"]');

          if (faviconLink) {
          faviconLink.href = "/default-ico.png";
          }
    }
  }`}
                </Script>
            </body>
        </html>
    );
}

const title = "EpicXplorer: Discover the Latest in Innovative Products";
const desc = "Join us on a journey of exploration with EpicXplorer! Discover a world of advanced and creative products that are reshaping technology and design. Experience the future with EpicXplorer and stay ahead of the trends.";

export const metadata: Metadata = {
    metadataBase: new URL("http://localhost:3001"),
    title,
    description: desc,
    openGraph: {
        title: title,
        description: desc,
        images: [
            {
                url: "/images/epicxplore-banner.png",
            },
        ],
        type: "website",
        siteName: "EpicXplore",
        url: "https://epicxplorer.com/",
    },
    twitter: {
        title: title,
        description: desc,
        card: "summary_large_image",
        images: [
            {
                url: "/images/epicxplore-banner.png",
            },
        ],
    },
};
