import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cosmic Connections - Dating & Astrology',
  description: 'Find meaningful connections through the stars. A modern dating platform that combines astrology with meaningful relationships.',
  keywords: 'dating, astrology, zodiac, relationships, cosmic connections, horoscope, compatibility',
  authors: [{ name: 'Cosmic Connections' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#667eea',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
