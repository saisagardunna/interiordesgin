import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import ChatBot from '@/components/ChatBot'
import './globals.css'

const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
})

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://satwikaarchitects.com'

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'SAID — Architects & Interior Designers | Hyderabad',
  description: 'SAID transforms residential and commercial spaces with thoughtful architecture, interior design and turnkey execution in Hyderabad.',
  generator: 'v0.app',
  keywords: ['interior design', 'interior architecture', 'fit-out', 'Hyderabad', 'Bengaluru', 'turnkey execution'],
  openGraph: {
    title: 'SAID — Architects & Interior Designers',
    description: 'Satwika Architecture & Interior Design — Spaces made to be lived in, not simply looked at.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

import SmoothScroll from '@/components/SmoothScroll'
import AmbientBackground from '@/components/AmbientBackground'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased relative`}>
        <AmbientBackground />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <WhatsAppButton />
        <ChatBot />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

