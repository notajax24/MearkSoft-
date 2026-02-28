import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { Portfolio } from '@/components/portfolio'
import { Clients } from '@/components/clients'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      <main className="overflow-hidden">
        <Hero />
        <Services />
        <Clients />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
