import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/header'
import './globals.css'

// 1. Setup Google Font for code/terminal accents
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: '--font-jetbrains-mono' 
});

// 2. Setup Local Font for primary headings/text
// MAKE SURE: You have your font file located at public/fonts/Career.woff2 (or .ttf)
const careerFont = localFont({
  src: '../public/fonts/Career.ttf', // Change extension to .ttf or .otf if needed
  variable: '--font-career',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MearkSoft | Modern IT Solutions', // Updated to match your branding
  description: 'Cutting-edge IT solutions and enterprise architecture for the digital age.',
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
    // 3. Inject both font variables into the HTML
    <html lang="en" className={`dark scroll-smooth ${careerFont.variable} ${jetbrainsMono.variable}`}>
      
      {/* 4. Set default font to our new Career font (mapped to font-sans in Tailwind) */}
      <body className="font-sans antialiased bg-background text-foreground relative min-h-screen overflow-x-hidden selection:bg-cyan-neon selection:text-background">
        
        {/* Page Structure */}
        <div className="flex min-h-screen flex-col relative z-10">
          <Header />
          <main className="flex-1 relative z-10">
            {children}
          </main>
        </div>
        
        <Analytics />
      </body>
    </html>
  )
}