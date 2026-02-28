import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Bricolage_Grotesque } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/header'
import  ScrollSequence  from '@/components/ScrollSequence'
import './globals.css'
import { Scroll } from 'lucide-react'

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: '--font-primary' });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-secondary' });

export const metadata: Metadata = {
  title: 'NeuralForge | Modern IT Solutions',
  description: 'Cutting-edge IT solutions for the digital age.',
  // ... rest of your metadata
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#00ffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${bricolage.variable} ${jetbrainsMono.variable}`}>
      <body className="font-secondary antialiased bg-background text-foreground relative min-h-screen overflow-x-hidden selection:bg-cyan-neon selection:text-background z-0 py-5">
        
        {/* --- DYNAMIC  BACKGROUND --- */}
      
        {/* <ScrollSequence />  */}

        {/* Page Structure */}
        <div className="flex min-h-screen flex-col relative z-10">
          <Header />
          <main className="flex-1 pt-24">
            {children}
          </main>
        </div>
        
        <Analytics />
      </body>
    </html>
  )
}