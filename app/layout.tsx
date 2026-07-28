import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

const ceraPro = localFont({
  src: [
    {
      path: '../public/fonts/CeraPro-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/CeraPro-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-cera',
  display: 'swap',
})

const ceraProDisplay = localFont({
  src: [
    {
      path: '../public/fonts/CeraPro-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-cera-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'InEco Fest 2026 - Фестиваль экологии и инклюзии',
  icons: {
    icon: [
      { url: '/images/logos/ineco.png', type: 'image/png' },
    ],
  },
  description: 'Присоединяйтесь к InEco Fest 2026 - уникальному фестивалю, объединяющему экологию и инклюзию. Мастер-классы, лекции, выставки и многое другое!',
  keywords: 'фестиваль, экология, инклюзия, мастер-классы, InEco Fest, 2026',
  authors: [{ name: 'InEco Fest Team' }],
  openGraph: {
    title: 'InEco Fest 2026 - Фестиваль экологии и инклюзии',
    description: 'Присоединяйтесь к InEco Fest 2026 - уникальному фестивалю, объединяющему экологию и инклюзию.',
    type: 'website',
    locale: 'ru_RU',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'InEco Fest 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InEco Fest 2026 - Фестиваль экологии и инклюзии',
    description: 'Присоединяйтесь к InEco Fest 2025 - уникальному фестивалю, объединяющему экологию и инклюзию.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${ceraPro.variable} ${ceraProDisplay.variable}`}>
      <body className={`${ceraPro.className} antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}