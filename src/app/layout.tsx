import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AOSInitializer from "@/components/AOSInitializer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inphora.net"),
  title: "Inphora | Web & Data Solutions",
  description: "Advanced data science and custom software solutions for modern businesses.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Inphora | Web & Data Solutions",
    description: "Advanced data science and custom software solutions for modern businesses.",
    url: "https://inphora.net",
    siteName: "Inphora Limited",
    images: [
      {
        url: "/og-image.jpg", // Assuming an image exists or will exist
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inphora | Web & Data Solutions",
    description: "Advanced data science and custom software solutions for modern businesses.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${plusJakartaSans.variable} font-sans antialiased`}
      >
        <AOSInitializer />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Inphora Limited",
              "url": "https://inphora.net",
              "logo": "https://inphora.net/icon.svg",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+254-705-522-155",
                "contactType": "customer service"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
