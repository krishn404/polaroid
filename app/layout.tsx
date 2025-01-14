// app/layout.tsx
import './globals.css' // Make sure you have this file

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID; // Accessing the GA ID from .env.local

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Turn your photos into Polaroid</title>
        <meta name="description" content="Transform your digital photos into vintage-style Polaroid pictures with custom handwritten captions." />
        <meta name="keywords" content="Polaroid photo generator, photo editor, vintage Polaroid effect, photo to Polaroid, custom captions, Polaroid photo maker" />
        <meta name="author" content="PolaroidPix" />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content="Polaroid Maker" />
        <meta property="og:description" content="Transform your digital photos into vintage-style Polaroid pictures with custom handwritten captions." />
        <meta property="og:url" content="https://polaroidpix.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://polaroidpix.vercel.app/favicon.ico" />
        <meta property="og:image:alt" content="Polaroid Maker logo" />
        <meta property="og:image:type" content="image/x-icon" />
        <meta property="og:site_name" content="Polaroid Maker" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Polaroid Maker" />
        <meta name="twitter:description" content="Transform your digital photos into vintage-style Polaroid pictures with custom handwritten captions." />
        <meta name="twitter:image" content="https://polaroidpix.vercel.app/favicon.ico" />

        <meta property="og:image" content="https://polaroidpix.vercel.app/favicon.ico" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        <meta property="og:image" content="https://polaroidpix.vercel.app/favicon.ico" />
        <meta property="og:image:type" content="image/x-icon" />

        <meta property="og:image" content="https://polaroidpix.vercel.app/favicon.ico" />
        <meta property="og:image:alt" content="Polaroid photo maker" />

        
      </head>
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
      </body>
    </html>
  )
}