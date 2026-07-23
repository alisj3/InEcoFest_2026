import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
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
  title: 'InEco Fest 2025 - Фестиваль экологии и инклюзии',
  icons: {
    icon: [
      { url: '/images/logos/ineco.png', type: 'image/png' },
    ],
  },
  description: 'Присоединяйтесь к InEco Fest 2025 - уникальному фестивалю, объединяющему экологию и инклюзию. Мастер-классы, лекции, выставки и многое другое!',
  keywords: 'фестиваль, экология, инклюзия, мастер-классы, InEco Fest, 2025',
  authors: [{ name: 'InEco Fest Team' }],
  openGraph: {
    title: 'InEco Fest 2025 - Фестиваль экологии и инклюзии',
    description: 'Присоединяйтесь к InEco Fest 2025 - уникальному фестивалю, объединяющему экологию и инклюзию.',
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
    title: 'InEco Fest 2025 - Фестиваль экологии и инклюзии',
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
        {/* Yandex Metrica */}
        <Script id="yandex-metrica" strategy="afterInteractive">
          {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            k=e.createElement(t),a=e.getElementsByTagName(t)[0];
            k.async=1;k.src=r;a.parentNode.insertBefore(k,a)
          })(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");

          ym(1287631042, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
          ym(2218987015, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
          ym(1471884626, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
          ym(2186042337, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
        `}
        </Script>
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<div><img src="https://mc.yandex.ru/watch/1287631042" style="position:absolute; left:-9999px;" alt="" /></div>'+
              '<div><img src="https://mc.yandex.ru/watch/2218987015" style="position:absolute; left:-9999px;" alt="" /></div>'+
              '<div><img src="https://mc.yandex.ru/watch/1471884626" style="position:absolute; left:-9999px;" alt="" /></div>'+
              '<div><img src="https://mc.yandex.ru/watch/2186042337" style="position:absolute; left:-9999px;" alt="" /></div>'
          }}
        />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}