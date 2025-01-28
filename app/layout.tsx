// app/layout.tsx
import type { Metadata, Viewport } from "next"
import "../styles/globals.css"
import { Inter } from 'next/font/google'

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID
const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

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
    apple: [
      { url: '/icons/apple-icon-180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'apple-touch-icon-precomposed', url: '/icons/apple-icon-180.png' },
    ],
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
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Retrova',
    startupImage: [
      {
        url: '/icons/apple-splash-2048-2732.png',
        media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/icons/apple-splash-1668-2388.png',
        media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/icons/apple-splash-1536-2048.png',
        media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/icons/apple-splash-1125-2436.png',
        media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="Retrova" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Retrova" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#000000" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={`antialiased ${inter.className}`}>
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
      </body>
    </html>
  )
}

