import type { Metadata } from "next";
import { Fraunces, Inter, DM_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IRL snaps — A photobooth your venue gets paid for",
  description:
    "We install a classic photobooth in your bar or restaurant. Your guests pay per strip. You cash a check every month. Zero hardware cost, zero maintenance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${dmMono.variable}`}
    >
      <body>{children}</body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-PT2N9GEEGE"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PT2N9GEEGE');
        `}
      </Script>
    </html>
  );
}
