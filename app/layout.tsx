// app/layout.tsx
import type { Metadata, Viewport } from "next"
import "../styles/globals.css"

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  title: "Retrova - Polaroid Maker",
  description:
    "Share your moments with the world - Create beautiful polaroid-style photos and share your memories instantly",
  metadataBase: new URL('https://retrova.vercel.app'),
  keywords: [
    "photos",
    "social",
    "sharing",
    "moments",
    "polaroid",
    "photo editor",
    "image filters",
    "photo frames",
    "instant photos",
  ],
  authors: [{ name: "Krishna" }],
  robots: "index, follow",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://retrova.vercel.app",
    title: "Polaroid Maker - Create & Share Beautiful Memories",
    description:
      "Transform your photos into stunning polaroid-style images. Easy to use, instant sharing, and beautiful results.",
    siteName: "Polaroid Maker",
    images: [
      {
        url: "/retrova.jpg",
        width: 1200,
        height: 630,
        alt: "Retrova - Create & Share Beautiful Polaroid Memories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retrova - Create & Share Beautiful Polaroid Memories",
    description: "Transform your photos into stunning polaroid-style images",
    images: ["/retrova.jpg"],
    creator: "@Krishna",
  },
  alternates: {
    canonical: "https://retrova.vercel.app",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `,
          }}
        />
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js', {
                    scope: '/'
                  }).then(function(registration) {
                    console.log('ServiceWorker registration successful');
                  }).catch(function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}

