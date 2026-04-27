import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Aurora from '@/components/Aurora'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Zelkyrus — Intelligence, Engineered.',
  description: 'Zelkyrus builds AI-powered tools for the future of work. IntervueIQ transforms how companies hire and how candidates prepare.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Aurora
            colorStops={['#00d4ff', '#0ea5e9', '#3b82f6']}
            amplitude={1.2}
            blend={0.5}
            speed={0.4}
          />
        </div>
        <div className="relative z-10 min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
